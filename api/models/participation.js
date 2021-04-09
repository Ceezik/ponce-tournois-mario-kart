const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Participation extends Model {}

    Participation.init(
        {
            goal: {
                type: DataTypes.NUMBER,
            },
            nbPoints: {
                type: DataTypes.NUMBER,
            },
        },
        {
            sequelize,
            modelName: 'Participation',
            timestamps: false,
            indexes: [{ unique: true, fields: ['TournamentId', 'UserId'] }],
        }
    );

    Participation.associate = (db) => {
        Participation.belongsTo(db.User);
        Participation.belongsTo(db.Tournament);
        Participation.hasMany(db.Race);

        Participation.addScope('defaultScope', {
            include: [{ model: db.Race }],
        });
        Participation.addScope('withoutRaces', {});
    };

    return Participation;
};
