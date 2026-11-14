const { Profissional, Permissao, ProfissionalPermissao } = require("../database/models");

async function buscarPorId(profissional_login) {
    // TODO: Buscar usuário por ID (chave primária)
    // Dica: use Usuario.findByPk()
    return Profissional.findByPk(profissional_login);
}

async function criar(dados) {
    // TODO: Criar um novo usuário no banco de dados
    // Dica: use Usuario.create() passando os dados
    return Profissional.create(dados);
}

async function buscarPermissaoPorDescricao(descricao) {
    return Permissao.findOne({
        where: { descricao: descricao },
    });
}

async function buscarUsuarioPermissao(profissional_login, idPermissao) {
    return ProfissionalPermissao.findOne({
        where: {
            profissional_login: profissional_login,
            id_permissao: idPermissao,
        },
    });
}

async function listarPermissoesUsuario(email) {
    const permissoes = await ProfissionalPermissao.findAll({
        where: {
            email: email,
        },
        include: [
            {
                model: Permissao,
                as: "Permissao",
            },
        ],
    });

    return permissoes.map((up) => up.Permissao);
}

module.exports = {
    buscarPorId,
    criar,
    buscarPermissaoPorDescricao,
    buscarUsuarioPermissao,
    listarPermissoesUsuario,
};
