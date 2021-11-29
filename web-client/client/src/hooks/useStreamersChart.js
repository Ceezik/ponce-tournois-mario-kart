import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setLoadingComparisons as setLoadingComparisonsAction,
    setStreamers as setStreamersAction,
    setStreamersComparisons as setStreamersComparisonsAction,
    setLoadingStreamers as setLoadingStreamersAction,
    onGetParticipations as onGetParticipationsAction,
    resetState,
} from '../redux/actions/useStreamersChart';
import useSideEffects from './useSideEffects';

export default ({ tournament, excludedParticipations = [] }) => {
    const dispatch = useDispatch();
    const { socket } = useSelector((state) => state.socket);
    const {
        streamers,
        loadingStreamers,
        streamersComparisons,
        loadingComparisons,
    } = useSelector((state) => state.useStreamersChart);

    const setLoadingComparisons = (args) =>
        dispatch(setLoadingComparisonsAction(args));
    const setStreamers = (args) => dispatch(setStreamersAction(args));
    const setStreamersComparisons = (args) =>
        dispatch(setStreamersComparisonsAction(args));
    const setLoadingStreamers = (args) =>
        dispatch(setLoadingStreamersAction(args));

    const onGetParticipations = (participations) => {
        dispatch(
            onGetParticipationsAction(
                participations.filter((p) =>
                    streamers.some((s) => s.id === p.UserId)
                )
            )
        );
    };

    const onGetStreamersChart = (streamersChart) => {
        setStreamers(streamersChart);
        setLoadingStreamers(false);
    };

    const onAddStreamer = (streamer) => {
        if (streamer.StreamersChart.TournamentId === tournament)
            setStreamers([...streamers, streamer]);
    };

    const onRemoveStreamer = (streamer) => {
        if (streamer.StreamersChart.TournamentId === tournament) {
            setStreamers(streamers.filter((s) => s.id !== streamer.id));
            setStreamersComparisons(
                streamersComparisons.filter((s) => s.UserId !== streamer.id)
            );
        }
    };

    useSideEffects({
        sideEffects: [
            {
                event: 'getParticipations',
                callback: onGetParticipations,
            },
            {
                event: 'getStreamersChart',
                callback: onGetStreamersChart,
            },
            {
                event: 'addToStreamersChart',
                callback: onAddStreamer,
            },
            {
                event: 'removeFromStreamersChart',
                callback: onRemoveStreamer,
            },
        ],
        dependencies: [
            JSON.stringify(streamers),
            JSON.stringify(streamersComparisons),
            tournament,
        ],
    });

    const fetchStreamersChart = () => {
        socket.emit('getStreamersChart', { tournament }, () => {
            setLoadingStreamers(false);
        });
    };

    const fetchParticipations = () => {
        const participationsInfos = streamers
            .filter(
                (s) =>
                    !streamersComparisons.find(
                        (p) =>
                            p.UserId === s.id && p.TournamentId === tournament
                    )
            )
            .map((streamer) => ({
                tournament,
                username: streamer.username,
            }));
        if (streamers.length === 0) {
            setLoadingComparisons(false);
            setStreamersComparisons([]);
        } else if (participationsInfos.length === 0)
            setLoadingComparisons(false);
        else {
            socket.emit('getParticipations', participationsInfos, () => {
                setLoadingComparisons(false);
            });
        }
    };

    useEffect(() => {
        setLoadingStreamers(true);
        if (tournament) fetchStreamersChart();
    }, [tournament]);

    useEffect(() => {
        setLoadingComparisons(true);
        fetchParticipations();
    }, [JSON.stringify(streamers)]);

    useEffect(() => {
        return () => dispatch(resetState());
    }, []);

    const filteredStreamersComparisons = streamersComparisons.filter(
        (c) => !excludedParticipations.find((e) => e.id === c.id)
    );

    return {
        loadingStreamers,
        streamers,
        setStreamers,
        loadingComparisons,
        streamersComparisons: filteredStreamersComparisons,
        setStreamersComparisons,
    };
};
