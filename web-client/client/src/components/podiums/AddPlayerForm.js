import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PlayerForm from './PlayerForm';

function AddPlayerForm({ closeForm, tournamentId }) {
    const { socket } = useSelector((state) => state.socket);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('closeAddPlayerForm', () => closeForm());

        return () => socket.off('closeAddPlayerForm');
    }, []);

    const onSubmit = ({ player, position }) => {
        setLoading(true);

        socket.emit(
            'addPodium',
            { player, position: parseInt(position), tournamentId },
            (err) => {
                setError(err);
                setLoading(false);
            }
        );
    };

    return (
        <PlayerForm
            onSubmit={onSubmit}
            closeForm={closeForm}
            error={error}
            loading={loading}
        />
    );
}

export default AddPlayerForm;
