import { Row, Col } from 'react-grid-system';
import ParticipationsStatistics from './ParticipationsStatistics';
import Pagination from './Pagination';

function UserStatistics({ userId }) {
    return (
        <div className="app__container">
            <Pagination />

            <Row justify="center">
                <Col xs={12}>
                    <ParticipationsStatistics
                        route="getUserParticipations"
                        userId={userId}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default UserStatistics;
