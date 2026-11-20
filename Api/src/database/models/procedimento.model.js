const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

// CREATE TABLE procedimentos(
//     procedimento_id      SERIAL PRIMARY KEY,
//     procedimento_nome    VARCHAR(100) NOT NULL,
//     procedimento_desc    TEXT,
//     preco                NUMERIC(10,2) NOT NULL DEFAULT 0.00,
//     created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
// )




const Procedimento = sequelize.define(
    "Procedimento",
    {
        procedimento_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "procedimento_id"
        },
        procedimento_nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "procedimento_nome"
        },
        procedimento_desc: {
            type: DataTypes.TEXT,
            field: "procedimento_desc"
        },
        preco: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            field: "preco"
        }
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "procedimentos"
    }
);

Procedimento.associate = (models) => {
    Procedimento.hasMany(models.Consulta, {
        foreignKey: "procedimento_id",
    });
};

module.exports = Procedimento;



