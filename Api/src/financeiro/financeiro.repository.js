const { Financeiro, Paciente } = require("../database/models");

async function listar() {
    return await Financeiro.findAll({
        include: [
            {
                model: Paciente,
                attributes: ["id", "nome"]
            }
        ],
        order: [["data_movimentacao", "DESC"]]
    });
}
async function buscarPorId(id) {
    return await Financeiro.findByPk(id);
}

async function buscarPorPaciente(paciente_id) {
    return await Financeiro.findAll({
        where: { paciente_id },
        order: [["data_movimentacao", "DESC"]]
    });
}

async function criar(dados) {
    return await Financeiro.create(dados);
}

async function calcularSaldo(paciente_id) {
    return await Financeiro.sum("financeiro_saldo", {
        where: { paciente_id }
    }) || 0;
}

module.exports = {
    listar,
    buscarPorId,
    buscarPorPaciente,
    criar,
    calcularSaldo
};