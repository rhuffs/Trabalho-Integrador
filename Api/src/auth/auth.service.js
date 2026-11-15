const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRepository = require("./auth.repository");

async function autenticarUsuario(profissional_login, senha) {
    // TODO: Buscar usuário por email usando o repository
    const usuario = await authRepository.buscarPorId(profissional_login);

    // TODO: Verificar se o usuário existe
    if (!usuario) {
        return { sucesso: false, mensagem: "Usuário incorreto." };
    }

    // TODO: Comparar a senha informada com o hash armazenado
    // Dica: use bcrypt.compare(senha, usuario.senha)
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    // TODO: Retornar resultado baseado na validação
    if (senhaValida) {
        return { sucesso: true, usuario: usuario };
    } else {
        return { sucesso: false, mensagem: "Senha incorreta." };
    }
}

async function criarNovoUsuario(dados) {
    const { username, passwd, nome, telefone, tipo_profissional } = dados;
    // TODO: Gerar o hash da senha antes de salvar no banco
    // Dica 1: defina saltRounds = 10
    // Dica 2: gere o salt com bcrypt.genSaltSync(saltRounds)
    // Dica 3: gere o hash com bcrypt.hashSync(passwd, salt)
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const senhaHash =  bcrypt.hashSync(passwd, salt);

    // TODO: Criar usuário no banco usando o repository
    // Passar: email (username), nome, e senha (senhaHash)
    const usuario = await authRepository.criar({
        profissional_login: username,
        nome: nome,
        senha: senhaHash,
        telefone: telefone,
        tipo_profissional: tipo_profissional,
    });

    // TODO: Retornar os dados do usuário criado
    return { profissional_login: usuario.profissional_login, nome: usuario.nome, telefone: usuario.telefone, tipo_profissional: usuario.tipo_profissional };
}

function gerarToken(username) {
    // TODO: Gerar token JWT com o username
    // Dica 1: use jwt.sign() passando payload, chave secreta e opções
    // Dica 2: payload pode ser { username: username }
    // Dica 3: use "your-secret-key" como chave
    // Dica 4: defina expiresIn: "1h" nas opções
    return jwt.sign(
        { username: username },
        "your-secret-key",
        { expiresIn: "1h" }
    );
}

async function verificarPermissaoPorDescricao(profissional_login, descricaoPermissao) {
    try {
        const permissao = await authRepository.buscarPermissaoPorDescricao(descricaoPermissao);

        if (!permissao) {
            return false;
        }

        const usuarioPermissao = await authRepository.buscarUsuarioPermissao(profissional_login, permissao.id);

        return usuarioPermissao !== null;
    } catch (erro) {
        console.error("Erro ao verificar permissão:", erro);
        return false;
    }
}

async function obterPermissoesUsuario(profissional_login) {
    try {
        return await authRepository.listarPermissoesUsuario(profissional_login);
    } catch (erro) {
        console.error("Erro ao obter permissões do usuário:", erro);
        return [];
    }
}

module.exports = {
    autenticarUsuario,
    criarNovoUsuario,
    gerarToken,
    verificarPermissaoPorDescricao,
    obterPermissoesUsuario,
};
