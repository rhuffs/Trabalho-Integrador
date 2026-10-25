const pacientesService = require("./pacientes.service");

async function listar(req, res) {
    try {
        const pacientes = await pacientesService.listar();
        return res.status(200).json(pacientes);
    } catch (erro) {
        console.log("Erro ao buscar pacientes:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const paciente = await pacientesService.buscarPorId(req.params.id);
        return res.status(200).json(paciente);
    } catch (erro) {
        console.log("Erro ao buscar paciente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criar(req, res) {
    try {
        const paciente = await pacientesService.criar(req.body);
        return res.status(201).json(paciente);
    } catch (erro) {
        console.log("Erro ao criar paciente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const paciente = await pacientesService.atualizar(req.params.id, req.body);
        if (!paciente) return res.status(404).json({ erro: "paciente não encontrado" });
        return res.status(200).json(paciente);
    } catch (erro) {
        console.log("Erro ao atualizar paciente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletar(req, res) {
    try {
        const paciente = await pacientesService.deletar(req.params.id);
        if (!paciente) return res.status(404).json({ erro: "paciente não encontrado" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar paciente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
