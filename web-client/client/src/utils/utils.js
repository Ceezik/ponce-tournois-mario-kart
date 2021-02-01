import moment from 'moment';
import _ from 'lodash';

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

export const getParticipationsWithNbPoints = (participations) => {
    participations.forEach((p) => (p.nbPoints = _.sumBy(p.Races, 'nbPoints')));
    return participations.filter((p) => p.nbPoints > 0);
};

export const getRecord = (participations) => {
    return _.maxBy(participations, 'nbPoints');
};

export const getWorst = (participations) => {
    return _.minBy(participations, 'nbPoints');
};

export const getAverage = (participations) => {
    const p = participations.map((p) => p.Races.map((r) => r.nbPoints));
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

        average.push(sum / nb);
    }

    return average;
};

export const getMaxItemsFromScreenClass = (screenClass) => {
    if (screenClass === 'xs' || screenClass === 'sm') return 10;
    if (screenClass === 'md') return 25;
    return 100;
};
