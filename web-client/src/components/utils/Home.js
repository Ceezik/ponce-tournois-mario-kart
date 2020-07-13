import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Container, Col, Row } from 'react-grid-system';
import { useSocket } from '../../utils/useSocket';
import ParticipationSkeleton from '../participations/ParticipationSkeleton';
import TournamentInfos from '../tournaments/TournamentInfos';
import Participation from '../participations/Participation';
import Podium from '../podiums/Podium';

function Home() {
    const { socket } = useSocket();
    const [participation, setParticipation] = useState(null);
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    socket.off('addRace').on('addRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            const newParticipation = _.cloneDeep(participation);
            newParticipation.Races.push(race);
            setParticipation(newParticipation);
        }
    });

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
            socket.off('addRace');
        };
    }, []);

    const fetchParticipation = () => {
        socket.emit('getLastPonceParticipation', (err) => {
            setError(err);
            setLoading(false);
        });
    };

    return (
        <Container className="app__container--home">
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
                            canAdd={false}
                        />
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Home;
