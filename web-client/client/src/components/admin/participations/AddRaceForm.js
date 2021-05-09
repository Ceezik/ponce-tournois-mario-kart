import { useState, useEffect } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { getNbPointsFromPosition } from '../../../utils/utils';
import RaceForm from './RaceForm';

function AddRaceForm({ closeForm, participationId }) {
    const { tracks } = useSelector((state) => state.tracks);
    const { socket } = useSelector((state) => state.socket);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('closeAddRaceForm', () => closeForm());

        return () => socket.off('closeAddRaceForm');
    }, []);

    const onSubmit = ({ position, trackName, disconnected }) => {
        const track = _.find(tracks, ['name', trackName]);

        if (track) {
            setLoading(true);

            socket.emit(
                'addRace',
                {
                    position: parseInt(position),
                    nbPoints: getNbPointsFromPosition(position),
                    disconnected,
                    trackId: track.id,
                    participationId,
                },
                (err) => {
                    setError(err);
                    setLoading(false);
                }
            );
        } else {
            setError("Ce circuit n'existe pas");
        }
    };

    return (
        <RaceForm
            onSubmit={onSubmit}
            error={error}
            loading={loading}
            closeForm={closeForm}
        />
    );
}

export default AddRaceForm;
