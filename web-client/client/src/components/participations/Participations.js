import { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
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
import {
    addRaceToComparisons,
    addRaceToParticipation,
    editRaceFromComparisons,
    editRaceFromParticipation,
} from '../../utils/utils';
import useStreamersChart from '../../hooks/useStreamersChart';

function Participations({ route, canManage, user }) {
    const { socket } = useSelector((state) => state.socket);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [participations, setParticipations] = useState([]);
    const [participation, setParticipation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingParticipation, setLoadingParticipation] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const { search } = useLocation();

    const { comparisons, setComparisons } = useComparisons({
        tournament: participation?.TournamentId,
        excludedParticipations: participation ? [participation] : undefined,
    });

    const { streamersComparisons, setStreamersComparisons } = useStreamersChart(
        {
            tournament: participation?.TournamentId,
            excludedParticipations: participation ? [participation] : undefined,
        }
    );

    socket.off('editParticipation').on('editParticipation', (participation) => {
        const p = _.find(participations, { id: participation.id });
        if (p) refreshParticipation({ ...p, ...participation });
    });

    socket.off('addRace').on('addRace', (race) => {
        const p = _.find(participations, { id: race.ParticipationId });
        if (p) {
            refreshParticipation(
                addRaceToParticipation({ race, participation: p })
            );
        } else {
            setComparisons(addRaceToComparisons({ race, comparisons }));
            setStreamersComparisons(
                addRaceToComparisons({
                    race,
                    comparisons: streamersComparisons,
                })
            );
        }
    });

    socket.off('editRace').on('editRace', (race) => {
        const p = _.find(participations, { id: race.ParticipationId });
        if (p) {
            refreshParticipation(
                editRaceFromParticipation({ race, participation: p })
            );
        } else {
            setComparisons(editRaceFromComparisons({ race, comparisons }));
            setStreamersComparisons(
                editRaceFromComparisons({
                    race,
                    comparisons: streamersComparisons,
                })
            );
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
        socket.emit(route, user.id, (err) => {
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
        <div className="app__container">
            {!loading && !error && participations.length && (
                <Row justify="center">
                    <Col xs={12} lg={10} xxl={8}>
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
                    <Col xs={12} lg={10} xxl={8}>
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
                                        canManage={!!currentUser?.isAdmin}
                                    />

                                    <Participation
                                        user={user}
                                        participation={participation}
                                        tournamentName={
                                            participation.Tournament.name
                                        }
                                        nbMaxRaces={
                                            participation.Tournament.nbMaxRaces
                                        }
                                        canManage={canManage}
                                    />
                                </>
                            )
                        )}
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default Participations;
