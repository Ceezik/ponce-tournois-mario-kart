import { useSelector } from 'react-redux';
import useComparisons from '../../hooks/useComparisons';
import ParticipationChart from './ParticipationChart';
import ParticipationChartSkeleton from './ParticipationChartSkeleton';
import ParticipationComparison from './ParticipationComparison';

function ParticipationComparisonsChart({
    participation,
    nbMaxRaces,
    tournamentName,
    user,
}) {
    const {
        comparisons,
        onAddComparison,
        onRemoveComparison,
        loading,
    } = useComparisons({
        tournament: participation?.TournamentId,
        excludedParticipations: participation ? [participation] : undefined,
    });

    return loading ? (
        <ParticipationChartSkeleton showAddBtn />
    ) : (
        <>
            <ParticipationChart
                current={participation}
                user={user}
                tournament={{
                    id: participation.TournamentId,
                    name: tournamentName,
                }}
                nbMaxRaces={nbMaxRaces}
                onRemoveComparison={onRemoveComparison}
                comparisons={comparisons}
            />

            <ParticipationComparison
                tournament={participation.TournamentId}
                onAddComparison={onAddComparison}
                comparedUsers={[
                    ...comparisons.map((c) => c.User.id),
                    participation.UserId,
                ]}
            />
        </>
    );
}

export default ParticipationComparisonsChart;
