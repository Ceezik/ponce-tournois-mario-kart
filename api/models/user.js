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
                allowNull: false,
                validate: { len: [3, 50] },
            },
            twitchId: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
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
