import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useComparisons from '../../hooks/useComparisons';
import useStreamersChart from '../../hooks/useStreamersChart';
import AddParticipationStreamersChart from './AddParticipationStreamersChart';
import ParticipationChart from './ParticipationChart';
import ParticipationChartSkeleton from './ParticipationChartSkeleton';

function ParticipationStreamersChart({
    participation,
    nbMaxRaces,
    tournamentName,
    user,
}) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { socket } = useSelector((state) => state.socket);
    const {
        loadingStreamers,
        loadingComparisons,
        streamersComparisons,
        onAddStreamer,
        onRemoveStreamer,
    } = useStreamersChart({
        tournament: participation?.TournamentId,
        excludedParticipations: participation ? [participation] : undefined,
    });

    const removeFromStreamersChart = (streamer) =>
        socket.emit(
            'removeFromStreamersChart',
            {
                username: streamer,
                tournament: participation?.TournamentId,
            },
            console.error
        );

    socket
        .off('removeFromStreamersChart')
        .on('removeFromStreamersChart', onRemoveStreamer);

    useEffect(() => {
        return () => socket.off('removeFromStreamersChart');
    }, []);

    return loadingStreamers || loadingComparisons ? (
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
                onRemoveComparison={
                    currentUser?.isAdmin ? removeFromStreamersChart : undefined
                }
                comparisons={streamersComparisons}
            />

            {currentUser?.isAdmin && (
                <AddParticipationStreamersChart
                    tournament={participation.TournamentId}
                    onAddStreamer={onAddStreamer}
                    comparedStreamers={[
                        ...streamersComparisons.map((c) => c.User.id),
                        participation.UserId,
                    ]}
                />
            )}
        </>
    );
}

export default ParticipationStreamersChart;
