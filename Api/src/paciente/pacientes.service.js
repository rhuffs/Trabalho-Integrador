const pacientesRepository = require("./pacientes.repository");

async function listar() {
    return pacientesRepository.listar();
}

async function buscarPorId(id) {
    return pacientesRepository.buscarPorId(id);
}

async function criar(dados) {
    return pacientesRepository.criar(dados);
}

async function atualizar(id, dados) {
    return pacientesRepository.atualizar(id, dados);
}

async function deletar(id) {
    return pacientesRepository.deletar(id);
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
