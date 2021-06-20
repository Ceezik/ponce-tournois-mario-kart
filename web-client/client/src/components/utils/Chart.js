import React from 'react';
import ApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { CSSTheme } from '../../utils/style';

function Chart({
    series,
    type,
    xlegends,
    max,
    maxSeriesSize,
    showTooltipName = false,
    showLastDatalabel = false,
}) {
    const { theme } = useSelector((state) => state.settings);

    const getStrokeWidths = () => {
        const DEFAULT_STROKE_WIDTH = 3;
        return series.reduce((acc, curr) => {
            return [...acc, curr.strokeWidth || DEFAULT_STROKE_WIDTH];
        }, []);
    };

    const formattedSeries = series.map(({ data, color, name }) => ({
        name,
        data: maxSeriesSize
            ? [...data, ...Array(maxSeriesSize - data.length).fill(null)]
            : data,
        color: color || CSSTheme[theme].mainColor,
    }));

    const options = {
        chart: {
            zoom: { enabled: false },
            toolbar: { show: false },
            fontFamily: 'Nunito',
            fontWeight: 700,
            foreColor: CSSTheme[theme].mainTextColor,
            animations: { enabled: false },
        },
        stroke: { curve: 'smooth', width: getStrokeWidths() },
        grid: {
            borderColor: CSSTheme[theme].secondaryBackgroundColor,
            padding: { right: 45, bottom: -10 },
        },
        markers: { size: 0 },
        legend: { show: false },
        dataLabels: showLastDatalabel
            ? {
                  enabled: true,
                  style: {
                      fontFamily: 'Nunito',
                      fontWeight: 700,
                  },
                  dropShadow: { enabled: false },
                  background: { enabled: false },
                  offsetX: 10,
                  formatter: (value, { dataPointIndex, w, seriesIndex }) => {
                      const serie = w.globals.series[seriesIndex]?.filter(
                          (e) => e !== null
                      );
                      return dataPointIndex + 1 === serie.length
                          ? value
                          : undefined;
                  },
              }
            : { enabled: false },
        tooltip: {
            y: {
                title: {
                    formatter: (name) => (showTooltipName ? `${name} :` : null),
                },
            },
        },
        xaxis: { categories: xlegends, tooltip: { enabled: false } },
        yaxis: { max, min: 0, forceNiceScale: true },
    };

    return (
        <div className="grid-widget-container">
            <div className="grid-widget">
                <div className="chart-wrapper">
                    <ApexChart
                        type={type}
                        series={formattedSeries}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
}

export default Chart;
