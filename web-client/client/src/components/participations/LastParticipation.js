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
    addRaceToComparisons,
    editRaceFromComparisons,
    addRaceToParticipation,
    editRaceFromParticipation,
} from '../../utils/utils';
import useComparisons from '../../hooks/useComparisons';
import useStreamersChart from '../../hooks/useStreamersChart';

function LastParticipation({ route, user, parentLoading }) {
    const { socket } = useSelector((state) => state.socket);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [participation, setParticipation] = useState(null);
    const [record, setRecord] = useState(null);
    const [worst, setWorst] = useState(null);
    const [average, setAverage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { comparisons, setComparisons } = useComparisons({
        tournament: participation?.TournamentId,
        excludedParticipations: participation ? [participation] : undefined,
    });

    const { streamersComparisons, setStreamersComparisons } = useStreamersChart(
        {
            tournament: participation?.TournamentId,
            excludedParticipations: participation ? [participation] : undefined,
        }
    );

    const canManage = canUserManage(currentUser, user?.id);

    socket.off('editParticipation').on('editParticipation', (p) => {
        if (participation && p.id === participation.id)
            setParticipation({ ...participation, ...p });
    });

    socket.off('addRace').on('addRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            setParticipation(addRaceToParticipation({ race, participation }));
        }

        const comparisonsAdd = addRaceToComparisons({ race, comparisons });
        if (comparisonsAdd.shouldUpdate)
            setComparisons(comparisonsAdd.comparisons);

        const streamersAdd = addRaceToComparisons({
            race,
            comparisons: streamersComparisons,
        });
        if (streamersAdd.shouldUpdate)
            setStreamersComparisons(streamersAdd.comparisons);
    });

    socket.off('editRace').on('editRace', (race) => {
        if (participation && race.ParticipationId === participation.id) {
            setParticipation(
                editRaceFromParticipation({ race, participation })
            );
        }

        const comparisonsEdit = editRaceFromComparisons({
            race,
            comparisons,
        });
        if (comparisonsEdit.shouldUpdate)
            setComparisons(comparisonsEdit.comparisons);

        const streamersEdit = editRaceFromComparisons({
            race,
            comparisons: streamersComparisons,
        });
        if (streamersEdit.shouldUpdate)
            setStreamersComparisons(streamersEdit.comparisons);
    });

    socket.off(route).on(route, (p) => {
        const [participation, ...participations] = p;
        const r = getRecord(participations);
        const w = getWorst(participations);

        if (r?.id !== w?.id || !w) setWorst(w);
        setAverage(
            getAverage(participations, participation.Tournament.nbMaxRaces)
        );
        setRecord(r);
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
    }, [route, user?.id]);

    const fetchParticipation = () => {
        socket.emit(route, user?.id, (err) => {
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
            <Col xs={12} lg={10} xxl={8}>
                <TournamentInfos defaultTournament={participation.Tournament} />
                <Podium
                    tournamentId={participation.Tournament.id}
                    canManage={!!currentUser?.isAdmin}
                />
                <Participation
                    user={user}
                    participation={participation}
                    record={record}
                    worst={worst}
                    average={average}
                    tournamentName={participation.Tournament.name}
                    nbMaxRaces={participation.Tournament.nbMaxRaces}
                    canManage={canManage}
                />
            </Col>
        </Row>
    );
}

export default LastParticipation;
