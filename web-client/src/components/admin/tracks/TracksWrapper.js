import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import { getByCup } from '../../../services/tracks';
import TracksListItem from './TracksListItem';
import AddTrackBtn from './AddTrackBtn';
import TracksSkeleton from './TracksSkeleton';
import AddTrackForm from './AddTrackForm';

function TracksWrapper({ cup }) {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        setCreating(false);
        setLoading(true);

        getByCup(cup.id)
            .then((res) => setTracks(res.data))
            .catch(() => setError('Impossible de récupérer les circuits.'))
            .finally(() => setLoading(false));
    }, [cup]);

    const addTrack = (track) => {
        setTracks([...tracks, track]);
    };

    return loading ? (
        <TracksSkeleton />
    ) : error ? (
        <Row justify="center">
            <Col xs="content">
                <div className="formMessage formMessage__error">{error}</div>
            </Col>
        </Row>
    ) : creating ? (
        <Row justify="center">
            <Col xs={12} md={8} lg={6}>
                <h1>Ajouter une circuit</h1>
                <AddTrackForm
                    setCreating={setCreating}
                    cupId={cup.id}
                    addTrack={addTrack}
                />
            </Col>
        </Row>
    ) : (
        <>
            <h1>Circuits de la coupe {cup.name}</h1>

            <Row>
                {tracks.map((track) => (
                    <TracksListItem key={track.id} track={track} />
                ))}

                {tracks.length < 4 &&
                    [...Array(4 - tracks.length)].map((i, index) => (
                        <AddTrackBtn key={index} setCreating={setCreating} />
                    ))}
            </Row>
        </>
    );
}

export default TracksWrapper;
