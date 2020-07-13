const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Podium extends Model {}

    Podium.init(
        {
            position: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { min: 1, max: 3 },
            },
            player: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Podium',
            timestamps: false,
        }
    );

    Podium.associate = (db) => {
        Podium.belongsTo(db.Tournament);
    };

    return Podium;
};
