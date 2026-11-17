
const financeiroService = require("./financeiro.service");

async function listar(req, res) {
    try {
        const financeiro = await financeiroService.listar();
        return res.status(200).json(financeiro);
    } catch (erro) {
        console.log("Erro ao listar financeiro:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const financeiro = await financeiroService.buscarPorId(req.params.id);
        return res.status(200).json(financeiro);
    } catch (erro) {
        console.log("Erro ao buscar registro financeiro:", erro);
        
        if (erro.message === "Registro financeiro não encontrado") {
            return res.status(404).json({ erro: erro.message });
        }
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorPaciente(req, res) {
    try {
        const financeiro = await financeiroService.buscarPorPaciente(req.params.paciente_id);
        return res.status(200).json(financeiro);
    } catch (erro) {
        console.log("Erro ao buscar financeiro do paciente:", erro);
        if (erro.message === "Paciente não encontrado") {
            return res.status(404).json({ erro: erro.message });
        }

        return res.status(500).json({ erro: erro.message });
    }
}

async function registrarDebito(req, res) {
    try {
        const { paciente_id, valor } = req.body;
        const financeiro = await financeiroService.registrarDebito(paciente_id, valor);

        return res.status(201).json(financeiro);
    } catch (erro) {
        console.log("Erro ao registrar débito:", erro);
        
        if (erro.message === "Paciente não encontrado" ||
            erro.message === "O valor do débito deve ser maior que zero") {
            return res.status(400).json({ erro: erro.message });
        }
        return res.status(500).json({ erro: erro.message });
    }
}

async function registrarCredito(req, res) {
    try {
        const { paciente_id, valor } = req.body;
        const financeiro = await financeiroService.registrarCredito(paciente_id, valor);
        
        return res.status(201).json(financeiro);
    } catch (erro) {
        console.log("Erro ao registrar crédito:", erro);

        if (
            erro.message === "Paciente não encontrado" ||
            erro.message === "O valor do crédito deve ser maior que zero" ||
            erro.message === "O valor do crédito não pode ser maior que o saldo devedor"
        ) {
            return res.status(400).json({ erro: erro.message });
        }
        return res.status(500).json({ erro: erro.message });
    }
}

async function calcularSaldo(req, res) {
    try {
        const saldo = await financeiroService.calcularSaldo(req.params.paciente_id);
        return res.status(200).json({ saldo });
    } catch (erro) {
        console.log("Erro ao calcular saldo:", erro);

        if (erro.message === "Paciente não encontrado") {
            return res.status(404).json({ erro: erro.message });
        }
        return res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    listar,
    buscarPorId,
    buscarPorPaciente,
    registrarDebito,
    registrarCredito,
    calcularSaldo
};
