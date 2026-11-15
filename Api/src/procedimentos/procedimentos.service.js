const ProcedimentosRepository = require("./procedimentos.repository");

async function listar() {
    return ProcedimentosRepository.listar();
}

async function buscarPorId(id) {
    return ProcedimentosRepository.buscarPorId(id);
}

async function criar(dados) {
    return ProcedimentosRepository.criar(dados);
}

async function atualizar(id, dados) {
    return ProcedimentosRepository.atualizar(id, dados);
}

async function deletar(id) {
    return ProcedimentosRepository.deletar(id);
}

async function buscarPorNome(nome) {
    return ProcedimentosRepository.buscarPorNome(nome);
}

async function atualizarPreco(id, preco) {
    if (preco === undefined || preco === null ||
        !Number.isFinite(Number(preco)) || Number(preco) < 0) {
        throw new Error("Preço inválido.");
    }

    return ProcedimentosRepository.atualizarPreco(id, Number(preco));
}


module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorNome,
    atualizarPreco,
};
