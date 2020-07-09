import React, { useState, useEffect } from 'react';
import { useSocket } from '../../utils/useSocket';
import { Container, Col, Row } from 'react-grid-system';
import ParticipationSkeleton from '../participations/ParticipationSkeleton';
import TournamentInfos from '../tournaments/TournamentInfos';
import Participation from '../participations/Participation';

function Home() {
    const { socket } = useSocket();
    const [participation, setParticipation] = useState(null);
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('getLastPonceParticipation', ({ participation, record }) => {
            setRecord(record);
            setParticipation(participation);
            setLoading(false);
        });

        socket.on('refreshTournaments', () => fetchParticipation());

        fetchParticipation();

        return () => {
            socket.off('getLastPonceParticipation');
            socket.off('refreshTournaments');
        };
    }, []);

    const fetchParticipation = () => {
        setLoading(true);

        socket.emit('getLastPonceParticipation', (err) => {
            setError(err);
            setLoading(false);
        });
    };

    return (
        <Container className="app__container">
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

                        <Participation
                            participation={participation}
                            record={record}
                            tournamentName={participation.Tournament.name}
                            refreshParticipation={setParticipation}
                            nbMaxRaces={participation.Tournament.nbMaxRaces}
                            canAdd={false}
                        />
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Home;
