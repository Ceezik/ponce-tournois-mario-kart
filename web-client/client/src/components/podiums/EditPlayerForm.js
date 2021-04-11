import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PlayerForm from './PlayerForm';

function EditPlayerForm({ closeForm, podium }) {
    const { socket } = useSelector((state) => state.socket);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('closeEditPlayerForm', () => closeForm());

        return () => socket.off('closeEditPlayerForm');
    }, []);

    const onSubmit = ({ player, position }) => {
        setLoading(true);

        socket.emit(
            'editPodium',
            { player, position: parseInt(position), id: podium.id },
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
            podium={podium}
        />
    );
}

export default EditPlayerForm;
