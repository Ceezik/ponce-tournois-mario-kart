import { Row, Col } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function PatchNoteFormSkeleton() {
    return (
        <Row justify="center">
            <Col xs={12} md={10} lg={6}>
                <h1>
                    <Skeleton width="18rem" />
                </h1>

                <div className="inputWrapper">
                    <Skeleton width="5rem" />
                    <Skeleton className="inputSkeleton" width="90%" />
                </div>

                <Row>
                    <Col xs="content">
                        <Skeleton className="btnSkeleton" width="5rem" />
                    </Col>
                    <Col xs="content">
                        <Skeleton className="btnSkeleton" width="5rem" />
                    </Col>
                </Row>

                <Skeleton className="patchNote__preview patchNote__preview--skeleton" />

                <Row justify="end">
                    <Col xs="content">
                        <Skeleton className="btnSkeleton" width="5rem" />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default PatchNoteFormSkeleton;
