import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-grid-system';
import EditTournamentForm from './EditTournamentForm';
import TournamentFormSkeleton from './TournamentFormSkeleton';

function EditTournamentWrapper() {
    const { tournamentId } = useParams();
    const { socket } = useSelector((state) => state.socket);
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('getTournament', (tournament) => {
            setTournament(tournament);
            setLoading(false);
        });

        socket.emit('getTournament', tournamentId, (err) => {
            setError(err);
            setLoading(false);
        });

        return () => socket.off('getTournament');
    }, [tournamentId]);

    return (
        <Container className="app__container">
            {loading ? (
                <TournamentFormSkeleton />
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
                    <Col xs={12} md={10} lg={6}>
                        <EditTournamentForm tournament={tournament} />
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default EditTournamentWrapper;
