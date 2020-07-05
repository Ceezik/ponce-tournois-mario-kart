import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../../utils/useSocket';
import Tournament from './Tournament';

function TournamentWrapper() {
    const { tournamentId } = useParams();
    const { socket } = useSocket();
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    socket.off('refreshTournament').on('refreshTournament', (newTournament) => {
        if (tournament && tournament.id === newTournament.id) {
            setTournament(newTournament);
        }
    });

    useEffect(() => {
        socket.on('getTournament', (tournament) => {
            setTournament(tournament);
            setLoading(false);
        });

        socket.emit('getTournament', tournamentId, (err) => {
            setError(err);
            setLoading(false);
        });

        return () => {
            socket.off('getTournament');
            socket.off('refreshTournament');
        };
    }, [tournamentId]);

    return (
        <Container className="app__container">
            {loading ? (
                <p>load</p>
            ) : error ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            {error}
                        </div>
                    </Col>
                </Row>
            ) : (
                <Tournament tournament={tournament} />
            )}
        </Container>
    );
}

export default TournamentWrapper;
