const horarioRepository = require("./horario.repository");
const buscarProfissional = require("../auth/auth.repository").buscarPorId;

async function listarHorariosSemana(profissional_login, dados) {
    const segunda = dados.dia.replaceAll("/","-");
    const dia_segunda = new Date(segunda);
    const dia = dia_segunda.getDay();
    if(dia == 0) dia_segunda.setDate(dia_segunda.getDate() - 6)
    else dia_segunda.setDate(dia_segunda.getDate() - dia + 1);
    const dia_domingo = new Date(dia_segunda);
    dia_domingo.setDate(dia_domingo.getDate() + 6);
    return horarioRepository.listarHorariosSemana(profissional_login, dia_segunda, dia_domingo);
}

async function buscarHorario(profissional_login, dados) {
    return horarioRepository.buscarHorario(profissional_login, dados);
}

async function criarHorario(dados) {
    if(Object.hasOwn(dados, "horario_compromisso") && Object.hasOwn(dados, "horario_consulta")) throw new Error("Compromisso e consulta no mesmo horário", {cause: "Um horário deve ter apenas um compromisso ou uma consulta"});
    const profissional = await buscarProfissional(dados.profissional_login);
    if(profissional.tipo_profissional != "DENTISTA") throw new Error("Profissional Inválido", {cause: "Apenas dentistas podem ter horarios"});
    //if(await checarValidadeData(dados.horario_data, dados.horario_hora));
    const tempo_inicio = await checarValidadeTempo(dados.horario_hora);
    if(Object.hasOwn(dados, "horario_fim")){
        const tempo_fim = await checarValidadeTempo(dados.horario_fim);
        if(tempo_inicio[0] > tempo_fim[0] || (tempo_fim[0] == tempo_inicio[0] && tempo_inicio[1] >= tempo_fim[1])) throw new Error("Duração negativa", {cause: "Tempo de fim está menor que o de ínicio"});
        const dur = ((tempo_fim[0] - tempo_inicio[0])*2) + ((tempo_fim[1] - tempo_inicio[1])/30);
        const horarios = [];
        const hor = new Date();
        hor.setHours(tempo_inicio[0], tempo_inicio[1], 0, 0);
        for(let i = 0; i < dur; i++){
            try{
                console.log(i);
                horarios.push(await horarioRepository.criarHorario(dados));
                if(hor.getMinutes() == 30) hor.setHours(hor.getHours() + 1, 0);
                else hor.setMinutes(30);
                dados.horario_hora = `${hor.getHours()}:${hor.getMinutes()}`;
            }
            catch(error){
                for(let i of horarios){
                    await i.destroy();
                }
                throw error;
            }
        }
        return horarios;
    }
    return horarioRepository.criarHorario(dados);
}

async function deletarHorario(profissional_login, dados) {
    return horarioRepository.deletarHorario(profissional_login, dados);
}

async function checarValidadeTempo(string) {
    const tempo = string.split(":");
    if(tempo.length != 2){
        throw new Error("Formato Inválido", {cause: "Formato Inválido"});
    }
    const horas = Number(tempo[0]);
    const minutos = Number(tempo[1]);
    if(!Number.isFinite(horas) || !Number.isFinite(minutos) || horas < 7 || horas > 23 || (minutos != 30 && minutos != 0)){
        throw new Error("Formato Inválido", {cause: "Formato Inválido"});
    }
    return [horas,minutos];
}

async function checarValidadeData(horario_data, horario_hora){
    const hoje = new Date();
    const data = horario_data.split("/");
    if(hoje.getFullYear() < data[0]) throw new Error("Data inválida", {cause: "Ano não pode ser menor que o atual"});
}

module.exports = {
    listarHorariosSemana,
    buscarHorario,
    criarHorario,
    deletarHorario,
};
