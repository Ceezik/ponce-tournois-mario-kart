import React, { createContext, useContext, useState, useEffect } from 'react';
import _ from 'lodash';
import { getAll } from '../services/tracks';

const TracksContext = createContext();

export const TracksProvider = ({ children }) => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAll()
            .then((res) => setTracks(res.data))
            .catch(() => setError('Impossible de récupérer les circuits'))
            .finally(() => setLoading(false));
    }, []);

    const getSortedTracks = () => {
        return _.sortBy(tracks, (t) => t.name.toLowerCase());
    };

    const getByCup = (cupId) => {
        return tracks.filter((track) => track.CupId === cupId);
    };

    const addNewTrack = (track) => {
        setTracks([...tracks, track]);
    };

    return (
        <TracksContext.Provider
            value={{
                tracks,
                loading,
                error,
                getSortedTracks,
                getByCup,
                addNewTrack,
            }}
        >
            {children}
        </TracksContext.Provider>
    );
};

export const useTracks = () => useContext(TracksContext);
