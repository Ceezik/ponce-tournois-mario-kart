import React from 'react';
import TournamentSkeleton from '../admin/tournaments/TournamentSkeleton';
import AdminParticipationSkeleton from '../admin/participations/ParticipationSkeleton';
import { Row, Col } from 'react-grid-system';

function ParticipationSkeleton({ showButton = true }) {
    return (
        <>
            <TournamentSkeleton showButton={showButton} />

            <Row justify="center" style={{ marginTop: '1rem' }}>
                <Col xs={12} lg={8}>
                    <AdminParticipationSkeleton />
                </Col>
            </Row>
        </>
    );
}

export default ParticipationSkeleton;
