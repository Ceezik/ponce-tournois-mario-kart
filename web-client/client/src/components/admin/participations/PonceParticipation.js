import { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import Participation from '../../participations/Participation';
import ParticipationSkeleton from './ParticipationSkeleton';

function PonceParticipation({ tournament }) {
    const { socket } = useSelector((state) => state.socket);
    const [participation, setParticipation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    socket.off('editParticipation').on('editParticipation', (p) => {
        if (participation && p.id === participation.id)
            setParticipation({ ...participation, ...p });
    });

    socket.off('addRace').on('addRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            const newParticipation = _.cloneDeep(participation);
            newParticipation.Races.push(race);
            setParticipation(newParticipation);
        }
    });

    socket.off('editRace').on('editRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            const index = _.findIndex(participation.Races, { id: race.id });
            const newParticipation = _.cloneDeep(participation);

            newParticipation.Races.splice(index, 1, race);
            setParticipation(newParticipation);
        }
    });

    useEffect(() => {
        socket.on('getPonceParticipation', (participation) => {
            setParticipation(participation);
            setLoading(false);
        });

        socket.emit('getPonceParticipation', tournament.id, (err) => {
            setError(err);
            setLoading(false);
        });

        return () => {
            socket.off('getPonceParticipation');
            socket.off('editParticipation');
            socket.off('addRace');
            socket.off('editRace');
        };
    }, []);

    return loading ? (
        <ParticipationSkeleton showPodium={false} />
    ) : error ? (
        <Row justify="center">
            <Col xs="content">
                <div className="formMessage formMessage__error">{error}</div>
            </Col>
        </Row>
    ) : (
        <Participation
            participation={participation}
            tournamentName={tournament.name}
            nbMaxRaces={tournament.nbMaxRaces}
        />
    );
}

export default PonceParticipation;
