import { Col, Row } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function PatchNoteSkeleton() {
    return (
        <Row justify="center">
            <Col xs={12} lg={8}>
                <Row justify="end">
                    <Col xs="content">
                        <Skeleton className="btnSkeleton" width="4rem" />
                    </Col>
                </Row>

                <h1 className="patchNote__title">
                    <Skeleton width="17rem" />
                </h1>

                <Skeleton className="patchNote__preview" />
            </Col>
        </Row>
    );
}

export default PatchNoteSkeleton;
