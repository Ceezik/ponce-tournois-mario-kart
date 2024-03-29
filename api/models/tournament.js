const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tournament extends Model {
        static nameIsUnique(name, id = null) {
            return this.findOne({ where: { name } })
                .then((c) => (c ? c.id === id : true))
                .catch((err) => false);
        }
    }

    Tournament.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: { len: [3, 50] },
            },
            nbParticipants: {
                type: DataTypes.INTEGER,
                validate: { min: 1 },
            },
            nbMaxRaces: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { min: 1 },
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Tournament',
            timestamps: false,
        }
    );

    Tournament.associate = (db) => {
        Tournament.hasMany(db.Participation);
        Tournament.hasMany(db.Podium);
        Tournament.belongsToMany(db.User, {
            through: db.StreamersChart,
            as: 'Streamers',
            foreignKey: 'TournamentId',
        });
    };

    Tournament.afterCreate((tournament) => {
        sequelize.models.User.findAll({ attributes: ['id'] })
            .then((users) => {
                const participations = users.map((user) => ({
                    TournamentId: tournament.id,
                    UserId: user.id,
                }));

                sequelize.models.Participation.bulkCreate(participations);
            })
            .catch(() => {});
    });

    return Tournament;
};
