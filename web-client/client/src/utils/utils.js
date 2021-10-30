import moment from 'moment';
import _ from 'lodash';
import { COMPARISONS_COLORS } from './style';

export const nullifyEmptyFields = (data) => {
    Object.keys(data).forEach((key) => {
        if (data[key] === '') {
            data[key] = null;
        }
    });

    return data;
};

export const serializeTournament = (tournament) => {
    if (tournament.startDate)
        tournament.startDate = moment(tournament.startDate).utc().format();
    if (tournament.endDate)
        tournament.endDate = moment(tournament.endDate).utc().format();
    if (tournament.nbMaxRaces && !isNaN(tournament.nbMaxRaces))
        tournament.nbMaxRaces = +tournament.nbMaxRaces;

    return tournament;
};

export const getNbPointsFromPosition = (position) => {
    position = parseInt(position);
    if (position === 1) return 15;
    else if (position === 2) return 12;
    else return 13 - position;
};

export const getPositionColor = (position) => {
    return position === 1 ? 'gold' : position === 2 ? '#CBCDCD' : '#cd7f32';
};

export const getParticipationNbPoints = (participation) => {
    if (participation.nbPoints) return participation.nbPoints;
    const races = participation.Races.filter((r) => !r.disconnected);
    return _.sumBy(races, 'nbPoints');
};

export const getParticipationsWithNbPoints = (participations) => {
    const participationsWithNbPoints = participations.map((p) => {
        return { ...p, nbPoints: getParticipationNbPoints(p) };
    });
    return participationsWithNbPoints.filter((p) => p.nbPoints > 0);
};

export const getRecord = (participations) => {
    const participationsWithNbPoints = getParticipationsWithNbPoints(
        participations
    );
    const id = _.maxBy(participationsWithNbPoints, 'nbPoints')?.id;
    return participations.find((p) => p.id === id);
};

export const getWorst = (participations) => {
    const participationsWithNbPoints = getParticipationsWithNbPoints(
        participations
    );
    const id = _.minBy(participationsWithNbPoints, 'nbPoints')?.id;
    return participations.find((p) => p.id === id);
};

export const getAverage = (participations) => {
    const participationsWithNbPoints = getParticipationsWithNbPoints(
        participations.filter((p) => !p.nbPoints)
    );

    const p = participationsWithNbPoints.map((p) =>
        p.Races.map(({ nbPoints, disconnected }) =>
            disconnected ? 0 : nbPoints
        )
    );
    if (!p.length) return null;

    const maxLength = _.maxBy(p, (el) => el.length).length;
    const average = [];

    for (let i = 0; i < maxLength; i++) {
        let nb = 0;
        let sum = 0;

        p.forEach((participation) => {
            const val = participation[i] || 0;
            sum += val;
            nb++;
        });

        average.push(Math.round(sum / nb));
    }

    return average;
};

export const getMaxItemsFromScreenClass = (screenClass) => {
    if (screenClass === 'xs' || screenClass === 'sm') return 10;
    if (screenClass === 'md') return 25;
    return 100;
};

export const formatParticipationToChartData = (participation, nbMaxRaces) => {
    return participation.nbPoints
        ? Array(nbMaxRaces).fill(participation.nbPoints)
        : participation.Races.map(
              ((s) => ({ nbPoints, disconnected }) =>
                  (s += disconnected ? 0 : nbPoints))(0)
          );
};

export const canUserManage = (user, to) => {
    if (!user) return false;
    if (user.isAdmin) return true;
    if (user.id === to) return true;
    return !!user.Managers.find((m) => m.id === to);
};

export const generateColor = () => {
    function c() {
        var hex = Math.floor(Math.random() * 256).toString(16);
        return ('0' + String(hex)).substr(-2);
    }
    return '#' + c() + c() + c();
};

export const getComparisonColor = (alreadyUsedColors) =>
    COMPARISONS_COLORS.find((c) => !alreadyUsedColors.includes(c)) ??
    generateColor();

export const isComparisonUnique = (comparison, comparisons) =>
    !comparisons.some((c) => c.id === comparison.id);

export const addRaceToParticipation = ({ race, participation }) => {
    const newParticipation = _.cloneDeep(participation);
    newParticipation.Races.push(race);
    return newParticipation;
};

export const editRaceFromParticipation = ({ race, participation }) => {
    const idx = _.findIndex(participation.Races, { id: race.id });
    if (idx === -1) return participation;

    const newParticipation = _.cloneDeep(participation);
    newParticipation.Races.splice(idx, 1, race);
    return newParticipation;
};

export const addRaceToComparisons = ({ race, comparisons }) => {
    const idx = comparisons.findIndex((c) => c.id === race.ParticipationId);
    if (idx === -1) return { shouldUpdate: false };

    const newComparison = _.cloneDeep(comparisons[idx]);
    newComparison.Races.push(race);
    const newComparisons = _.cloneDeep(comparisons);
    newComparisons.splice(idx, 1, newComparison);
    return { shouldUpdate: true, comparisons: newComparisons };
};

export const editRaceFromComparisons = ({ race, comparisons }) => {
    const idx = comparisons.findIndex((c) => c.id === race.ParticipationId);
    if (idx === -1) return { shouldUpdate: false };

    const newComparison = _.cloneDeep(comparisons[idx]);
    const raceIdx = _.findIndex(newComparison.Races, {
        id: race.id,
    });
    if (raceIdx === -1) return { shouldUpdate: false };

    newComparison.Races.splice(raceIdx, 1, race);
    const newComparisons = _.cloneDeep(comparisons);
    newComparisons.splice(idx, 1, newComparison);
    return { shouldUpdate: true, comparisons: newComparisons };
};
