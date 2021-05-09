import { useState, useEffect } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-grid-system';
import ParticipationSkeleton from '../participations/ParticipationSkeleton';
import TournamentInfos from '../tournaments/TournamentInfos';
import Participation from '../participations/Participation';
import Podium from '../podiums/Podium';
import { getRecord, getWorst, getAverage } from '../../utils/utils';

function LastParticipation({ route, userId }) {
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.auth);
    const [participation, setParticipation] = useState(null);
    const [record, setRecord] = useState(null);
    const [worst, setWorst] = useState(null);
    const [average, setAverage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const canAdd = user ? user.id === userId || user.isAdmin : false;

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

    socket.off(route).on(route, (p) => {
        const [participation, ...participations] = p;
        const record = getRecord(participations);
        const worst = getWorst(participations);

        if (record?.id !== worst?.id) setWorst(worst);
        setAverage(
            getAverage(participations, participation.Tournament.nbMaxRaces)
        );
        setRecord(record);
        setParticipation(participation);
        setLoading(false);
    });

    useEffect(() => {
        socket.on('createTournament', fetchParticipation);

        return () => {
            socket.off(route);
            socket.off('editParticipation');
            socket.off('addRace');
            socket.off('editRace');
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchParticipation();
    }, [route, userId]);

    useEffect(() => {}, [participation]);

    const fetchParticipation = () => {
        socket.emit(route, userId, (err) => {
            setError(err);
            setLoading(false);
        });
    };

    return loading ? (
        <ParticipationSkeleton showButton={false} />
    ) : error ? (
        <Row justify="center">
            <Col xs="content">
                <div className="formMessage formMessage__error">{error}</div>
            </Col>
        </Row>
    ) : (
        <Row justify="center">
            <Col xs={12} lg={8}>
                <TournamentInfos defaultTournament={participation.Tournament} />
                <Podium
                    tournamentId={participation.Tournament.id}
                    canAdd={canAdd}
                />
                <Participation
                    participation={participation}
                    record={record}
                    worst={worst}
                    average={average}
                    tournamentName={participation.Tournament.name}
                    nbMaxRaces={participation.Tournament.nbMaxRaces}
                    canAdd={canAdd}
                />
            </Col>
        </Row>
    );
}

export default LastParticipation;
