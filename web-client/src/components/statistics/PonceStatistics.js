import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-grid-system';
import ParticipantsStatistics from './ParticipantsStatistics';
import ParticipationsStatistics from './ParticipationsStatistics';

function PonceStatistics() {
    return (
        <Container className="app__container">
            <Helmet>
                <title>Statistiques</title>
            </Helmet>

            <Row justify="center">
                <Col xs={12}>
                    <ParticipantsStatistics />
                    <ParticipationsStatistics route="getPonceParticipations" />
                </Col>
            </Row>
        </Container>
    );
}

export default PonceStatistics;
