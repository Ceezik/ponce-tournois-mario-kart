import Skeleton from 'react-loading-skeleton';
import { Row, Col } from 'react-grid-system';
import UserSkeleton from './UserSkeleton';

function UsersSkeleton() {
    return (
        <>
            <Row className="users__title">
                <Col xs={8}>
                    <Skeleton />
                </Col>
                <Col xs={4}>
                    <Skeleton />
                </Col>
            </Row>

            {[...Array(3)].map((i, index) => (
                <UserSkeleton key={index} />
            ))}
        </>
    );
}

export default UsersSkeleton;
