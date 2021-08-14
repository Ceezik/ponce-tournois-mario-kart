import Skeleton from 'react-loading-skeleton';

function ChartSkeleton() {
    return (
        <>
            <h1 className="statistics__title">
                <Skeleton width="50%" />
            </h1>

            <Skeleton height="30rem" />
        </>
    );
}

export default ChartSkeleton;
