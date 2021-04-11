import { Container, Row, Col } from 'react-grid-system';
import ParticipationsStatistics from './ParticipationsStatistics';
import Pagination from './Pagination';

function UserStatistics({ userId }) {
    return (
        <Container className="app__container">
            <Pagination />

            <Row justify="center">
                <Col xs={12}>
                    <ParticipationsStatistics
                        route="getUserParticipations"
                        userId={userId}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default UserStatistics;
