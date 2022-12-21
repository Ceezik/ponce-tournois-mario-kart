import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {
    addRaceToParticipation,
    editRaceFromParticipation,
    getParticipationNbPoints,
} from '../../../../utils/utils';

function NbPoints({ participation }) {
    const nbPoints = getParticipationNbPoints(participation);

    return <div>{nbPoints} points</div>;
}

function Races({ participation }) {
    const chunkedRaces = _.chunk(
        participation.Races.map((r) => r.position),
        4
    ).map((r) => r.join('-'));

    return <div>{chunkedRaces.join(' | ')}</div>;
}

function OBSPluginPoints({ userId, showRaces, showNbPoints }) {
    const { socket } = useSelector((state) => state.socket);

    const [participation, setParticipation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    socket
        .off('getLastUserParticipation')
        .on('getLastUserParticipation', (p) => {
            const [participation] = p;
            setParticipation(participation);
            setLoading(false);
        });

    socket.off('editParticipation').on('editParticipation', (p) => {
        if (participation && p.id === participation.id)
            setParticipation({ ...participation, ...p });
    });

    socket.off('addRace').on('addRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            setParticipation(addRaceToParticipation({ race, participation }));
        }
    });

    socket.off('editRace').on('editRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            setParticipation(
                editRaceFromParticipation({ race, participation })
            );
        }
    });

    useEffect(() => {
        socket.on('createTournament', fetchParticipation);

        return () => {
            socket.off('getLastUserParticipation');
            socket.off('createTournament');
            socket.off('editParticipation');
            socket.off('addRace');
            socket.off('editRace');
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchParticipation();
    }, [userId]);

    const fetchParticipation = () => {
        socket.emit('getLastUserParticipation', userId, (err) => {
            setError(err);
            setLoading(false);
        });
    };

    if (loading) return <div>Chargement ...</div>;
    if (error) return <div>Erreur : {error}</div>;

    return (
        <div>
            {showNbPoints && <NbPoints participation={participation} />}
            {showRaces && <Races participation={participation} />}
        </div>
    );
}

function OBSPluginPointsWrapper() {
    const { search } = useLocation();
    const { userId, showNbPoints, showRaces } = useMemo(
        () => queryString.parse(search),
        [search]
    );

    return (
        <div className="OBSPluginPoints">
            {userId ? (
                <OBSPluginPoints
                    userId={userId}
                    showRaces={showRaces === 'true'}
                    showNbPoints={showNbPoints === 'true'}
                />
            ) : (
                <div>userId manquant</div>
            )}
        </div>
    );
}

export default OBSPluginPointsWrapper;
