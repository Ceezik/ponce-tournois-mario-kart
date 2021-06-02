import _ from 'lodash';
import { useSelector } from 'react-redux';
import Chart from '../utils/Chart';
import { CSSTheme } from '../../utils/style';
import {
    formatParticipationToChartData,
    getParticipationNbPoints,
} from '../../utils/utils';
import ParticipationChartLegends from './ParticipationChartLegends';
import { useState } from 'react';

function ParticipationChart({
    record,
    worst,
    average,
    goal,
    current,
    tournamentName,
    nbMaxRaces,
}) {
    const { theme } = useSelector((state) => state.settings);
    const [hiddenSeries, setHiddenSeries] = useState([]);

    const handleHideSerie = (name) => {
        if (hiddenSeries.length < series.length - 1)
            setHiddenSeries([...hiddenSeries, name]);
    };

    const handleShowSerie = (name) => {
        setHiddenSeries(hiddenSeries.filter((s) => s !== name));
    };

    const series = [
        {
            name: tournamentName,
            data: formatParticipationToChartData(current, nbMaxRaces),
            color: CSSTheme[theme].mainColor,
        },
    ];

    if (record) {
        series.push({
            name: 'Record',
            data: formatParticipationToChartData(record, nbMaxRaces),
            color: CSSTheme[theme].mainTextColor,
            tournament: record.Tournament.name,
        });
    }

    if (worst) {
        series.push({
            name: 'Pire score',
            data: formatParticipationToChartData(worst, nbMaxRaces),
            color: CSSTheme[theme].worstChartColor,
            tournament: worst.Tournament.name,
        });
    }

    if (average) {
        series.push({
            name: 'Moyenne',
            data: average.map(((s) => (a) => (s += a))(0)),
            color: CSSTheme[theme].tertiaryTextColor,
        });
    }

    if (goal) {
        series.push({
            name: 'Objectif',
            data: Array(nbMaxRaces).fill(goal),
            strokeWidth: 2,
            color:
                getParticipationNbPoints(current) > goal
                    ? CSSTheme[theme].successColor
                    : CSSTheme[theme].errorColor,
        });
    }

    return (
        <>
            <ParticipationChartLegends
                series={series}
                hiddenSeries={hiddenSeries}
                onHide={handleHideSerie}
                onShow={handleShowSerie}
            />

            <div className="participation__chart">
                <Chart
                    type="line"
                    series={series.filter(
                        (s) => !hiddenSeries.includes(s.name)
                    )}
                    xlegends={Array.from(Array(nbMaxRaces), (_, i) => i + 1)}
                    max={
                        record || worst || average || goal
                            ? undefined
                            : nbMaxRaces * 15
                    }
                    maxSeriesSize={nbMaxRaces}
                    showTooltipName
                    showLastDatalabel
                />
            </div>
        </>
    );
}

export default ParticipationChart;
