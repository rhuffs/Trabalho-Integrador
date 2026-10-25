const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
// CREATE TABLE pacientes (
//     id               SERIAL PRIMARY KEY,
//     nome             VARCHAR(100) NOT NULL,
// 	data_nascimento  DATE NOT NULL,
// 	endereco 		 VARCHAR(150) NOT NULL,
// 	profissao 		 VARCHAR(50) ,
//     quem_indicou     VARCHAR(50),
//     cidade 			 VARCHAR (50) NOT NULL,
// 	uf				 VARCHAR(2) NOT NULL,
// 	cep 			 VARCHAR(8) NOT NULL,
// 	telefone         VARCHAR(10) NOT NULL,
// 	local_nascimento VARCHAR(20),
// 	sexo			 VARCHAR(15) NOT NULL,
// 	estado_civil     VARCHAR(20),
// 	email            VARCHAR(50) NOT NULL UNIQUE,
// 	mae_pai          VARCHAR(100),
// 	cpf 			 VARCHAR(14),
// 	rg 				 VARCHAR(20) NOT NULL UNIQUE,
// 	autorizacao      BOOLEAN NOT NULL DEFAULT TRUE,
// 	debito 			 FLOAT, 
//     created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
// );

const Paciente = sequelize.define(
    "Paciente",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id"
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "nome"
        },
        data_nascimento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: "data_nascimento"
        },
        endereco: {
            type: DataTypes.STRING(150),
            allowNull: false,
            field: "endereco"
        },
        profissao: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: "profissao"
        },
        quem_indicou: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: "quem_indicou"
        },
        cidade: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "cidade"
        },
        uf: {
            type: DataTypes.STRING(2),
            allowNull: false,
            field: "uf"
        },
        cep: {
            type: DataTypes.STRING(8),
            allowNull: false,
            field: "cep"
        },
        telefone: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: "telefone"
        },
        local_nascimento: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: "local_nascimento"
        },
        sexo: {
            type: DataTypes.STRING(15),
            allowNull: false,
            field: "sexo"
        },
        estado_civil: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: "estado_civil"
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            field: "email"
        },
        mae_pai: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: "mae_pai"
        },
        cpf: {
            type: DataTypes.STRING(14),
            allowNull: true,
            field: "cpf"
        },
        rg: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            field: "rg"
        },
        autorizacao: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "autorizacao"
        },
        debito: {
            type: DataTypes.FLOAT,
            allowNull: true,
            field: "debito"
        }
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "pacientes"
    }
);

module.exports = Paciente;



