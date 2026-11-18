const { Receituario, Consulta } = require("../database/models");

async function listar() {
    return Receituario.findAll({
        order: [["receita_data_inicio", "DESC"]]
    });
}

async function buscarPorId(id) {
    return Receituario.findByPk(id);
}

async function criar(dados) {
    return Receituario.create(dados);
}

async function atualizar(id, dados) {
    const receita = await Receituario.findByPk(id);
    if (!receita) return null;
    return receita.update(dados);
}

async function deletar(id) {
    const receita = await Receituario.findByPk(id);
    if (!receita) return null;
    await receita.destroy();
    return receita;
}

async function buscarPorConsulta(id) {
    return Receituario.findAll({
        where: {
            consulta_id: id
        }
    });
}

async function buscarPorPaciente(id) {
    return Receituario.findAll({
        include: [{
            model: Consulta,
            where: { paciente_id: id }
        }]
    });
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