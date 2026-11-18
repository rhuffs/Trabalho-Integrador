const horarioRepository = require("./horario.repository");

async function listarHorariosSemana(dados) {
    const segunda = dados.dia.replaceAll("/","-");
    const dia_segunda = new Date(segunda);
    const dia = dia_segunda.getDay();
    dia_segunda.setDate(dia_segunda.getDate() - dia + 1);
    const dia_domingo = new Date(dia_segunda);
    dia_domingo.setDate(dia_domingo.getDate() + 6);
    return horarioRepository.listarHorariosSemana(dia_segunda, dia_domingo);
}

async function buscarHorario(dados) {
    return horarioRepository.buscarHorario(dados);
}

async function criarHorario(dados) {
    const tempo = dados.horario_hora.split(":");
    if(tempo.length != 2){
        throw new Error("Formato Inválido", {cause: "Formato Inválido"});
    }
    const horas = Number(tempo[0]);
    const minutos = Number(tempo[1]);
    if(!Number.isFinite(horas) || !Number.isFinite(minutos) || horas < 0 || horas > 23 || (minutos != 30 && minutos != 0)){
        throw new Error("Formato Inválido", {cause: "Formato Inválido"});
    }
    return horarioRepository.criarHorario(dados);
}

async function atualizarHorario(horario_data, horario_hora, dados) {
    return horarioRepository.atualizarHorario(horario_data, horario_hora, dados);
}

async function deletarHorario(dados) {
    return horarioRepository.deletarHorario(dados);
}

module.exports = {
    listarHorariosSemana,
    buscarHorario,
    criarHorario,
    atualizarHorario,
    deletarHorario,
};
