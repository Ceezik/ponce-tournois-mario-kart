import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getComparisonColor } from '../utils/utils';

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

const isComparisonUnique = (comparison, comparisons) =>
    !comparisons.some((c) => c.id === comparison.id);

export default ({ tournament, excludedParticipations = [] }) => {
    const { socket } = useSelector((state) => state.socket);
    const [comparisons, setComparisons] = useState([]);
    const [loading, setLoading] = useState(true);

    socket
        .off('getParticipations')
        .on('getParticipations', (participations) => {
            const { comparisons: newComparisons } = participations.reduce(
                (acc, curr) => {
                    if (!isComparisonUnique(curr, comparisons)) return acc;

                    const color = getComparisonColor(acc.alreadyUsedColors);
                    return {
                        comparisons: [...acc.comparisons, { ...curr, color }],
                        alreadyUsedColors: [...acc.alreadyUsedColors, color],
                    };
                },
                { comparisons: [], alreadyUsedColors: [] }
            );

            setComparisons(newComparisons);
            setLoading(false);
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
