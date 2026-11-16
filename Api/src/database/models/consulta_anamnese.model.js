const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const ConsultaAnamnese = sequelize.define(
    "ConsultaAnamnese",
    {
        anamnese_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
        },
        consulta_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        }
    },
    {
			sequelize,
			tableName: "consulta_anamnese",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
	},
);

ConsultaAnamnese.associate = (models) => {
        ConsultaAnamnese.belongsTo(models.AnamneseItem, {
            foreignKey: "anamnese_id",
            targetKey: "anamnese_id",
            as: "Itens",
        });
        ConsultaAnamnese.belongsTo(models.Consulta, {
            foreignKey: "consulta_id",
            targetKey: "consulta_id",
        });
}

module.exports = ConsultaAnamnese;



