import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import 'chartjs-plugin-datalabels';
import _ from 'lodash';
import ChartSkeleton from './ChartSkeleton';
import { getReversedTournaments } from '../../redux/selectors/tournaments';
import { CSSTheme } from '../../utils/style';

function ParticipantsStatistics() {
    const tournaments = useSelector(getReversedTournaments);
    const { maxItems } = useSelector((state) => state.statistics);
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
        <ParticipantsChart tournaments={_.takeRight(tournaments, maxItems)} />
    );
}

function ParticipantsChart({ tournaments }) {
    const { maxItems } = useSelector((state) => state.statistics);
    const { theme } = useSelector((state) => state.settings);

    const data = {
        labels: tournaments.map((t) => t.name),
        datasets: [
            {
                barThickness: maxItems > 50 ? 8 : 10,
                backgroundColor: CSSTheme[theme].mainColor,
                datalabels: {
                    display: false,
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
                },
            ],
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0,
                        stepSize: 500,
                    },
                },
            ],
        },
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
