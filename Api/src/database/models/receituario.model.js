const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

// CREATE TABLE receituario(
//     receita_id SERIAL PRIMARY KEY,
//     receita_data_inicio  DATE,
//     receita_data_fim DATE,
//     receita_descricao TEXT,
//     remedio_id  REFERENCES remedio(remedio_id),
//     consulta_id INTEGER NOT NULL REFERENCES consulta(consulta_id)
// );


const Receituario = sequelize.define(
    "Receituario",
    {
        receita_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "receita_id"
        },
        receita_data_inicio: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: "receita_data_inicio"
        },
        receita_data_fim: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: "receita_data_fim"
        },
        receita_descricao : {
            type: DataTypes.TEXT,
            allowNull : false,
            field : "receita_descricao"
        },
        remedio_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            field : "remedio_id"
        },
        consulta_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            field : "consulta_id"
        }
    },
    {
        timestamps: false,
        tableName: "receituario"
    }
);

Receituario.associate = (models) => {
    Receituario.belongsTo(models.Remedio, {
        foreignKey: "remedio_id"
    });

    Receituario.belongsTo(models.Consulta, {
        foreignKey: "consulta_id"
    });
};

module.exports = Receituario;


