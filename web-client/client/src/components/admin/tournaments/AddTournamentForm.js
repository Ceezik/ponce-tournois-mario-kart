import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
import TournamentForm from './TournamentForm';
import { nullifyEmptyFields, serializeTournament } from '../../../utils/utils';

function AddTournamentForm() {
    const { socket } = useSelector((state) => state.socket);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    const onSubmit = (tournament) => {
        setLoading(true);

        socket.emit(
            'createTournament',
            nullifyEmptyFields(serializeTournament(tournament)),
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
            <Helmet>
                <title>Créer un tournoi</title>
            </Helmet>

            <Row justify="center">
                <Col xs={12} md={10} lg={6}>
                    <h1 className="title--noMarginTop">Créer un tournoi</h1>

                    <TournamentForm
                        onSubmit={onSubmit}
                        onCancel={() => history.push('/admin/tournaments')}
                        loading={loading}
                        error={error}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default AddTournamentForm;
