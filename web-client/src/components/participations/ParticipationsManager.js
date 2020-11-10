import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setPonceParticipations,
    setUserParticipations,
} from '../../redux/actions/participations';

const PARTICIPATION_TYPES = [
    { route: 'getPonceParticipations', action: setPonceParticipations },
    { route: 'getUserParticipations', action: setUserParticipations },
];

function ParticipationsManager() {
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        PARTICIPATION_TYPES.forEach((t) => {
            socket.on(t.route, (participations) => {
                dispatch(
                    t.action({ participations, loading: false, error: null })
                );
            });
        });

        socket.on('refreshTournaments', () => fetchParticipations());

        fetchParticipations();

        return () => {
            socket.off('refreshTournaments');
            PARTICIPATION_TYPES.forEach((t) => socket.off(t.route));
        };
    }, []);

    const fetchParticipations = () => {
        PARTICIPATION_TYPES.forEach((t) => {
            socket.emit(t.route, (err) => {
                dispatch(t.action({ loading: false, error: err }));
            });
        });
    };

    return <></>;
}

export default ParticipationsManager;
