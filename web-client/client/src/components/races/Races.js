import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-grid-system';
import _ from 'lodash';
import { getAll } from '../../services/cups';
import RacesListItem from './RacesListItem';
import RacesSkeleton from './RacesSkeleton';

function Races({ route, userId }) {
    const { tracks } = useSelector((state) => state.tracks);
    const { socket } = useSelector((state) => state.socket);
    const [races, setRaces] = useState([]);
    const [cups, setCups] = useState([]);
    const [loadingRaces, setLoadingRaces] = useState(true);
    const [loadingCups, setLoadingCups] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on(route, (races) => {
            setRaces(races);
            setLoadingRaces(false);
        });

        socket.emit(route, userId, (err) => {
            setError(err);
            setLoadingRaces(false);
        });

        getAll()
            .then((res) => setCups(res.data))
            .catch(() => setError('Impossible de récupérer les coupes'))
            .finally(() => setLoadingCups(false));

        return () => socket.off(route);
    }, []);

    useEffect(() => {
        if (!loadingRaces && !loadingCups) {
            const newTracks = _.cloneDeep(tracks);
            const newCups = _.cloneDeep(cups);

            newCups.forEach((cup) => (cup.Tracks = []));

            newTracks.forEach((track) => {
                const cup = _.find(newCups, { id: track.CupId });
                track.statistics = {
                    nbPlayed: 0,
                    nbPoints: 0,
                    position: 0,
                };
                cup.Tracks.push(track);
            });

            races.forEach((race) => {
                const cup = _.find(newCups, { id: race.Track.CupId });
                const track = _.find(cup.Tracks, { id: race.TrackId });
                track.statistics.nbPlayed++;
                track.statistics.nbPoints += race.nbPoints;
                track.statistics.position += race.position;
            });
            setCups(newCups);
            setLoading(false);
        }
    }, [loadingCups, loadingRaces]);

    return (
        <Container className="app__container">
            {loading ? (
                <RacesSkeleton />
            ) : error ? (
                <Row justify="center">
                    <Col xs="content">
                        <div className="formMessage formMessage__error">
                            {error}
                        </div>
                    </Col>
                </Row>
            ) : (
                <Row justify="center">
                    <Col xs={12} lg={8} className="races__wrapper">
                        {cups.map((cup) => (
                            <RacesListItem key={cup.id} cup={cup} />
                        ))}
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Races;
