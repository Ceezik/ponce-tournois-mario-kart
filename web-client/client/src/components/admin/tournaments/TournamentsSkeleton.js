import { Row, Col } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function TournamentsSkeleton() {
    return (
        <>
            <Row justify="end">
                <Col xs="content">
                    <Skeleton className="btnSkeleton" width="7rem" />
                </Col>
            </Row>

            <h1 className="tournamentsList__title">
                <Skeleton width="9rem" />
            </h1>

            <TournamentsListSkeleton />
        </>
    );
}

export function TournamentsListSkeleton() {
    return (
        <Row>
            {[...Array(8)].map((i, index) => (
                <Col key={index} xs={12} md={6} lg={3}>
                    <Skeleton className="tournamentsList__tournament--skeleton" />
                </Col>
            ))}
        </Row>
    );
}

export default TournamentsSkeleton;
