import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-grid-system';
import ParticipationsStatistics from './ParticipationsStatistics';
import Pagination from './Pagination';

function UserStatistics() {
    return (
        <Container className="app__container">
            <Helmet>
                <title>Mes statistiques</title>
            </Helmet>

            <Pagination />

            <Row justify="center">
                <Col xs={12}>
                    <ParticipationsStatistics route="getUserParticipations" />
                </Col>
            </Row>
        </Container>
    );
}

export default UserStatistics;
