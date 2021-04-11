import { Row, Col } from 'react-grid-system';
import Skeleton from 'react-loading-skeleton';

function PatchNotesSkeleton() {
    return (
        <>
            <Row justify="end">
                <Col xs="content">
                    <Skeleton className="btnSkeleton" width="9rem" />
                </Col>
            </Row>

            <h1 className="patchNotesList__title--skeleton">
                <Skeleton width="11rem" />
            </h1>

            <PatchNotesListSkeleton />
        </>
    );
}

export function PatchNotesListSkeleton() {
    return (
        <Row>
            {[...Array(8)].map((i, index) => (
                <Col key={index} xs={12} md={6} lg={3}>
                    <Skeleton className="patchNotesList__patchNote--skeleton" />
                </Col>
            ))}
        </Row>
    );
}

export default PatchNotesSkeleton;
