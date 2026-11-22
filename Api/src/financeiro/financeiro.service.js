
const financeiroRepository = require("./financeiro.repository");
const Paciente = require("../database/models/paciente.model");

async function listar() {
    return await financeiroRepository.listar();
}

async function buscarPorId(id) {
    const financeiro = await financeiroRepository.buscarPorId(id);

    if (!financeiro) {
        throw new Error("Registro financeiro não encontrado");
    }

    return financeiro;
}

async function buscarPorPaciente(paciente_id) {
    const paciente = await Paciente.findByPk(paciente_id);
    if (!paciente) {
        throw new Error("Paciente não encontrado");
    }
    return await financeiroRepository.buscarPorPaciente(paciente_id);
}

async function registrarDebito(paciente_id, valor) {
    const paciente = await Paciente.findByPk(paciente_id);

    if (!paciente) {
        throw new Error("Paciente não encontrado");
    }

    if (!valor || valor <= 0) {
        throw new Error("O valor do débito deve ser maior que zero");
    }

    return await financeiroRepository.criar({
        paciente_id,
        financeiro_devendo: valor,
        financeiro_pago: 0,
        financeiro_saldo: valor
    });
}


async function registrarCredito(paciente_id, valor) {
    const paciente = await Paciente.findByPk(paciente_id);

    if (!paciente) {
        throw new Error("Paciente não encontrado");
    }

    if (!Number.isFinite(Number(valor)) || Number(valor) <= 0) {
        throw new Error("O valor do crédito deve ser maior que zero");
    }
    
    const saldoAtual = await financeiroRepository.calcularSaldo(paciente_id);

    const valorCredito = Number(valor);
    const saldoDevedor = Number(saldoAtual);

    console.log("Saldo devedor:", saldoDevedor);
    console.log("Valor do crédito:", valorCredito);

    if (valorCredito > saldoDevedor) {
        throw new Error("O valor do crédito não pode ser maior que o saldo devedor");
    }

    return await financeiroRepository.criar({
        paciente_id,
        financeiro_devendo: 0,
        financeiro_pago: valor,
        financeiro_saldo: -valor
    });
}

async function calcularSaldo(paciente_id) {
    const paciente = await Paciente.findByPk(paciente_id);

    if (!paciente) {
        throw new Error("Paciente não encontrado");
    }

    return await financeiroRepository.calcularSaldo(paciente_id);
}

async function totalRecebidoNoMes() {
    return await financeiroRepository.totalRecebidoNoMes();
}

async function receitasPorMes() {
    return await financeiroRepository.receitasPorMes();
}

module.exports = {
    listar,
    buscarPorId,
    buscarPorPaciente,
    registrarDebito,
    registrarCredito,
    calcularSaldo,
    totalRecebidoNoMes,
    receitasPorMes
};
