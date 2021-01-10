import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import _ from 'lodash';

function ParticipationChart({
    record,
    worst,
    average,
    goal,
    races,
    tournamentName,
    nbMaxRaces,
}) {
    const data = {
        labels: Array.from(Array(nbMaxRaces), (_, i) => i + 1),
        datasets: [
            {
                label: tournamentName,
                fill: false,
                borderColor: '#ff56a9',
                datalabels: {
                    align: 'start',
                    color: '#ff56a9',
                    font: {
                        family: 'Nunito',
                    },
                },
                data: races.map(((s) => ({ nbPoints }) => (s += nbPoints))(0)),
            },
        ],
    };

    const options = {
        legend: {
            labels: {
                fontfamily: 'Nunito',
            },
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontFamily: 'Nunito',
                        padding: 20,
                    },
                },
            ],
            yAxes: [
                {
                    display: false,
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax:
                            record || worst || average || goal
                                ? undefined
                                : nbMaxRaces * 15,
                    },
                },
            ],
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        layout: {
            padding: {
                left: 20,
                right: 40,
                top: 20,
                bottom: 10,
            },
        },
    };

    if (record) {
        data.datasets.push({
            label: 'Record',
            fill: false,
            borderColor: '#424242',
            datalabels: {
                align: 'end',
                color: '#424242',
                font: {
                    family: 'Nunito',
                },
            },
            data: record.Races.map(
                ((s) => ({ nbPoints }) => (s += nbPoints))(0)
            ),
        });
    }

    if (worst) {
        data.datasets.push({
            label: 'Pire score',
            fill: false,
            borderColor: '#ffc1bf',
            datalabels: {
                align: 'right',
                color: '#ffc1bf',
                font: {
                    family: 'Nunito',
                },
                formatter: (value, ctx) => {
                    return ctx.dataIndex === ctx.dataset.data.length - 1
                        ? value.y
                        : null;
                },
            },
            data: worst.Races.map(
                ((s) => ({ nbPoints }) => (s += nbPoints))(0)
            ),
        });
    }

    if (average) {
        data.datasets.push({
            label: 'Moyenne',
            fill: false,
            borderColor: '#dbdbdb',
            datalabels: {
                align: 'right',
                color: '#dbdbdb',
                font: {
                    family: 'Nunito',
                },
                formatter: (value, ctx) => {
                    return ctx.dataIndex === ctx.dataset.data.length - 1
                        ? Math.round(value)
                        : null;
                },
            },
            data: average.map(((s) => (a) => (s += a))(0)),
        });
    }

    if (goal) {
        data.datasets.push({
            label: 'Objectif',
            fill: false,
            borderColor:
                _.sumBy(races, (race) => race.nbPoints) > goal
                    ? '#68b684'
                    : '#f3453f',
            borderWidth: 2,
            datalabels: { display: false },
            data: Array(nbMaxRaces).fill(goal),
        });
    }

    return (
        <div className="participation__chart">
            <Line data={data} options={options} redraw />
        </div>
    );
}

export default ParticipationChart;
