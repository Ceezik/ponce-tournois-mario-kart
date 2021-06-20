import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { generateColor } from '../utils/utils';

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

const uniqueComparisons = (comparisons) =>
    comparisons.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

export default ({ tournament, excludedParticipations = [] }) => {
    const { socket } = useSelector((state) => state.socket);
    const [comparisons, setComparisons] = useState([]);
    const [loading, setLoading] = useState(true);

    socket
        .off('getParticipations')
        .on('getParticipations', (participations) => {
            setComparisons(
                uniqueComparisons(
                    participations.map((p) => ({
                        ...p,
                        color: generateColor(),
                    }))
                )
            );
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
        const newComparisons = uniqueComparisons([
            ...comparisons,
            { ...p, color: generateColor() },
        ]);
        storeInLocalStorage(newComparisons);
        setComparisons(newComparisons);
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
