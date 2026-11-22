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
    Consulta.belongsToMany(models.Profissional, {
		through: models.ProfissionalConsulta,
		foreignKey: "consulta_id",
		otherKey: "profissional_login",
	});
    Consulta.hasOne(models.Financeiro, {
        foreignKey: "financeiro_id",
    });
    Consulta.hasMany(models.Horario, {
        foreignKey: "horario_consulta",
    });
    Consulta.belongsTo(models.Paciente, {
        foreignKey: "paciente_id",
    });
    Consulta.belongsTo(models.Procedimento, {
        foreignKey: "procedimento_id",
    })
};

module.exports = Consulta;



