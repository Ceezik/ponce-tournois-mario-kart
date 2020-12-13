import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Bar } from 'react-chartjs-2';
import { useScreenClass } from 'react-grid-system';
import { useSelector } from 'react-redux';
import 'chartjs-plugin-datalabels';
import ChartSkeleton from './ChartSkeleton';
import { getReversedTournaments } from '../../redux/selectors/tournaments';

function ParticipantsStatistics() {
    const tournaments = useSelector(getReversedTournaments);
    const { loading, error } = useSelector((state) => state.tournaments);

    return loading ? (
        <ChartSkeleton />
    ) : error ? (
        <Row justify="center">
            <Col xs="content">
                <div className="formMessage formMessage__error">{error}</div>
            </Col>
        </Row>
    ) : (
        <ParticipantsChart tournaments={tournaments} />
    );
}

function ParticipantsChart({ tournaments }) {
    const screenClass = useScreenClass();

    const data = {
        labels: tournaments.map((t) => t.name),
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
                data: tournaments.map((t) => t.nbParticipants),
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
                        suggestedMin: 0,
                        stepSize: 500,
                        fontFamily: 'Nunito',
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

    return (
        <>
            <h1 className="statistics__title title--noMarginTop">
                Évolution du nombre de fleurs
            </h1>
            <Bar data={data} options={options} />
        </>
    );
}

export default ParticipantsStatistics;
