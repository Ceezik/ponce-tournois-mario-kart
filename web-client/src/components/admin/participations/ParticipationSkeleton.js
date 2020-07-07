import React from 'react';
import { Row, Col } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function ParticipationSkeleton() {
    return (
        <>
            <Skeleton height="5rem" />

            <div className="participation">
                <Row>
                    <Col xs={3}>
                        <Skeleton />
                    </Col>
                    <Col xs={3}>
                        <Skeleton />
                    </Col>
                    <Col xs={6}>
                        <Skeleton />
                    </Col>
                </Row>

                {[...Array(8)].map((i, index) => (
                    <Skeleton
                        key={index}
                        className="participation__race--skeleton"
                    />
                ))}
            </div>
        </>
    );
}

export default ParticipationSkeleton;
