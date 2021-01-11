import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Container, Col, Row } from 'react-grid-system';
import ParticipationSkeleton from '../participations/ParticipationSkeleton';
import TournamentInfos from '../tournaments/TournamentInfos';
import Participation from '../participations/Participation';
import Podium from '../podiums/Podium';
import {
    getRecord,
    getWorst,
    getParticipationsWithNbPoints,
    getAverage,
} from '../../utils/utils';

function Home() {
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.auth);
    const [showPonce, setShowPonce] = useState(true);
    const [participation, setParticipation] = useState(null);
    const [record, setRecord] = useState(null);
    const [worst, setWorst] = useState(null);
    const [average, setAverage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        socket.on('createTournament', fetchParticipation);
        fetchParticipation();

        return () => {
            socket.off('getLastPonceParticipation');
            socket.off('getLastUserParticipation');
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
            (p) => {
                const [participation, ...participations] = p;
                const participationsWithNbPoints = getParticipationsWithNbPoints(
                    participations
                );

                setRecord(getRecord(participationsWithNbPoints));
                setWorst(getWorst(participationsWithNbPoints));
                setAverage(
                    getAverage(
                        participationsWithNbPoints,
                        participation.Tournament.nbMaxRaces
                    )
                );
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
            <Helmet>
                <title>Dernier tournoi</title>
            </Helmet>

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
                            defaultTournament={participation.Tournament}
                        />
                        <Podium
                            tournamentId={participation.Tournament.id}
                            canAdd={false}
                        />
                        <Participation
                            participation={participation}
                            record={record}
                            worst={worst}
                            average={average}
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
