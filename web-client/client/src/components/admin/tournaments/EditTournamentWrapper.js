import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-grid-system';
import EditTournamentForm from './EditTournamentForm';
import TournamentFormSkeleton from './TournamentFormSkeleton';
import { getTournamentById } from '../../../redux/selectors/tournaments';

function EditTournamentWrapper() {
    const { tournamentId } = useParams();
    const { loading } = useSelector((state) => state.tournaments);
    const tournament = useSelector((state) =>
        getTournamentById(state, tournamentId)
    );

    return (
        <Container className="app__container">
            {loading ? (
                <TournamentFormSkeleton />
            ) : !tournament ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            Ce tournoi n'existe pas
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
