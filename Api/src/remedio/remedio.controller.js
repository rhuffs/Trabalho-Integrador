const RemedioService = require("./remedio.service");

async function listar(req, res) {
    try {
        const remedio = await RemedioService.listar();
        return res.status(200).json(remedio);
    } catch (erro) {
        console.log("Erro ao buscar remedios:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const remedio = await RemedioService.buscarPorId(req.params.id);

        if (!remedio) {
            return res.status(404).json({ erro: "remedio não encontrado" });
        }
        return res.status(200).json(remedio);
    } catch (erro) {
        console.log("Erro ao buscar remedio:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criar(req, res) {
    try {
        const remedio = await RemedioService.criar(req.body);
        return res.status(201).json(remedio);
    } catch (erro) {
        console.log("Erro ao criar remedio:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const remedio = await RemedioService.atualizar(req.params.id, req.body);
        if (!remedio) return res.status(404).json({ erro: "remedio não encontrado" });
        return res.status(200).json(remedio);
    } catch (erro) {
        console.log("Erro ao atualizar remedio:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletar(req, res) {
    try {
        const remedio = await RemedioService.deletar(req.params.id);
        if (!remedio) return res.status(404).json({ erro: "remedio não encontrado" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar remedio:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}


async function buscarPorNome(req,res) {
    try {
        const remedio = await RemedioService.buscarPorNome(req.query.remedio_nome);
        if (!remedio || remedio.length === 0) return res.status(404).json({erro: "remedio não encontrado"});
        return res.status(200).json(remedio);
    } catch (erro) {
        console.log("Erro ao buscar remedio:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}


module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorNome
};