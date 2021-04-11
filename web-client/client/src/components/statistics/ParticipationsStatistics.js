import { useState, useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { TotalPointsChart, AveragePointsChart } from './PointsCharts';
import ChartSkeleton from './ChartSkeleton';

function ParticipationsStatistics({ route, userId }) {
    const { socket } = useSelector((state) => state.socket);
    const { maxItems } = useSelector((state) => state.statistics);
    const [participations, setParticipations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    socket.off('editParticipation').on('editParticipation', (participation) => {
        const p = _.find(participations, { id: participation.id });
        if (p) refreshParticipation({ ...p, ...participation });
    });

    socket.off('addRace').on('addRace', (race) => {
        const p = _.find(participations, { id: race.ParticipationId });
        if (p) {
            const newParticipation = _.cloneDeep(p);
            newParticipation.Races.push(race);
            refreshParticipation(newParticipation);
        }
    });

    socket.off('editRace').on('editRace', (race) => {
        const p = _.find(participations, { id: race.ParticipationId });
        if (p) {
            const index = _.findIndex(p.Races, { id: race.id });
            const newParticipation = _.cloneDeep(p);

            newParticipation.Races.splice(index, 1, race);
            refreshParticipation(newParticipation);
        }
    });

    useEffect(() => {
        socket.on(route, (participations) => {
            setParticipations([...participations].reverse());
            setLoading(false);
        });

        socket.on('refreshTournaments', () => fetchParticipations());

        fetchParticipations();

        return () => {
            socket.off(route);
            socket.off('refreshTournaments');
            socket.off('addRace');
            socket.off('editRace');
        };
    }, []);

    const fetchParticipations = () => {
        socket.emit(route, userId, (err) => {
            setError(err);
            setLoading(false);
        });
    };

    const refreshParticipation = (newParticipation) => {
        const index = _.findIndex(participations, { id: newParticipation.id });
        const newParticipations = _.cloneDeep(participations);

        newParticipations.splice(index, 1, newParticipation);
        setParticipations(newParticipations);
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
        <>
            <h1 className="statistics__title">
                Évolution du nombre total de points
            </h1>
            <TotalPointsChart
                participations={_.takeRight(participations, maxItems)}
            />

            <h1 className="statistics__title">
                Évolution du nombre moyen de points
            </h1>
            <AveragePointsChart
                participations={_.takeRight(participations, maxItems)}
            />
        </>
    );
}

export default ParticipationsStatistics;
