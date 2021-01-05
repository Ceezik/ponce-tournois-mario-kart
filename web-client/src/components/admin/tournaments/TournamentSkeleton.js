import React from 'react';
import { Row, Col, Hidden, useScreenClass } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function TournamentSkeleton({ showButton = true }) {
    const screenClass = useScreenClass();

    return (
        <Row justify="center">
            <Col xs={12} lg={8}>
                {showButton && (
                    <Row
                        align="center"
                        justify={screenClass === 'xs' ? 'center' : 'end'}
                    >
                        <Hidden xs>
                            <Col xs="content">
                                <Skeleton
                                    style={{ visibility: 'hidden' }}
                                    className="btnSkeleton"
                                    width="1rem"
                                />
                            </Col>
                        </Hidden>

                        <Col>
                            <Skeleton className="selectSkeleton" />
                        </Col>

                        <Hidden xs>
                            <Col xs="content">
                                <Skeleton
                                    className="btnSkeleton"
                                    width="1rem"
                                />
                            </Col>
                        </Hidden>
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
