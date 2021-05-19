const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ManagersEditors extends Model {}

    ManagersEditors.init(
        {},
        {
            sequelize,
            timestamps: false,
        }
    );

    return ManagersEditors;
};
