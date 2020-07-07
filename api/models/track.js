const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Track extends Model {
        static nameIsUnique(name) {
            return this.findOne({ where: { name } })
                .then((c) => (c ? false : true))
                .catch((err) => false);
        }
    }

    Track.init(
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
            modelName: 'Track',
            timestamps: false,
        }
    );

    Track.associate = (db) => {
        Track.belongsTo(db.Cup);
        Track.hasMany(db.Race);
    };

    return Track;
};
