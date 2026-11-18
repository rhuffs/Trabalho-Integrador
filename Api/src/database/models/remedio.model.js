const { DataTypes } = require("sequelize");
const sequelize = require("../connection");



// CREATE TABLE remedio(
//     remedio_id SERIAL PRIMARY KEY,
//     remedio_nome VARCHAR(255) NOT NULL,
//     remedio_desc TEXT
// );

const Remedio = sequelize.define(
    "Remedio",
    {
        remedio_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "remedio_id"
        },
        remedio_nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "remedio_nome"
        },
        remedio_desc: {
            type: DataTypes.TEXT,
            field: "remedio_desc"
        }
    },
    {
        timestamps: false,
        tableName: "remedio"
    }
);

module.exports = Remedio;


