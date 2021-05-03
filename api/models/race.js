const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Race extends Model {}

    Race.init(
        {
            position: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { min: 1, max: 12 },
            },
            nbPoints: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { min: 1, max: 15 },
            },
            disconnected: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Race',
            timestamps: false,
        }
    );

    Race.associate = (db) => {
        Race.belongsTo(db.Participation);
        Race.belongsTo(db.Track);

        Race.addScope('defaultScope', {
            include: [{ model: db.Track, attributes: ['name'] }],
        });
    };

    return Race;
};
