const { Paciente } = require("../database/models");

async function listar() {
    return Paciente.findAll({ order: [["nome", "ASC"]] });
}

async function buscarPorId(id) {
    return Paciente.findByPk(id);
}

async function criar(dados) {
    return Paciente.create(dados);
}

async function atualizar(id, dados) {
    const Paciente = await Paciente.findByPk(id);
    if (!Paciente) return null;
    return Paciente.update(dados);
}

async function deletar(id) {
    const Paciente = await Paciente.findByPk(id);
    if (!Paciente) return null;
    await Paciente.destroy();
    return Paciente;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
