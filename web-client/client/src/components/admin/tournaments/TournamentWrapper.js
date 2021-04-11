import { Container, Row, Col } from 'react-grid-system';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tournament from './Tournament';
import TournamentSkeleton from './TournamentSkeleton';
import { getTournamentById } from '../../../redux/selectors/tournaments';

function TournamentWrapper() {
    const { tournamentId } = useParams();
    const { loading } = useSelector((state) => state.tournaments);
    const tournament = useSelector((state) =>
        getTournamentById(state, tournamentId)
    );

    return (
        <Container className="app__container">
            {loading ? (
                <TournamentSkeleton showHistory={false} showEdit={true} />
            ) : !tournament ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            Ce tournoi n'existe pas
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
