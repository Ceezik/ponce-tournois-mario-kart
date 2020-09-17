import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-grid-system';
import ParticipationsStatistics from './ParticipationsStatistics';

function UserStatistics() {
    return (
        <Container className="app__container">
            <Helmet>
                <title>Mes statistiques</title>
            </Helmet>

            <Row justify="center">
                <Col xs={12} className="userStatistics__wrapper">
                    <ParticipationsStatistics route="getUserParticipations" />
                </Col>
            </Row>
        </Container>
    );
}

export default UserStatistics;
