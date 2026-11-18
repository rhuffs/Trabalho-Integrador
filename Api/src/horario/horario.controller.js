const horarioService = require("./horario.service");

async function listarHorariosSemana(req, res) {
    try {
        const horario = await horarioService.listarHorariosSemana(req.body);
        return res.status(200).json(horario);
    } catch (erro) {
        console.log("Erro ao buscar horarios:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarHorario(req, res) {
    try {
        const horario = await horarioService.buscarHorario(req.body);
        if (!horario) return res.status(404).json({ erro: "horario não encontrado" });
        return res.status(200).json(horario);
    } catch (erro) {
        console.log("Erro ao buscar horario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criarHorario(req, res) {
    try {
        const horario = await horarioService.criarHorario(req.body);
        return res.status(201).json(horario);
    } catch (erro) {
        console.log("Erro ao criar horario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizarHorario(req, res) {
    try {
        const horario = await horarioService.atualizarHorario(req.body.horario_data, req.body.horario_hora, req.body.dados);
        if (!horario) return res.status(404).json({ erro: "horario não encontrado" });
        return res.status(200).json(horario);
    } catch (erro) {
        console.log("Erro ao atualizar horario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletarHorario(req, res) {
    try {
        const horario = await horarioService.deletarHorario(req.body);
        if (!horario) return res.status(404).json({ erro: "horario não encontrado" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar horario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    listarHorariosSemana,
    buscarHorario,
    criarHorario,
    atualizarHorario,
    deletarHorario,
};
