import { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import Participation from '../../participations/Participation';
import ParticipationSkeleton from './ParticipationSkeleton';
import {
    addRaceToParticipation,
    editRaceFromParticipation,
} from '../../../utils/utils';

function PonceParticipation({ tournament }) {
    const { socket } = useSelector((state) => state.socket);
    const { ponce } = useSelector((state) => state.ponce);
    const [participation, setParticipation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    socket.off('editParticipation').on('editParticipation', (p) => {
        if (participation && p.id === participation.id)
            setParticipation({ ...participation, ...p });
    });

    socket.off('addRace').on('addRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            setParticipation(addRaceToParticipation({ race, participation }));
        }
    });

    socket.off('editRace').on('editRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            setParticipation(
                editRaceFromParticipation({ race, participation })
            );
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
            user={ponce}
            participation={participation}
            tournamentName={tournament.name}
            nbMaxRaces={tournament.nbMaxRaces}
        />
    );
}

export default PonceParticipation;
