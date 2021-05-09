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

        average.push(sum / nb);
    }

    return average;
};

export const getMaxItemsFromScreenClass = (screenClass) => {
    if (screenClass === 'xs' || screenClass === 'sm') return 10;
    if (screenClass === 'md') return 25;
    return 100;
};

export const createParticipationChart = ({
    participation,
    nbMaxRaces,
    ...props
}) => {
    const {
        datalabels: { align, ...datalabelsProps },
        ...rest
    } = props;

    return {
        datalabels: {
            formatter: (value, ctx) => {
                if (!participation.nbPoints) return value.y;
                return ctx.dataIndex === ctx.dataset.data.length - 1
                    ? value.y
                    : null;
            },
            align: participation.nbPoints ? 'right' : align,
            ...datalabelsProps,
        },
        data: participation.nbPoints
            ? Array(nbMaxRaces).fill(participation.nbPoints)
            : participation.Races.map(
                  ((s) => ({ nbPoints, disconnected }) =>
                      (s += disconnected ? 0 : nbPoints))(0)
              ),
        ...rest,
    };
};
