import moment from 'moment';

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
