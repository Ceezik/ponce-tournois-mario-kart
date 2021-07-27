import { Helmet } from 'react-helmet';
import { Row, Col } from 'react-grid-system';
import ParticipantsStatistics from './ParticipantsStatistics';
import ParticipationsStatistics from './ParticipationsStatistics';
import Pagination from './Pagination';

function PonceStatistics() {
    return (
        <div className="app__container">
            <Helmet>
                <title>Statistiques</title>
            </Helmet>

            <Pagination />

            <Row justify="center">
                <Col xs={12}>
                    <ParticipantsStatistics />
                    <ParticipationsStatistics route="getPonceParticipations" />
                </Col>
            </Row>
        </div>
    );
}

export default PonceStatistics;
