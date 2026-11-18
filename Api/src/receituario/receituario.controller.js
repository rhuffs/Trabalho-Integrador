const ReceituarioService = require("./receituario.service");

async function listar(req, res) {
    try {
        const receituario = await ReceituarioService.listar();
        return res.status(200).json(receituario);
    } catch (erro) {
        console.log("Erro ao buscar remedios:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const receituario = await ReceituarioService.buscarPorId(req.params.id);

        if (!receituario) {
            return res.status(404).json({ erro: "receituario não encontrado" });
        }
        return res.status(200).json(receituario);
    } catch (erro) {
        console.log("Erro ao buscar receituario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criar(req, res) {
    try {
        const receituario = await ReceituarioService.criar(req.body);
        return res.status(201).json(receituario);
    } catch (erro) {
        console.log("Erro ao criar receituario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const receituario = await ReceituarioService.atualizar(req.params.id, req.body);
        if (!receituario) return res.status(404).json({ erro: "receituario não encontrado" });
        return res.status(200).json(receituario);
    } catch (erro) {
        console.log("Erro ao atualizar receituario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletar(req, res) {
    try {
        const receituario = await ReceituarioService.deletar(req.params.id);
        if (!receituario) return res.status(404).json({ erro: "receituario não encontrado" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar receituario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorConsulta(req, res) {
    try {
        const receituario = await ReceituarioService.buscarPorConsulta(req.params.id);

        if (receituario.length === 0) {
            return res.status(404).json({ erro: "receituario não encontrado" });
        }
        return res.status(200).json(receituario);
    } catch (erro) {
        console.log("Erro ao buscar receituario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorPaciente(req, res) {
    try {
        const receituario = await ReceituarioService.buscarPorPaciente(req.params.id);

        if (receituario.length === 0) {
            return res.status(404).json({ erro: "receituario não encontrado" });
        }
        return res.status(200).json(receituario);
    } catch (erro) {
        console.log("Erro ao buscar receituario:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}


module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorConsulta,
    buscarPorPaciente
};
