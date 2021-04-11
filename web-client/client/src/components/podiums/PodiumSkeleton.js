import { Row, Col } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function PodiumSkeleton() {
    return (
        <Row>
            {[...Array(3)].map((i, index) => (
                <Col xs={12} lg={4} key={index}>
                    <Skeleton className="podium__player--skeleton" />
                </Col>
            ))}
        </Row>
    );
}

export default PodiumSkeleton;
