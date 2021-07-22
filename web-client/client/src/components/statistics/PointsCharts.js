import _ from 'lodash';
import ApexChart from 'react-apexcharts';
import { getParticipationNbPoints } from '../../utils/utils';
import Chart from '../utils/Chart';

export function TotalPointsChart({ participations }) {
    const series = [
        {
            data: participations.map(
                (p) => getParticipationNbPoints(p) || null
            ),
        },
    ];

    return (
        <Chart
            type="line"
            series={series}
            xlegends={participations.map((p) => p.Tournament.name)}
        />
    );
}

export function AveragePointsChart({ participations }) {
    const getAveragePoints = () => {
        return participations.map((p) => {
            if (p.nbPoints) return null;

            const nbRaces = p.Races.length;
            if (!nbRaces) return null;

            const nbPoints = _.sumBy(p.Races, 'nbPoints');
            return nbRaces ? (nbPoints / nbRaces).toFixed(1) : 0;
        });
    };

    const series = [{ data: getAveragePoints() }];

    return (
        <Chart
            type="line"
            series={series}
            xlegends={participations.map((p) => p.Tournament.name)}
        />
    );
}
