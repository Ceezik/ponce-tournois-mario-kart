import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import TournamentInfos from '../tournaments/TournamentInfos';
import Participation from './Participation';
import ParticipationsButtons from './ParticipationsButtons';
import ParticipationSkeleton from './ParticipationSkeleton';
import Error from '../utils/Error';
import Podium from '../podiums/Podium';

function Participations({ route, canAdd }) {
    const { socket } = useSelector((state) => state.socket);
    const [participations, setParticipations] = useState([]);
    const [participation, setParticipation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    socket.off('editParticipation').on('editParticipation', (participation) => {
        const p = _.find(participations, { id: participation.id });
        if (p) {
            const newParticipation = _.cloneDeep(p);
            newParticipation.goal = participation.goal;
            refreshParticipation(newParticipation);
        }
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
            setParticipations(participations);
            setLoading(false);
        });

        socket.on('refreshTournaments', () => fetchParticipations());

        fetchParticipations();

        return () => {
            socket.off(route);
            socket.off('refreshTournaments');
            socket.off('editParticipation');
            socket.off('addRace');
            socket.off('editRace');
        };
    }, []);

    useEffect(() => {
        if (participation) {
            setParticipation(_.find(participations, { id: participation.id }));
        } else {
            if (participations.length > 0) setParticipation(participations[0]);
        }
    }, [participations]);

    const fetchParticipations = () => {
        socket.emit(route, (err) => {
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

    return (
        <Container className="app__container">
            {loading ? (
                <ParticipationSkeleton />
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
                        ) : (
                            <>
                                <ParticipationsButtons
                                    participations={participations}
                                    setParticipation={setParticipation}
                                />

                                {participation && (
                                    <>
                                        <TournamentInfos
                                            tournament={
                                                participation.Tournament
                                            }
                                        />
                                        <Podium
                                            tournamentId={
                                                participation.Tournament.id
                                            }
                                            canAdd={false}
                                        />
                                        <Participation
                                            participation={participation}
                                            tournamentName={
                                                participation.Tournament.name
                                            }
                                            nbMaxRaces={
                                                participation.Tournament
                                                    .nbMaxRaces
                                            }
                                            canAdd={canAdd}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Participations;
