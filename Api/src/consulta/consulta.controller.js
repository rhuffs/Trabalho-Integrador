const consultaService = require("./consulta.service");
const verificarAcessoDentista = require("../auth/auth.service").verificarAcessoDentista;
const verificarAcessoDentistaParaPaciente = require("../auth/auth.service").verificarAcessoDentistaParaPaciente;

async function listarConsultas(req, res) {
    try {
        const define = await !Object.hasOwn(req.body, "paciente_id"); 
        await verificarAcessoDentista(req, define);
        const consulta = await consultaService.listarConsultas(req.body);
        return res.status(200).json(consulta);
    } catch (erro) {
        console.log("Erro ao buscar consulta:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}
// rhuan: crei uma nova funcao para passar pela url

async function listarConsultasPaciente(req, res) {
    try {
        await verificarAcessoDentistaParaPaciente(req, true);

        const consulta = await consultaService.listarConsultas(req.query);

        return res.status(200).json(consulta);
    } catch (erro) {
        console.log("Erro ao buscar consulta:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarConsulta(req, res) {
    try {
        await verificarAcessoDentista(req, true);
        const consulta = await consultaService.buscarConsulta(req.params.id);
        if (!consulta) return res.status(404).json({ erro: "consulta não encontrada" });
        return res.status(200).json(consulta);
    } catch (erro) {
        console.log("Erro ao buscar consulta:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criarConsulta(req, res) {
    try {
        await verificarAcessoDentista(req, true);
        const consulta = await consultaService.criarConsulta(req);
        return res.status(201).json(consulta);
    } catch (erro) {
        console.log("Erro ao criar consulta:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function adicionarDentistaConsulta(req, res) {
    try{
        const participa = await consultaService.adicionarDentistaConsulta(req.body.profissional_login, req.params.id);
        return res.status(201).json(participa)
    }
    catch(erro){
        console.log("Erro ao adicionar dentista à consulta:", erro);
        return res.status(500).json({erro: erro.message }); // antes o json estva fora do return ;)
    }
}

async function atualizarConsulta(req, res) {
    try {
        const consulta = await consultaService.atualizarConsulta(req.params.id, req.perm, req.user.profissional_login, req.body);
        if (!consulta) return res.status(404).json({ erro: "consulta não encontrada" });
        return res.status(200).send(consulta);
    } catch (erro) {
        console.log("Erro ao atualizar consulta:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletarConsulta(req, res) {
    try {
        const consulta = await consultaService.deletarConsulta(req.params.id, req.perm, req.user.profissional_login);
        if (!consulta) return res.status(404).json({ erro: "consulta não encontrada" });
        return res.status(204).send(consulta);
    } catch (erro) {
        console.log("Erro ao deletar consulta:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function removerDentistaConsulta(req, res) {
    try {
        const participa = await consultaService.removerDentistaConsulta(req.body.profissional_login, req.params.id);
        if (!participa) return res.status(404).json({ erro: "consulta não encontrada" });
        return res.status(204).send(participa);
    } catch (erro) {
        console.log("Erro ao remover dentista da consulta:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function contarConsultasHoje(req, res) {
    try {
        const total = await consultaService.contarConsultasHoje();

        return res.status(200).json({ total });

    } catch (erro) {
        console.log("Erro ao contar consultas de hoje:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    listarConsultas,
    buscarConsulta,
    criarConsulta,
    atualizarConsulta,
    deletarConsulta,
    adicionarDentistaConsulta,
    removerDentistaConsulta,
    listarConsultasPaciente,
    contarConsultasHoje
};
