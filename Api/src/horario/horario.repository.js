const { Op } = require("sequelize");
const { Horario, Consulta } = require("../database/models");

async function listarHorariosSemana(dia_segunda, dia_domingo) {
    return Horario.findAll({ 
        order: [["horario_data", "ASC"]],
        where: {
            horario_data: {
                [Op.gte]: dia_segunda,
                [Op.lte]: dia_domingo,
            },
        },
        include: [
            { model: Consulta, as: "HorarioInicio"},
            { model: Consulta, as: "HorarioFim"}
        ]
    });
}

async function buscarHorario(dados) {
    return Horario.findOne({
        where: {
            horario_data: dados.horario_data,
            horario_hora: dados.horario_hora
        },
    });
}

async function criarHorario(dados) {
    return Horario.create(dados);
}

async function atualizarHorario(horario_data, horario_hora, dados) {
    const horario = await Horario.findOne({
        where: {horario_data: horario_data},
    });
    if (!horario) return null;
    return horario.update(dados);
}

async function deletarHorario(dados) {
    const horario = await Horario.findOne({
        where: {horario_data: dados.horario_data},
    });
    if (!horario) return null;
    await horario.destroy();
    return horario;
}

module.exports = {
    listarHorariosSemana,
    buscarHorario,
    criarHorario,
    atualizarHorario,
    deletarHorario,
};
