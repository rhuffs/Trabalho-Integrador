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

async function buscarPorNome(nome) {
    return pacientesRepository.buscarPorNome(nome);
}

async function buscarPorCpf(cpf) {
    return pacientesRepository.buscarPorCpf(cpf);
}

async function contarPacientesAtivos() {
    return pacientesRepository.contarPacientesAtivos();
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorNome,
    buscarPorCpf,
    contarPacientesAtivos
};
