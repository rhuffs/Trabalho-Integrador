const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Horario = sequelize.define(
    "Horario",
    {
        profissional_login: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        horario_data: { 
            type: DataTypes.DATEONLY,
            primaryKey: true,
            allowNull: false,
        },
        horario_hora:{
            type: DataTypes.TIME,
            primaryKey: true,
            allowNull: false,
        },
        horario_consulta: {
            type: DataTypes.INTEGER,
        },
        horario_compromisso: {
            type: DataTypes.STRING,
        },
    },
    {
			sequelize,
			tableName: "horario",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
	},
);

Horario.associate = (models) => {
    Horario.belongsTo(models.Consulta, {
        foreignKey: "horario_consulta",
    });
    Horario.belongsTo(models.Profissional, {
        foreignKey: "profissional_login",
    });
};

module.exports = Horario;



