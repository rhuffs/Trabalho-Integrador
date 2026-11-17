const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const Paciente = require("./paciente.model");

// CREATE TABLE financeiro (
//     financeiro_id SERIAL PRIMARY KEY,
//     paciente_id INTEGER NOT NULL REFERENCES pacientes(id),
//     financeiro_devendo NUMERIC(10,2) NOT NULL DEFAULT 0,
//     financeiro_pago NUMERIC(10,2) NOT NULL DEFAULT 0,
//     financeiro_saldo NUMERIC(10,2) NOT NULL DEFAULT 0,
//     data_movimentacao TIMESTAMPTZ NOT NULL DEFAULT NOW()
// );

const Financeiro = sequelize.define(
    "Financeiro",
    {
        financeiro_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "financeiro_id"
        },

        paciente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "pacientes",
                key: "id"
            },
            field: "paciente_id"
        },

        financeiro_devendo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
            field: "financeiro_devendo"
        },

        financeiro_pago: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
            field: "financeiro_pago"
        },

        financeiro_saldo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
            field: "financeiro_saldo"
        },

        data_movimentacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "data_movimentacao"
        }
    },
    {
        tableName: "financeiro",
        timestamps: false
    }
);

module.exports = Financeiro;