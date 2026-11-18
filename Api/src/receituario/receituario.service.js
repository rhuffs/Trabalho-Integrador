const ReceituarioRepository = require("./receituario.repository");

async function listar() {
    return ReceituarioRepository.listar();
}

async function buscarPorId(id) {
    return ReceituarioRepository.buscarPorId(id);
}

async function criar(dados) {
    return ReceituarioRepository.criar(dados);
}

async function atualizar(id, dados) {
    return ReceituarioRepository.atualizar(id, dados);
}

async function deletar(id) {
    return ReceituarioRepository.deletar(id);
}

async function buscarPorConsulta(id) {
    return ReceituarioRepository.buscarPorConsulta(id);
}

async function buscarPorPaciente(id) {
    return ReceituarioRepository.buscarPorPaciente(id);
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorConsulta,
    buscarPorPaciente
};
