import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useSocket } from '../../../utils/useSocket';
import { getNbPointsFromPosition } from '../../../utils/utils';
import RaceForm from './RaceForm';

function EditRaceForm({ closeForm, race }) {
    const { tracks } = useSelector((state) => state.tracks);
    const { socket } = useSocket();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('closeEditRaceForm', () => closeForm());

        return () => socket.off('closeEditRaceForm');
    }, []);

    const onSubmit = ({ position, trackName }) => {
        const track = _.find(tracks, ['name', trackName]);

        if (track) {
            setLoading(true);

            socket.emit(
                'editRace',
                {
                    position: parseInt(position),
                    nbPoints: getNbPointsFromPosition(position),
                    trackId: track.id,
                    raceId: race.id,
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
            race={race}
        />
    );
}

export default EditRaceForm;
