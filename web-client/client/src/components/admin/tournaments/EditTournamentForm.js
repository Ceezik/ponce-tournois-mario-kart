import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TournamentForm from './TournamentForm';
import { nullifyEmptyFields, serializeTournament } from '../../../utils/utils';

function EditTournamentForm({ tournament }) {
    const { socket } = useSelector((state) => state.socket);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    const onSubmit = (newTournament) => {
        setLoading(true);

        socket.emit(
            'updateTournament',
            {
                ...nullifyEmptyFields(serializeTournament(newTournament)),
                id: tournament.id,
            },
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
    }, []);

    return (
        <>
            <Helmet>
                <title>Modifier un tournoi</title>
            </Helmet>

            <h1 className="title--noMarginTop">Modifier un tournoi</h1>

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
