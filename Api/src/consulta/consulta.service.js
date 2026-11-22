const consultaRepository = require("./consulta.repository");
const buscarProfissional = require("../auth/auth.repository").buscarLogin;

async function listarConsultas(dados) {
    if(Object.hasOwn(dados, "paciente_id")){
        if(Object.hasOwn(dados, "profissional_login")) return consultaRepository.listarConsultasDentistaPaciente(dados.profissional_login, dados.paciente_id); 
        return consultaRepository.listarConsultasPaciente(dados.paciente_id);
    }
    return consultaRepository.listarConsultasDentista(dados.profissional_login);
}

async function buscarConsulta(id) {
    return consultaRepository.buscarConsulta(profissional_login, dados);
}

async function criarConsulta(dados) {
    return consultaRepository.criarConsulta(dados.body);
}

async function atualizarConsulta(consulta_id, perm, user, dados) {
    if(await Object.hasOwn(dados, "consulta_id")) delete dados.consulta_id;
    const verify = await consultaRepository.verificarParticipacaoDentista(consulta_id,user);
    if(perm != 'SECRETARIO' && !verify) throw new Error("Permissão Inválida", {cause: "Dentista não pode alterar consulta em que não participa"});
    return consultaRepository.atualizarConsulta(consulta_id,dados);
}

async function deletarConsulta(id, perm, user) {
    const verify = await consultaRepository.verificarParticipacaoDentista(id,user);
    if(perm != 'SECRETARIO' && await !verify) throw new Error("Permissão Inválida", {cause: "Dentista não pode deletar consulta em que não participa"});
    return consultaRepository.deletarConsulta(id);
}

async function adicionarDentistaConsulta(profissional_login, consulta_id) {
    const profissional = await buscarProfissional(profissional_login);
    console.log(profissional);
    console.log(profissional_login);
    if(!profissional) throw new Error ("Profissional Não encontrado", {cause: "Não foi possível achar o profissional deste login"});
    if(profissional.tipo_profissional != "DENTISTA") throw new Error("Profissional Inválido", {cause: "Apenas dentistas podem participar de consultas"});
    return consultaRepository.criarProfissionalConsulta({
        profissional_login: profissional_login,
        consulta_id: consulta_id,
    });
}

async function removerDentistaConsulta(profissional_login, consulta_id) {
    return consultaRepository.deletarProfissionalConsulta(profissional_login, consulta_id);
}

async function contarConsultasHoje() {
    return consultaRepository.contarConsultasHoje();
}

module.exports = {
    listarConsultas,
    buscarConsulta,
    criarConsulta,
    atualizarConsulta,
    deletarConsulta,
    adicionarDentistaConsulta,
    removerDentistaConsulta,
    contarConsultasHoje
};
