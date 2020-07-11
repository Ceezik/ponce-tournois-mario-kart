import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import ParticipantsStatistics from './ParticipantsStatistics';
import ParticipationsStatistics from './ParticipationsStatistics';

function Statistics() {
    return (
        <Container className="app__container">
            <Row justify="center">
                <Col xs={12}>
                    <ParticipantsStatistics />
                    <ParticipationsStatistics />
                </Col>
            </Row>
        </Container>
    );
}

export default Statistics;
