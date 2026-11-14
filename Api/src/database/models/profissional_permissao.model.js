const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const ProfissionalPermissao = sequelize.define(
    "ProfissionalPermissao",
    {
		profissional_login: {
			type: DataTypes.STRING,
			primaryKey: true,
			references: {
				model: "profissional",
				key: "profissional_login",
			},
		},
		id_permissao: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			references: {
				model: "permissoes",
				key: "id",
			},
		},
    },
    {
		sequelize,
		tableName: "profissional_permissao",
		schema: "public",
		freezeTableName: true,
		timestamps: false,
	},
);

ProfissionalPermissao.associate = (models) => {
   ProfissionalPermissao.belongsTo(models.Profissional, {
		foreignKey: "profissional_login",
		targetKey: "profissional_login",
	});
	ProfissionalPermissao.belongsTo(models.Permissao, {
		foreignKey: "id_permissao",
		targetKey: "id",
		as: "Permissao",
	});
};

module.exports = ProfissionalPermissao;