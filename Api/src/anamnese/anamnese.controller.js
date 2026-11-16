const anamneseService = require("./anamnese.service");

async function listarAnamneseItem(req, res) {
    try {
        const anamnese = await anamneseService.listarAnamneseItem();
        if (!anamnese) return res.status(404).json({ erro: "item de anamnese não encontrado" });
        return res.status(200).json(anamnese);
    } catch (erro) {
        console.log("Erro ao buscar items da anamnese:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarAnamneseItemPorId(req, res) {
    try {
        const anamnese = await anamneseService.buscarAnamneseItemPorId(req.params.id);
        if (!anamnese) return res.status(404).json({ erro: "item de anamnese não encontrado" });
        return res.status(200).json(anamnese);
    } catch (erro) {
        console.log("Erro ao buscar item da anamnese:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarAnamneseItemPorNome(req, res) {
    try {
        const anamnese = await anamneseService.buscarAnamneseItemPorNome(req.body.anamnese_nome);
        if (!anamnese) return res.status(404).json({ erro: "item de anamnese não encontrado" });
        return res.status(200).json(anamnese);
    } catch (erro) {
        console.log("Erro ao buscar item da anamnese:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function listarAnamnese(req, res) {
    try {
        const anamnese = await anamneseService.listarAnamnese(req.params.id);
        return res.status(200).json(anamnese);
    } catch (erro) {
        console.log("Erro ao buscar anamnese da consulta:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criarAnamneseItem(req, res) {
    try {
        const anamnese = await anamneseService.criarAnamneseItem(req.body);
        return res.status(201).json(anamnese);
    } catch (erro) {
        console.log("Erro ao criar item da anamnese:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criarConsultaAnamnese(req, res) {
    try {
        const anamnese = await anamneseService.criarConsultaAnamnese(req.body);
        return res.status(201).json(anamnese);
    } catch (erro) {
        console.log("Erro ao adicionar item à anamnese da consulta:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizarAnamneseItem(req, res) {
    try {
        const anamnese = await anamneseService.atualizarAnamneseItem(req.params.id, req.body);
        if (!anamnese) return res.status(404).json({ erro: "item da anamnese não encontrado" });
        return res.status(200).json(anamnese);
    } catch (erro) {
        console.log("Erro ao atualizar item da anamnese:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletarAnamneseItem(req, res) {
    try {
        const anamnese = await anamneseService.deletarAnamneseItem(req.params.id);
        if (!anamnese) return res.status(404).json({ erro: "item da anamnese não encontrado" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar anamnese:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletarConsultaAnamneseItem(req, res) {
    try {
        const anamnese = await anamneseService.deletarConsultaAnamneseItem(req.body);
        if (!anamnese) return res.status(404).json({ erro: "item da anamnese não encontrado na consulta" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar item da anamnese na consulta:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletarConsultaAnamnese(req, res) {
    try {
        const anamnese = await anamneseService.deletarConsultaAnamnese(req.params.id);
        if (!anamnese) return res.status(404).json({ erro: "anamnese não encontrada na consulta" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar anamnese da consulta:", erro);
        return res.status(500).json({ erro: erro.message });
    }
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
