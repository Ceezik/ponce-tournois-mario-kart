import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import { Bar } from 'react-chartjs-2';
import { useScreenClass } from 'react-grid-system';
import { useSocket } from '../../utils/useSocket';
import 'chartjs-plugin-datalabels';
import ChartSkeleton from './ChartSkeleton';

function ParticipantsStatistics() {
    const { socket } = useSocket();
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('getTournaments', (tournaments) => {
            setTournaments([...tournaments].reverse());
            setLoading(false);
        });

        socket.on('refreshTournaments', () => fetchTournaments());

        fetchTournaments();

        return () => {
            socket.off('getTournaments');
            socket.off('refreshTournaments');
        };
    }, []);

    const fetchTournaments = () => {
        socket.emit('getTournaments', {}, (err) => {
            setError(err);
            setLoading(false);
        });
    };

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
