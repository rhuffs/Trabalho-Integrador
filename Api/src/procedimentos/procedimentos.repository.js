
const { Procedimento } = require("../database/models");

async function listar() {
    return Procedimento.findAll({
        order: [["procedimento_nome", "ASC"]]
    });
}

async function buscarPorId(id) {
    return Procedimento.findByPk(id);
}

async function criar(dados) {
    return Procedimento.create(dados);
}

async function atualizar(id, dados) {
    const procedimento = await Procedimento.findByPk(id);
    if (!procedimento) return null;
    return procedimento.update(dados);
}

async function deletar(id) {
    const procedimento = await Procedimento.findByPk(id);
    if (!procedimento) return null;
    await procedimento.destroy();
    return procedimento;
}

async function buscarPorNome(nome) {
    return Procedimento.findAll({
        where: {
            procedimento_nome: nome
        }
    });
}

async function atualizarPreco(id, preco) {
    const procedimento = await Procedimento.findByPk(id);
    if (!procedimento) return null;

    return procedimento.update({
        preco: preco
    });
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorNome,
    atualizarPreco
};
