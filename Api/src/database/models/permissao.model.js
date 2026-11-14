const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Permissao = sequelize.define(
    "Permissao",
    {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
		},
		descricao: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "permissao",
		schema: "public",
		freezeTableName: true,
		timestamps: false,
	},
);

Permissao.associate = (models) => {
    Permissao.belongsToMany(models.Profissional, {
		through: models.ProfissionalPermissao,
		foreignKey: "id_permissao",
		otherKey: "profissional_login",
	});
};

module.exports = Permissao;
