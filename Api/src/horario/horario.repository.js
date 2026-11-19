const { Op } = require("sequelize");
const { Horario, Consulta, Procedimento, Paciente } = require("../database/models");

async function listarHorariosSemana(profissional_login, dia_segunda, dia_domingo) {
    return Horario.findAll({ 
        where: {
            horario_data: {
                [Op.gte]: dia_segunda,
                [Op.lte]: dia_domingo,
            },
            profissional_login: profissional_login,
        },
        order: [["profissional_login", "ASC"],["horario_data", "ASC"]],
        include: [{ 
                model: Consulta,
                include: [
                    {model: Paciente},
                ],
            },
        ],
    });
}

async function buscarHorario(profissional_login, dados) {
    const hor = await Horario.findOne({
        where: {
            horario_data: dados.horario_data,
            horario_hora: dados.horario_hora,
            profissional_login: profissional_login,
        },
        include: [{ 
                model: Consulta,
                include: [
                    {model: Paciente},
                ],
            },
        ],
    });
    return hor;
}

async function criarHorario(dados) {
    return Horario.create(dados);
}

async function deletarHorario(profissional_login, dados) {
    const horario = await Horario.findOne({
        where: {
            horario_data: dados.horario_data,
            horario_hora: dados.horario_hora,
            profissional_login: profissional_login,
        },
    });
    if (!horario) return null;
    await horario.destroy();
    return horario;
}

module.exports = {
    listarHorariosSemana,
    buscarHorario,
    criarHorario,
    deletarHorario,
};
