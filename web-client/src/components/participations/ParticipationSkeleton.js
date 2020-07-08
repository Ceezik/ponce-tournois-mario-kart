import React from 'react';
import TournamentSkeleton from '../admin/tournaments/TournamentSkeleton';
import AdminParticipationSkeleton from '../admin/participations/ParticipationSkeleton';
import { Row, Col } from 'react-grid-system';

function ParticipationSkeleton() {
    return (
        <>
            <TournamentSkeleton />

            <Row justify="center" style={{ marginTop: '1rem' }}>
                <Col xs={12} lg={6}>
                    <AdminParticipationSkeleton />
                </Col>
            </Row>
        </>
    );
}

export default ParticipationSkeleton;
