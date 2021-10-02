import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComparisonColor, isComparisonUnique } from '../utils/utils';
import {
    setLoading as setLoadingAction,
    setComparisons as setComparisonsAction,
    onGetParticipations as onGetParticipationsAction,
} from '../redux/actions/useComparisons';
import useSideEffects from './useSideEffects';

const getFromLocalStorage = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem('comparisons'));
        if (!parsed || !Array.isArray(parsed)) return [];
        return parsed;
    } catch (err) {
        return [];
    }
};

const storeInLocalStorage = (comparisons) => {
    localStorage.setItem(
        'comparisons',
        JSON.stringify(comparisons.map(({ User }) => User.username))
    );
};

export default ({ tournament, excludedParticipations = [] }) => {
    const dispatch = useDispatch();
    const { socket } = useSelector((state) => state.socket);
    const { comparisons, loading } = useSelector(
        (state) => state.useComparisons
    );

    const setComparisons = (args) => dispatch(setComparisonsAction(args));
    const setLoading = (args) => dispatch(setLoadingAction(args));

    const onGetParticipations = (participations) => {
        dispatch(onGetParticipationsAction(participations));
    };

    useSideEffects({
        sideEffects: [
            {
                event: 'getParticipations',
                callback: onGetParticipations,
            },
        ],
    });

    const fetchParticipations = () => {
        const usernames = getFromLocalStorage();
        if (usernames.length === 0) setLoading(false);
        else {
            const participationsInfos = usernames.map((username) => ({
                tournament,
                username,
            }));
            socket.emit('getParticipations', participationsInfos, () => {
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        if (tournament) {
            setComparisons([]);
            setLoading(true);
            fetchParticipations();
        }

        return () => socket.off('getParticipations');
    }, [tournament]);

    const onAddComparison = (p) => {
        if (isComparisonUnique(p, comparisons)) {
            const newComparisons = [
                ...comparisons,
                {
                    ...p,
                    color: getComparisonColor(comparisons.map((c) => c.color)),
                },
            ];
            storeInLocalStorage(newComparisons);
            setComparisons(newComparisons);
        }
    };

    const onRemoveComparison = (p) => {
        const newComparisons = comparisons.filter((c) => c.User.username !== p);
        storeInLocalStorage(newComparisons);
        setComparisons(newComparisons);
    };

    const filteredComparisons = comparisons.filter(
        (c) => !excludedParticipations.find((e) => e.id === c.id)
    );

    return {
        comparisons: filteredComparisons,
        onAddComparison,
        onRemoveComparison,
        setComparisons,
        loading,
    };
};
