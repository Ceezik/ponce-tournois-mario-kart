const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PatchNote extends Model {
        static versionIsUnique(version, id = null) {
            return this.findOne({ where: { version } })
                .then((pn) => (pn ? pn.id === id : true))
                .catch((err) => false);
        }
    }

    PatchNote.init(
        {
            version: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: { len: [3, 100] },
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'PatchNote',
            updatedAt: false,
        }
    );

    return PatchNote;
};
