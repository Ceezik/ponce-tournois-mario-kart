const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static usernameIsUnique(username) {
            return this.findOne({ where: { username } })
                .then((u) => (u ? false : true))
                .catch((err) => false);
        }
    }

    User.init(
        {
            username: {
                type: DataTypes.STRING,
                unique: true,
            },
            twitchId: {
                type: DataTypes.STRING,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'User',
            timestamps: true,
            updatedAt: false,
        }
    );

    return User;
};
