const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Consulta = sequelize.define(
    "Consulta",
    {
        consulta_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        consulta_desc: {
            type: DataTypes.STRING,
        },
        consulta_valor: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        financeiro_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        consulta_alt_odonto: {
            type: DataTypes.STRING,
        },
        consulta_att_paciente: {
            type: DataTypes.STRING,
        },
        procedimento_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paciente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
			sequelize,
			tableName: "consulta",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
	},
);

Consulta.associate = (models) => {
    Consulta.belongsToMany(models.AnamneseItem, {
		through: models.ConsultaAnamnese,
		foreignKey: "consulta_id",
		otherKey: "anamnese_id",
	});
    Consulta.hasOne(models.Financeiro, {
        foreignKey: "financeiro_id",
    });
    Consulta.hasOne(models.Horario, {
        foreignKey: "horario_inicio",
        as: "HorarioInicio",
    });
    Consulta.hasOne(models.Horario, {
        foreignKey: "horario_fim",
        as: "HorarioFim",
    });
    Consulta.belongsTo(models.Paciente, {
        foreignKey: "paciente_id",
    });
};

module.exports = Consulta;



