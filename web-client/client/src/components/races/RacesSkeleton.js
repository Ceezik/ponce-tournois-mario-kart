import { Row, Col } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function RacesSkeleton() {
    return (
        <Row justify="center">
            <Col xs={12} lg={10} xxl={8} className="races__wrapper--skeleton">
                {[...Array(2)].map((i, index) => (
                    <div key={index}>
                        <h1 className="races__cup">
                            <Skeleton width="10rem" />
                        </h1>

                        <Row className="races__title">
                            <Col xs={3} lg={4}>
                                <Skeleton />
                            </Col>
                            <Col xs={3}>
                                <Skeleton />
                            </Col>
                            <Col xs={3}>
                                <Skeleton />
                            </Col>
                            <Col xs={3} lg={2}>
                                <Skeleton />
                            </Col>
                        </Row>

                        {[...Array(4)].map((i, index) => (
                            <Skeleton
                                key={index}
                                className="races__trackWrapper--skeleton"
                            />
                        ))}
                    </div>
                ))}
            </Col>
        </Row>
    );
}

export default RacesSkeleton;
