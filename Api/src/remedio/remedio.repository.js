const { Remedio } = require("../database/models");


async function listar() {
    return Remedio.findAll({
        order: [["remedio_nome", "ASC"]]
    });
}

async function buscarPorId(id) {
    return Remedio.findByPk(id);
}

async function criar(dados) {
    return Remedio.create(dados);
}

async function atualizar(id, dados) {
    const remedio = await Remedio.findByPk(id);
    if (!remedio) return null;
    return remedio.update(dados);
}

async function deletar(id) {
    const remedio = await Remedio.findByPk(id);
    if (!remedio) return null;
    await remedio.destroy();
    return remedio;
}

async function buscarPorNome(nome) {
    return Remedio.findAll({
        where: {
            remedio_nome: nome
        }
    });
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorNome
};