const anamneseRepository = require("./anamnese.repository");

async function listarAnamneseItem() {
    return anamneseRepository.listarAnamneseItem();
}

async function buscarAnamneseItemPorId(anamnese_id) {
    return anamneseRepository.buscarAnamneseItemPorId(anamnese_id);
}

async function buscarAnamneseItemPorNome(anamnese_nome) {
    return anamneseRepository.buscarAnamneseItemPorNome(anamnese_nome);
}

async function listarAnamnese(consulta_id) {
    return anamneseRepository.listarAnamnese(consulta_id);
}

async function criarAnamneseItem(dados) {
    return anamneseRepository.criarAnamneseItem(dados);
}

async function criarConsultaAnamnese(dados) {
    return anamneseRepository.criarConsultaAnamnese(dados);
}

async function atualizarAnamneseItem(anamnese_id, dados) {
    return anamneseRepository.atualizarAnamneseItem(anamnese_id, dados);
}

async function deletarAnamneseItem(anamnese_id) {
    return anamneseRepository.deletarAnamneseItem(anamnese_id);
}

async function deletarConsultaAnamneseItem(dados) {
    return anamneseRepository.deletarConsultaAnamneseItem(dados);
}

async function deletarConsultaAnamnese(consulta_id) {
    return anamneseRepository.deletarConsultaAnamnese(consulta_id);
}

module.exports = {
    listarAnamneseItem,
    buscarAnamneseItemPorId,
    buscarAnamneseItemPorNome,
    listarAnamnese,
    criarAnamneseItem,
    criarConsultaAnamnese,
    atualizarAnamneseItem,
    deletarAnamneseItem,
    deletarConsultaAnamneseItem,
    deletarConsultaAnamnese,
};
