import { Row, Col } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function CupsSkeleton() {
    return (
        <>
            <h1>
                <Skeleton width="7rem" />
            </h1>

            <Row justify="between">
                {[...Array(12)].map((i, index) => (
                    <Col key={index} xs={6} md={4} lg={2}>
                        <Skeleton className="cupsList__cup--skeleton" />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default CupsSkeleton;
