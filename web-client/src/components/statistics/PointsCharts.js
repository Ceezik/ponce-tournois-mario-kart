import React from 'react';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import { useScreenClass } from 'react-grid-system';
import 'chartjs-plugin-datalabels';

export function TotalPointsChart({ participations }) {
    const screenClass = useScreenClass();

    const data = {
        labels: participations.map((p) => p.Tournament.name),
        datasets: [
            {
                backgroundColor: '#ff56a9',
                datalabels: {
                    display: !['xs', 'sm'].includes(screenClass),
                    anchor: 'end',
                    align: 'end',
                    color: '#1d1d1d',
                    font: {
                        family: 'Nunito',
                    },
                },
                data: participations.map((p) => _.sumBy(p.Races, 'nbPoints')),
            },
        ],
    };

    const options = {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontFamily: 'Nunito',
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        fontFamily: 'Nunito',
                        stepSize: 50,
                    },
                },
            ],
        },
        tooltips: {
            enabled: false,
        },
        events: [],
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },
        },
    };

    return <Bar data={data} options={options} />;
}

export function AveragePointsChart({ participations }) {
    const screenClass = useScreenClass();

    const getAveragePoints = () => {
        return participations.map((p) => {
            const nbRaces = p.Races.length;
            const nbPoints = _.sumBy(p.Races, 'nbPoints');
            return nbRaces ? (nbPoints / nbRaces).toFixed(1) : 0;
        });
    };

    const data = {
        labels: participations.map((p) => p.Tournament.name),
        datasets: [
            {
                backgroundColor: '#ff56a9',
                datalabels: {
                    display: !['xs', 'sm'].includes(screenClass),
                    anchor: 'end',
                    align: 'end',
                    color: '#1d1d1d',
                    font: {
                        family: 'Nunito',
                    },
                },
                data: getAveragePoints(),
            },
        ],
    };

    const options = {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontFamily: 'Nunito',
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        fontFamily: 'Nunito',
                        max: 15,
                        stepSize: 5,
                    },
                },
            ],
        },
        tooltips: {
            enabled: false,
        },
        events: [],
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 21,
                bottom: 20,
            },
        },
    };

    return <Bar data={data} options={options} />;
}
