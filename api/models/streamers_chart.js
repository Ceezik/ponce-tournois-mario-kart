const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Dashboard extends Model {}

    Dashboard.init(
        {},
        {
            sequelize,
            modelName: 'StreamersChart',
            timestamps: false,
        }
    );

    return Dashboard;
};
