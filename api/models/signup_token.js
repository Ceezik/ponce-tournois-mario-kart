const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SignupToken extends Model {}

    SignupToken.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            twitchId: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'SignupToken',
            timestamps: false,
        }
    );

    return SignupToken;
};
