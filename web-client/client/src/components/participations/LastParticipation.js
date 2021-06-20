import { useState, useEffect } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-grid-system';
import ParticipationSkeleton from '../participations/ParticipationSkeleton';
import TournamentInfos from '../tournaments/TournamentInfos';
import Participation from '../participations/Participation';
import Podium from '../podiums/Podium';
import {
    getRecord,
    getWorst,
    getAverage,
    canUserManage,
} from '../../utils/utils';
import useComparisons from '../../hooks/useComparisons';

function LastParticipation({ route, userId, parentLoading }) {
    const { socket } = useSelector((state) => state.socket);
    const { user } = useSelector((state) => state.auth);
    const { ponce } = useSelector((state) => state.ponce);
    const [participation, setParticipation] = useState(null);
    const [record, setRecord] = useState(null);
    const [worst, setWorst] = useState(null);
    const [average, setAverage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        comparisons,
        onAddComparison,
        onRemoveComparison,
        setComparisons,
        loading: loadingComparisons,
    } = useComparisons({
        tournament: participation?.TournamentId,
        excludedParticipations: participation ? [participation] : undefined,
    });

    const canManage = canUserManage(user, userId || ponce?.id);

    socket.off('editParticipation').on('editParticipation', (p) => {
        if (participation && p.id === participation.id)
            setParticipation({ ...participation, ...p });
    });

    socket.off('addRace').on('addRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            const newParticipation = _.cloneDeep(participation);
            newParticipation.Races.push(race);
            setParticipation(newParticipation);
        } else {
            const idx = comparisons.findIndex(
                (c) => c.id === race.ParticipationId
            );
            if (idx !== -1) {
                const newComparison = _.cloneDeep(comparisons[idx]);
                newComparison.Races.push(race);
                const newComparisons = _.cloneDeep(comparisons);
                newComparisons.splice(idx, 1, newComparison);
                setComparisons(newComparisons);
            }
        }
    });

    socket.off('editRace').on('editRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            const index = _.findIndex(participation.Races, { id: race.id });
            const newParticipation = _.cloneDeep(participation);

            newParticipation.Races.splice(index, 1, race);
            setParticipation(newParticipation);
        } else {
            const idx = comparisons.findIndex(
                (c) => c.id === race.ParticipationId
            );
            if (idx !== -1) {
                const newComparison = _.cloneDeep(comparisons[idx]);
                const raceIdx = _.findIndex(newComparison.Races, {
                    id: race.id,
                });
                if (raceIdx !== -1) {
                    newComparison.Races.splice(raceIdx, 1, race);
                    const newComparisons = _.cloneDeep(comparisons);
                    newComparisons.splice(idx, 1, newComparison);
                    setComparisons(newComparisons);
                }
            }
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

    const fetchParticipation = () => {
        socket.emit(route, userId, (err) => {
            setError(err);
            setLoading(false);
        });
    };

    return loading || parentLoading ? (
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
                    canManage={!!user?.isAdmin}
                />
                <Participation
                    participation={participation}
                    record={record}
                    worst={worst}
                    average={average}
                    tournamentName={participation.Tournament.name}
                    nbMaxRaces={participation.Tournament.nbMaxRaces}
                    canManage={canManage}
                    comparisons={comparisons}
                    onAddComparison={onAddComparison}
                    onRemoveComparison={onRemoveComparison}
                    loadingComparisons={loadingComparisons}
                />
            </Col>
        </Row>
    );
}

export default LastParticipation;
