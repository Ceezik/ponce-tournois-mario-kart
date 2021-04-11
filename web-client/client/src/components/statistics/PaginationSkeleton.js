import { Col, Row } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function PaginationSkeleton() {
    return (
        <Row justify="end">
            <Col xs="content">
                <Skeleton width="18rem" height="2rem" />
            </Col>
        </Row>
    );
}

export default PaginationSkeleton;
