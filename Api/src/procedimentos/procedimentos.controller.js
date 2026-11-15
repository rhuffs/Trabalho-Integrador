const ProcedimentosService = require("./procedimentos.service");

async function listar(req, res) {
    try {
        const procedimentos = await ProcedimentosService.listar();
        return res.status(200).json(procedimentos);
    } catch (erro) {
        console.log("Erro ao buscar procedimentos:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const procedimento = await ProcedimentosService.buscarPorId(req.params.id);

        if (!procedimento) {
            return res.status(404).json({ erro: "Procedimento não encontrado" });
        }
        return res.status(200).json(procedimento);
    } catch (erro) {
        console.log("Erro ao buscar Procedimento:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criar(req, res) {
    try {
        const procedimento = await ProcedimentosService.criar(req.body);
        return res.status(201).json(procedimento);
    } catch (erro) {
        console.log("Erro ao criar procedimento:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const procedimento = await ProcedimentosService.atualizar(req.params.id, req.body);
        if (!procedimento) return res.status(404).json({ erro: "Procedimento não encontrado" });
        return res.status(200).json(procedimento);
    } catch (erro) {
        console.log("Erro ao atualizar procedimento:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletar(req, res) {
    try {
        const procedimento = await ProcedimentosService.deletar(req.params.id);
        if (!procedimento) return res.status(404).json({ erro: "procedimento não encontrado" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar procedimento:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}


async function buscarPorNome(req,res) {
    try {
        const procedimento = await ProcedimentosService.buscarPorNome(req.query.procedimento_nome);
        if (!procedimento || procedimento.length === 0) return res.status(404).json({erro: "Procedimento não encontrado"});
        return res.status(200).json(procedimento);
    } catch (erro) {
        console.log("Erro ao buscar Procedimento:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizarPreco(req, res) {
    try {
        const { id } = req.params;
        const { preco } = req.body;
        const procedimento = await ProcedimentosService.atualizarPreco(id, preco);
        if (!procedimento) {
            return res.status(404).json({ erro: "Procedimento não encontrado" });
        }
        return res.status(200).json(procedimento);
    } catch (erro) {
        return res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorNome,
    atualizarPreco,
};
