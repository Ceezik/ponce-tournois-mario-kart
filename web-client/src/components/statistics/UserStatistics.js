import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import ParticipationsStatistics from './ParticipationsStatistics';
import useTitle from '../../utils/useTitle';

function UserStatistics() {
    useTitle('Mes statistiques');

    return (
        <Container className="app__container">
            <Row justify="center">
                <Col xs={12} className="userStatistics__wrapper">
                    <ParticipationsStatistics route="getUserParticipations" />
                </Col>
            </Row>
        </Container>
    );
}

export default UserStatistics;
