const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cup extends Model {
        static nameIsUnique(name) {
            return this.findOne({ where: { name } })
                .then((c) => (c ? false : true))
                .catch((err) => false);
        }
    }

    Cup.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: { len: [3, 50] },
            },
        },
        {
            sequelize,
            modelName: 'Cup',
            timestamps: false,
        }
    );

    Cup.associate = (db) => {
        Cup.hasMany(db.Track);
    };

    return Cup;
};
