import React from 'react';
import { Row, Col } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function ParticipationChartSkeleton({ showAddComparison = true }) {
    return (
        <>
            <Row className="participation__chartLegends--skeleton">
                {[...Array(3)].map((i, index) => (
                    <Col key={index}>
                        <Row align="center">
                            <Col xs="content">
                                <Skeleton height="1.5rem" width="1.5rem" />
                            </Col>
                            <Col>
                                <Skeleton />
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
            <Skeleton
                height="17rem"
                className="participation__chart--skeleton"
            />
            {showAddComparison && (
                <Skeleton
                    height="2.5rem"
                    className="participation__comparison--skeleton"
                />
            )}
        </>
    );
}

export default ParticipationChartSkeleton;
