import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Container, Col, Row } from 'react-grid-system';
import { useSocket } from '../../utils/useSocket';
import { useAuth } from '../../utils/useAuth';
import ParticipationSkeleton from '../participations/ParticipationSkeleton';
import TournamentInfos from '../tournaments/TournamentInfos';
import Participation from '../participations/Participation';
import Podium from '../podiums/Podium';
import useTitle from '../../utils/useTitle';

function Home() {
    useTitle('Dernier tournoi');
    const { socket } = useSocket();
    const { user } = useAuth();
    const [showPonce, setShowPonce] = useState(true);
    const [participation, setParticipation] = useState(null);
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    socket
        .off('refreshTournaments')
        .on('refreshTournaments', () => fetchParticipation());

    socket.off('editParticipation').on('editParticipation', (p) => {
        if (participation && p.id === participation.id) {
            const newParticipation = _.cloneDeep(participation);
            newParticipation.goal = p.goal;
            setParticipation(newParticipation);
        }
    });

    socket.off('addRace').on('addRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            const newParticipation = _.cloneDeep(participation);
            newParticipation.Races.push(race);
            setParticipation(newParticipation);
        }
    });

    socket.off('editRace').on('editRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            const index = _.findIndex(participation.Races, { id: race.id });
            const newParticipation = _.cloneDeep(participation);

            newParticipation.Races.splice(index, 1, race);
            setParticipation(newParticipation);
        }
    });

    useEffect(() => {
        fetchParticipation();

        return () => {
            socket.off('getLastPonceParticipation');
            socket.off('getLastUserParticipation');
            socket.off('refreshTournaments');
            socket.off('editParticipation');
            socket.off('addRace');
            socket.off('editRace');
        };
    }, []);

    useEffect(() => {
        socket.on(
            showPonce
                ? 'getLastPonceParticipation'
                : 'getLastUserParticipation',
            ({ participation, record }) => {
                setRecord(record);
                setParticipation(participation);
                setLoading(false);
            }
        );

        setLoading(true);
        fetchParticipation();
    }, [showPonce]);

    const fetchParticipation = () => {
        socket.emit(
            showPonce
                ? 'getLastPonceParticipation'
                : 'getLastUserParticipation',
            (err) => {
                setError(err);
                setLoading(false);
            }
        );
    };

    return (
        <Container className="app__container">
            <Row justify="center">
                <Col xs={12} lg={8}>
                    <div className="formMessage formMessage--center formMessage__info">
                        Rejoignez le tournoi avec le code{' '}
                        {process.env.REACT_APP_TOURNAMENT_CODE} !
                    </div>

                    {user && (
                        <HomeButtons
                            showPonce={showPonce}
                            setShowPonce={setShowPonce}
                        />
                    )}
                </Col>
            </Row>

            {loading ? (
                <ParticipationSkeleton showButton={false} />
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
                        <TournamentInfos
                            tournament={participation.Tournament}
                        />
                        <Podium
                            tournamentId={participation.Tournament.id}
                            canAdd={false}
                        />
                        <Participation
                            participation={participation}
                            record={record}
                            tournamentName={participation.Tournament.name}
                            nbMaxRaces={participation.Tournament.nbMaxRaces}
                            canAdd={!showPonce}
                        />
                    </Col>
                </Row>
            )}
        </Container>
    );
}

function HomeButtons({ showPonce, setShowPonce }) {
    return (
        <Row justify="end" className="home__buttons">
            <Col xs="content">
                <button
                    className={!showPonce ? 'btnPrimary' : 'btnSecondary'}
                    onClick={() => setShowPonce(false)}
                >
                    Moi
                </button>
            </Col>

            <Col xs="content">
                <button
                    className={showPonce ? 'btnPrimary' : 'btnSecondary'}
                    onClick={() => setShowPonce(true)}
                >
                    Ponce
                </button>
            </Col>
        </Row>
    );
}

export default Home;
