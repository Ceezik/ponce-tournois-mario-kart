import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import ParticipantsStatistics from './ParticipantsStatistics';
import ParticipationsStatistics from './ParticipationsStatistics';
import useTitle from '../../utils/useTitle';

function PonceStatistics() {
    useTitle('Statistiques');

    return (
        <Container className="app__container">
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
