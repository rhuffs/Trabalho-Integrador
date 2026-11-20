const { Sequelize } = require("sequelize");

// new Sequelize(banco, usuario, senha, opcoes)
const sequelize = new Sequelize("consultorio", "postgres", "123", {
    host: "192.168.0.34", // trocar para localhost entre commits
    port: 5432,
    dialect: "postgres",
    logging: false, // troque para console.log para ver o SQL gerado pelo ORM
});

module.exports = sequelize;
