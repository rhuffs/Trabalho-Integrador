const { Paciente } = require("../database/models");

async function listar() {
    return Paciente.findAll({
        where: { ativo: true },
        order: [["nome", "ASC"]]
    });
}
async function buscarPorId(id) {
    return Paciente.findByPk(id);
}

async function criar(dados) {
    return Paciente.create(dados);
}

async function atualizar(id, dados) {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) return null;
    return paciente.update(dados);
}

async function deletar(id) {
    console.log("ID recebido para exclusão:", id);
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
        console.log("Paciente não encontrado!");
        return null;
    }
    await paciente.update(
        { ativo: false },
        { logging: console.log }
    );
    return paciente;
}


async function buscarPorNome(nome){
    return Paciente.findAll({
        where : {
            nome : nome
        }
    });
}

async function buscarPorCpf(cpf){
    return Paciente.findAll({
        where : {
            cpf : cpf
        }
    });
}

async function contarPacientesAtivos() {
    return Paciente.count({
        where: { ativo: true }
    });
}


module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorNome,
    buscarPorCpf,
    contarPacientesAtivos
};
