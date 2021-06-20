import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import TournamentInfos from '../tournaments/TournamentInfos';
import Participation from './Participation';
import ParticipationsButtons from './ParticipationsButtons';
import ParticipationSkeleton from './ParticipationSkeleton';
import Error from '../utils/Error';
import Podium from '../podiums/Podium';
import useComparisons from '../../hooks/useComparisons';

function Participations({ route, canManage, userId }) {
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.auth);
    const [participations, setParticipations] = useState([]);
    const [participation, setParticipation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingParticipation, setLoadingParticipation] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const { search } = useLocation();

    const {
        comparisons,
        onAddComparison,
        onRemoveComparison,
        setComparisons,
        loading: loadingComparisons,
    } = useComparisons({
        tournament: participation?.TournamentId,
        excludedParticipations: participation ? [participation] : undefined,
    });

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
        } else {
            const idx = comparisons.findIndex(
                (c) => c.id === race.ParticipationId
            );
            if (idx !== -1) {
                const newComparison = _.cloneDeep(comparisons[idx]);
                newComparison.Races.push(race);
                const newComparisons = _.cloneDeep(comparisons);
                newComparisons.splice(idx, 1, newComparison);
                setComparisons(newComparisons);
            }
        }
    });

    socket.off('editRace').on('editRace', (race) => {
        const p = _.find(participations, { id: race.ParticipationId });
        if (p) {
            const index = _.findIndex(p.Races, { id: race.id });
            const newParticipation = _.cloneDeep(p);

            newParticipation.Races.splice(index, 1, race);
            refreshParticipation(newParticipation);
        } else {
            const idx = comparisons.findIndex(
                (c) => c.id === race.ParticipationId
            );
            if (idx !== -1) {
                const newComparison = _.cloneDeep(comparisons[idx]);
                const raceIdx = _.findIndex(newComparison.Races, {
                    id: race.id,
                });
                if (raceIdx !== -1) {
                    newComparison.Races.splice(raceIdx, 1, race);
                    const newComparisons = _.cloneDeep(comparisons);
                    newComparisons.splice(idx, 1, newComparison);
                    setComparisons(newComparisons);
                }
            }
        }
    });

    useEffect(() => {
        socket.on(route, (participations) => {
            setParticipations(participations);
            setLoading(false);
        });

        socket.on('createTournament', () => fetchParticipations());
        socket.on('updateTournament', (tournament) => {
            setParticipations((currentParticipations) => {
                const currentIndex = _.findIndex(currentParticipations, {
                    TournamentId: tournament.id,
                });
                const newParticipations = _.cloneDeep(currentParticipations);
                newParticipations.splice(currentIndex, 1, {
                    ...currentParticipations[currentIndex],
                    Tournament: tournament,
                });
                return newParticipations;
            });
        });

        fetchParticipations();

        return () => {
            socket.off(route);
            socket.off('editParticipation');
            socket.off('addRace');
            socket.off('editRace');
        };
    }, []);

    useEffect(() => {
        const { participationId } = queryString.parse(search);

        if (!participationId && participations.length) {
            changeParticipation(participations[0]);
        } else {
            setParticipation(
                participations.find((p) => p.id === +participationId)
            );
        }

        setTimeout(() => setLoadingParticipation(false), 300);
    }, [search, participations]);

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
        if (participation?.id === newParticipation.id)
            setParticipation(newParticipation);
    };

    const changeParticipation = (newParticipation) => {
        const currentSearch = queryString.parse(search);
        if (currentSearch?.participationId !== String(newParticipation.id)) {
            setLoadingParticipation(true);
            history.push(
                `${history.location.pathname}?${queryString.stringify({
                    ...currentSearch,
                    participationId: newParticipation.id,
                })}`
            );
        }
    };

    return (
        <Container className="app__container">
            {!loading && !error && participations.length && (
                <Row justify="center">
                    <Col xs={12} lg={8}>
                        <ParticipationsButtons
                            participations={participations}
                            setParticipation={changeParticipation}
                        />
                    </Col>
                </Row>
            )}

            {loading || loadingParticipation ? (
                <ParticipationSkeleton showButton={loading} />
            ) : error ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            {error}
                        </div>
                    </Col>
                </Row>
            ) : (
                <Row justify="center">
                    <Col xs={12} lg={8}>
                        {participations.length === 0 ? (
                            <Error message="Vous n'avez participé à aucun tournoi." />
                        ) : loadingParticipation ? (
                            <ParticipationSkeleton showButton={false} />
                        ) : (
                            participation && (
                                <>
                                    <TournamentInfos
                                        defaultTournament={
                                            participation.Tournament
                                        }
                                    />
                                    <Podium
                                        tournamentId={
                                            participation.Tournament.id
                                        }
                                        canManage={!!user?.isAdmin}
                                    />

                                    <Participation
                                        participation={participation}
                                        tournamentName={
                                            participation.Tournament.name
                                        }
                                        nbMaxRaces={
                                            participation.Tournament.nbMaxRaces
                                        }
                                        canManage={canManage}
                                        comparisons={comparisons}
                                        onAddComparison={onAddComparison}
                                        onRemoveComparison={onRemoveComparison}
                                        loadingComparisons={loadingComparisons}
                                    />
                                </>
                            )
                        )}
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Participations;
