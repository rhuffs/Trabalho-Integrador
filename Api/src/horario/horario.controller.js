const horarioService = require("./horario.service");

async function listarHorariosSemana(req, res) {
    try {
        const profissional_login = await selectProfissional(req);
        const horario = await horarioService.listarHorariosSemana(profissional_login,req.body);
        return res.status(200).json(horario);
    } catch (erro) {
        console.log("Erro ao buscar horarios:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarHorario(req, res) {
    try {
        const profissional_login = await selectProfissional(req);
        const horario = await horarioService.buscarHorario(profissional_login, req.body);
        if (!horario) return res.status(404).json({ erro: "horario não encontrado" });
        return res.status(200).json(horario);
    } catch (erro) {
        console.log("Erro ao buscar horario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criarHorario(req, res) {
    try {
        const profissional_login = await selectProfissional(req);
        req.body.profissional_login = profissional_login;
        const horario = await horarioService.criarHorario(req.body);
        return res.status(201).json(horario);
    } catch (erro) {
        console.log("Erro ao criar horario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletarHorario(req, res) {
    try {
        const profissional_login = await selectProfissional(req);
        const horario = await horarioService.deletarHorario(profissional_login, req.body);
        if (!horario) return res.status(404).json({ erro: "horario não encontrado" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar horario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function selectProfissional(req) {
    if(req.perm == 'SECRETARIO') {
            return req.body.profissional_login;
        }
        else{ 
            return req.user.profissional_login;
    }
}

module.exports = {
    listarHorariosSemana,
    buscarHorario,
    criarHorario,
    deletarHorario,
};
