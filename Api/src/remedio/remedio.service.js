const RemedioRepository = require("./remedio.repository");

async function listar() {
    return RemedioRepository.listar();
}

async function buscarPorId(id) {
    return RemedioRepository.buscarPorId(id);
}

async function criar(dados) {
    return RemedioRepository.criar(dados);
}

async function atualizar(id, dados) {
    return RemedioRepository.atualizar(id, dados);
}

async function deletar(id) {
    return RemedioRepository.deletar(id);
}

async function buscarPorNome(nome) {
    return RemedioRepository.buscarPorNome(nome);
}




module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorNome
};
