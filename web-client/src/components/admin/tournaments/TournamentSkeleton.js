import React from 'react';
import { Row, Col } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function TournamentSkeleton() {
    return (
        <Row justify="center">
            <Col xs={12} lg={6}>
                <Row justify="end">
                    <Col xs="content">
                        <Skeleton className="btnSkeleton" width="4rem" />
                    </Col>
                </Row>

                <h1 className="tournament__title">
                    <Skeleton width="10rem" />
                </h1>

                <Skeleton height="5rem" />
            </Col>
        </Row>
    );
}

export default TournamentSkeleton;
