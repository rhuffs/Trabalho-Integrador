const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const AnamneseItem = sequelize.define(
    "AnamneseItem",
    {
        anamnese_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        anamnese_nome: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
			sequelize,
			tableName: "anamnese_item",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
	},
);

AnamneseItem.associate = (models) => {
    AnamneseItem.belongsToMany(models.Consulta, {
        through: models.ConsultaAnamnese,
        foreignKey: "anamnese_id",
        otherKey: "consulta_id",
    });
};

module.exports = AnamneseItem;



