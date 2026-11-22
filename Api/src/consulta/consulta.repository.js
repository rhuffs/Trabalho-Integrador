const { Op } = require("sequelize");
const { Horario, Consulta, Procedimento, Paciente, ProfissionalConsulta, Profissional, Financeiro } = require("../database/models");
const {criarHorario} = require("../horario/horario.service");

async function listarConsultasPaciente(paciente_id) {
    return Consulta.findAll({ 
        where: { paciente_id: paciente_id },
        order: [["consulta_id", "ASC"]],
        include: [
            { model: Procedimento },
            { 
                model: Profissional,
                attributes: ['nome', 'telefone'],
                order: [["nome", "ASC"]],
            },
            { model: Financeiro},
            { 
                model: Horario,
                order: [["horario_data", "ASC"],["horario_hora", "ASC"]],
            },
        ],
    });
}

async function listarConsultasDentista(profissional_login) {
    return Consulta.findAll({ 
        order: [["consulta_id", "ASC"]],
        include: [
            { model: Procedimento, },
            { 
                model: Profissional,
                attributes: ['nome', 'telefone'],
                order: [["nome", "ASC"]],
                where: { profissional_login: profissional_login },
            },
            { model: Financeiro},
            { 
                model: Horario,
                order: [["horario_data", "ASC"],["horario_hora", "ASC"]],
            },
        ],
    });
}

async function listarConsultasDentistaPaciente(profissional_login, paciente_id) {
    return Consulta.findAll({ 
        where: { paciente_id: paciente_id },
        order: [["consulta_id", "ASC"]],
        include: [
            { model: Procedimento, },
            { 
                model: Profissional,
                attributes: ['nome', 'telefone'],
                order: [["nome", "ASC"]],
                where: { profissional_login: profissional_login },
            },
            { model: Financeiro},
            { 
                model: Horario,
                order: [["horario_data", "ASC"],["horario_hora", "ASC"]],
            },
        ],
    });
}

async function buscarConsulta(consulta_id) {
    return Consulta.findOne({
        where: { consulta_id: consulta_id},
        include: [
            { model: Procedimento, },
            { 
                model: Profissional,
                attributes: ['nome', 'telefone'],
            },
            { model: Financeiro},
            { model: Horario },
        ],
    });
}

async function criarConsulta(dados) {
    const resposta = [];
    try{
        const consulta = await Consulta.create(dados);
        resposta.push(consulta);
        dados.consulta_id = consulta.consulta_id;
        const participa = await ProfissionalConsulta.create(dados);
        resposta.push(participa);
        dados.horario_consulta = consulta.consulta_id;
        const horarios = await criarHorario(dados);
        resposta.push(horarios);
        return {
            consulta: consulta,
            participacao: participa,
            horarios: horarios,
        }
    }
    catch(erro){
        if( typeof resposta[0] !== 'undefined') await resposta[0].destroy();
        if( typeof resposta[1] !== 'undefined') await resposta[1].destroy();
        if( typeof resposta[2] !== 'undefined') {
            for(let i of resposta[2]){
                await i.destroy();
            }
        }
        throw erro;
    }
}

async function criarProfissionalConsulta(dados) {
    return ProfissionalConsulta.create(dados);
}

async function deletarConsulta(consulta_id) {
    const consulta = await Consulta.findByPk(consulta_id);
    if (!consulta) return null;
    await consulta.destroy();
    return consulta;
}

async function atualizarConsulta(consulta_id, dados) {
    const consulta = await Consulta.findByPk(consulta_id);
    if (!consulta) return null;
    await consulta.update(dados);
    return consulta;
}

async function deletarProfissionalConsulta(profissional_login, consulta_id) {
    const consulta = await ProfissionalConsulta.findOne({
        where: { 
            consulta_id: consulta_id,
            profissional_login: profissional_login,
        },
    });
    if (!consulta) return null;
    await consulta.destroy();
    return consulta;
}

async function verificarParticipacaoDentista(consulta_id, profissional_login){
    const answ = await ProfissionalConsulta.findOne({
        where: { 
            consulta_id: consulta_id,
            profissional_login: profissional_login,
         },
    });
    return answ;
}

async function contarConsultasHoje() {
    const hoje = new Date();
    const dataHoje =
        hoje.getFullYear() + "-" +
        String(hoje.getMonth() + 1).padStart(2, "0") + "-" +
        String(hoje.getDate()).padStart(2, "0");
    return Consulta.count({
        include: [
            {
                model: Horario,
                where: {
                    horario_data: dataHoje
                },
                required: true
            }
        ],
        distinct: true,
        col: "consulta_id"
    });
}

module.exports = {
    listarConsultasPaciente,
    listarConsultasDentista,
    listarConsultasDentistaPaciente,
    buscarConsulta,
    criarConsulta,
    criarProfissionalConsulta,
    atualizarConsulta,
    deletarConsulta,
    deletarProfissionalConsulta,
    verificarParticipacaoDentista,
    contarConsultasHoje
};
