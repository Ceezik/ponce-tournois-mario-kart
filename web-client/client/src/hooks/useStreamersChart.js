import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setLoadingComparisons as setLoadingComparisonsAction,
    setStreamers as setStreamersAction,
    setStreamersComparisons as setStreamersComparisonsAction,
    setLoadingStreamers as setLoadingStreamersAction,
    onGetParticipations as onGetParticipationsAction,
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
        dispatch(onGetParticipationsAction(participations));
    };

    const onGetStreamersChart = (streamersChart) => {
        setStreamers(streamersChart);
        setLoadingStreamers(false);
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
        ],
    });

    const fetchStreamersChart = () => {
        socket.emit('getStreamersChart', { tournament }, () => {
            setLoadingStreamers(false);
        });
    };

    const fetchParticipations = () => {
        const participationsInfos = streamers
            .filter((s) => !streamersComparisons.find((p) => p.UserId === s.id))
            .map((streamer) => ({
                tournament,
                username: streamer.username,
            }));
        if (participationsInfos.length === 0) setLoadingComparisons(false);
        else {
            socket.emit('getParticipations', participationsInfos, () => {
                setLoadingComparisons(false);
            });
        }
    };

    useEffect(() => {
        setLoadingStreamers(true);
        fetchStreamersChart();
    }, [tournament]);

    useEffect(() => {
        setLoadingComparisons(true);
        fetchParticipations();
    }, [streamers]);

    const onAddStreamer = (streamer) => setStreamers([...streamers, streamer]);

    const onRemoveStreamer = (streamer) => {
        setStreamers(streamers.filter((s) => s.id !== streamer.id));
        setStreamersComparisons(
            streamersComparisons.filter((s) => s.UserId !== streamer.id)
        );
    };

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
        onAddStreamer,
        onRemoveStreamer,
    };
};
