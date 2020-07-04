import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { useSocket } from '../../../utils/useSocket';
import TournamentForm from './TournamentForm';
import { removeEmptyFields } from '../../../utils/utils';
import history from '../../../utils/history';

function AddTournamentForm() {
    const { socket } = useSocket();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = (tournament) => {
        setLoading(true);

        socket.emit(
            'createTournament',
            removeEmptyFields(tournament),
            (err) => {
                setError(err);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        socket.on('createTournament', (tournament) => {
            setLoading(false);
            history.push(`/admin/tournaments/${tournament.id}`);
        });
    }, []);

    return (
        <Container className="app__container">
            <Row justify="center">
                <Col xs={12} md={10} lg={6}>
                    <h1>Créer un tournoi</h1>

                    <TournamentForm
                        onSubmit={onSubmit}
                        loading={loading}
                        error={error}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default AddTournamentForm;
