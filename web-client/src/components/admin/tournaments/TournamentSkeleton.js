import React from 'react';
import { Row, Col } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function TournamentSkeleton({ showButton = true }) {
    return (
        <Row justify="center">
            <Col xs={12} lg={8}>
                {showButton && (
                    <Row justify="end">
                        <Col xs="content">
                            <Skeleton className="btnSkeleton" width="4rem" />
                        </Col>
                    </Row>
                )}

                <h1 className="tournament__title">
                    <Skeleton width="10rem" />
                </h1>

                <Skeleton
                    height="5rem"
                    className="tournament__infos--skeleton"
                />
            </Col>
        </Row>
    );
}

export default TournamentSkeleton;
