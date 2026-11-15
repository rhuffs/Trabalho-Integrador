const { Profissional, Permissao, ProfissionalPermissao } = require("../database/models");

async function buscarPorId(profissional_login) {
    // TODO: Buscar usuário por ID (chave primária)
    // Dica: use Usuario.findByPk()
    return Profissional.findByPk(profissional_login);
}

async function deletar(profissional_login) {
    const profissional = await Profissional.findByPk(profissional_login);
    if(!profissional) return null;
    await profissional.destroy();
    return profissional;
}

async function criar(dados) {
    // TODO: Criar um novo usuário no banco de dados
    // Dica: use Usuario.create() passando os dados
    const profissional = await Profissional.create(dados);
    if(dados.tipo_profissional == "SECRETARIO"){
        const perm = await Permissao.findOne({ where: {descricao: 'SECRETARIO'}, });
        const done = await ProfissionalPermissao.create({profissional_login: dados.profissional_login, id_permissao: perm.id });
    }
    return profissional;
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

async function listar() {
    return Profissional.findAll({ order: [["nome", "ASC"]] });
}

async function buscarLogin(profissional_login) {
    return Profissional.findByPk(profissional_login);
}

async function buscarNome(nome) {
    return Profissional.findAll({ where: { nome: nome }});
}

module.exports = {
    buscarPorId,
    criar,
    buscarPermissaoPorDescricao,
    buscarUsuarioPermissao,
    listarPermissoesUsuario,
    deletar,
    listar,
    buscarLogin,
    buscarNome,
};
