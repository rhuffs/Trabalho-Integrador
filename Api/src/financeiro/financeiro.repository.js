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

async function totalRecebidoNoMes() {
    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    const financeiro = await Financeiro.findAll();

    let total = 0;

    financeiro.forEach((registro) => {
        const data = new Date(registro.data_movimentacao);

        if (
            data.getMonth() === inicioMes.getMonth() &&
            data.getFullYear() === inicioMes.getFullYear()
        ) {
            total += Number(registro.financeiro_pago);
        }
    });

    return total;
}

const { fn, col, Op } = require("sequelize");

async function receitasPorMes() {
    const inicio = new Date();
    inicio.setDate(1);
    inicio.setHours(0, 0, 0, 0);
    inicio.setMonth(inicio.getMonth() - 5);

    return Financeiro.findAll({
        attributes: [
            [fn("DATE_TRUNC", "month", col("data_movimentacao")), "mes"],
            [fn("SUM", col("financeiro_pago")), "total"]
        ],
        where: {
            data_movimentacao: {
                [Op.gte]: inicio
            }
        },
        group: [
            fn("DATE_TRUNC", "month", col("data_movimentacao"))
        ],
        order: [
            [fn("DATE_TRUNC", "month", col("data_movimentacao")), "ASC"]
        ],
        raw: true
    });
}

module.exports = {
    listar,
    buscarPorId,
    buscarPorPaciente,
    criar,
    calcularSaldo,
    totalRecebidoNoMes,
    receitasPorMes
};