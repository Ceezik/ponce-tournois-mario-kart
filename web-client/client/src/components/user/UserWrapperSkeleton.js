import { Col, Row } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function UserWrapperSkeleton() {
    return (
        <Row justify="center">
            <Col xs={12} lg={8}>
                <h1 className="userTitle">
                    <Skeleton width="18rem" />
                </h1>

                <Row>
                    {[...Array(4)].map((i, index) => (
                        <Col
                            key={index}
                            xs={6}
                            sm="content"
                            className="userMenu__navListItem"
                        >
                            <Skeleton width="5rem" />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
}

export default UserWrapperSkeleton;
