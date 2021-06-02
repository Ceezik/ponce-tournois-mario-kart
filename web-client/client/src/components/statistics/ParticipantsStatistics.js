import { Row, Col } from 'react-grid-system';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import ChartSkeleton from './ChartSkeleton';
import Chart from '../utils/Chart';
import { getReversedTournaments } from '../../redux/selectors/tournaments';

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
    const series = [
        {
            data: tournaments.map((t) => t.nbParticipants),
        },
    ];

    return (
        <>
            <h1 className="statistics__title title--noMarginTop">
                Évolution du nombre de fleurs
            </h1>
            <Chart
                type="line"
                series={series}
                xlegends={tournaments.map((t) => t.name)}
            />
        </>
    );
}

export default ParticipantsStatistics;
