const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const ProfissionalConsulta = sequelize.define(
    "ProfissionalConsulta",
    {
        consulta_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        profissional_login: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
			sequelize,
			tableName: "profissional_consulta",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
	},
);

ProfissionalConsulta.associate = (models) => {
    ProfissionalConsulta.belongsTo(models.Profissional, {
		foreignKey: "profissional_login",
		targetKey: "profissional_login",
	});
	ProfissionalConsulta.belongsTo(models.Consulta, {
		foreignKey: "consulta_id",
		targetKey: "consulta_id",
	});
};

module.exports = ProfissionalConsulta;



