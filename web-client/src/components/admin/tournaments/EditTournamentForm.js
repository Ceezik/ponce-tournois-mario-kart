import React, { useState, useEffect } from 'react';
import { useSocket } from '../../../utils/useSocket';
import TournamentForm from './TournamentForm';
import { removeEmptyFields } from '../../../utils/utils';
import history from '../../../utils/history';

function EditTournamentForm({ tournament }) {
    const { socket } = useSocket();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = (newTournament) => {
        setLoading(true);

        socket.emit(
            'updateTournament',
            { ...removeEmptyFields(newTournament), id: tournament.id },
            (err) => {
                setError(err);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        socket.on('updateTournament', (tournament) => {
            setLoading(false);
            history.push(`/admin/tournaments/${tournament.id}`);
        });

        return () => socket.off('updateTournament');
    }, []);

    return (
        <>
            <h1>Modifier un tournoi</h1>

            <TournamentForm
                tournament={tournament}
                onSubmit={onSubmit}
                onCancel={() =>
                    history.push(`/admin/tournaments/${tournament.id}`)
                }
                loading={loading}
                error={error}
            />
        </>
    );
}

export default EditTournamentForm;
