const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

// timestamps: false -> o Sequelize não lê nem grava createdAt/updatedAt
// field mapeia o atributo camelCase para a coluna snake_case
const Profissional = sequelize.define(
    "Profissional",
		{
			profissional_login: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			nome: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			senha: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			telefone: {
				type: DataTypes.STRING,
			},
			tipo_profissional: {
				type: DataTypes.ENUM('Dentista','Secretario'),
				allowNull: false,
			}
		},
		{
			sequelize,
			tableName: "profissional",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
);

Profissional.associate = (models) => {
    Profissional.belongsToMany(models.Permissao, {
			through: models.ProfissionalPermissao,
			foreignKey: "profissional_login",
			otherKey: "id_permissao",
		});
	Profissional.hasMany(models.Horario, {
		foreignKey: "profissional_login",
	})
};

module.exports = Profissional;
