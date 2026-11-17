const { AnamneseItem, ConsultaAnamnese, Consulta } = require("../database/models");

async function listarAnamneseItem() {
    return AnamneseItem.findAll({ order: [["anamnese_id", "ASC"]] });
}

async function buscarAnamneseItemPorId(anamnese_id) {
    return AnamneseItem.findByPk(anamnese_id);
}

async function buscarAnamneseItemPorNome(anamnese_nome) {
    return AnamneseItem.findAll({ where: {anamnese_nome: anamnese_nome}})
}

async function listarAnamnese(consulta_id) {
    return ConsultaAnamnese.findAll({
        where: {consulta_id: consulta_id},
        include: [
            { model: AnamneseItem }
        ],
    });
}

async function criarAnamneseItem(dados) {
    return AnamneseItem.create(dados);
}

async function criarConsultaAnamnese(dados){
    return ConsultaAnamnese.create(dados);
}

async function atualizarAnamneseItem(anamnese_id, dados) {
    const anamnese = await AnamneseItem.findByPk(anamnese_id);
    if (!anamnese) return null;
    return anamnese.update(dados);
}

async function deletarAnamneseItem(anamnese_id) {
    const anamnese = await AnamneseItem.findByPk(anamnese_id);
    if (!anamnese) return null;
    await anamnese.destroy();
    return anamnese;
}

async function deletarConsultaAnamneseItem(dados) {
    const anamnese = await ConsultaAnamnese.findOne({ where: {
        consulta_id: dados.consulta_id,
        anamnese_id: dados.anamnese_id,
    } });
    if (!anamnese) return null;
    await anamnese.destroy();
    return anamnese;
}

async function deletarConsultaAnamnese(consulta_id) {
    const anamnese = await ConsultaAnamnese.findAll({ where: {
        consulta_id: consulta_id,
    } });
    if (!anamnese) return null;
    for(let i = 0; i < anamnese.length; i++){
        await anamnese[i].destroy();
    }
    return anamnese;
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
