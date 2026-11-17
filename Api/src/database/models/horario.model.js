const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Horario = sequelize.define(
    "Horario",
    {
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
        horario_inicio: {
            type: DataTypes.INTEGER,
        },
        horario_fim: {
            type: DataTypes.INTEGER,
        },
        horario_ocupado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
        foreignKey: "horario_inicio",
        as: "HorarioInicio",
    });
    Horario.belongsTo(models.Consulta, {
        foreignKey: "horario_fim",
        as: "HorarioFim",
    });
};

module.exports = Horario;



