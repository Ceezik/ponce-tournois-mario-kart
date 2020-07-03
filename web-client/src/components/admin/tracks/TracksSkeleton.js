import React from 'react';
import { Row, Col } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function TracksSkeleton() {
    return (
        <>
            <h1>
                <Skeleton width="50%" />
            </h1>

            <Row>
                {[...Array(4)].map((i, index) => (
                    <Col key={index} xs={12} md={6} lg={3}>
                        <Skeleton className="cupsList__track--skeleton" />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default TracksSkeleton;
