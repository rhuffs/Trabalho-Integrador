import api from "./api";

export async function cadastrarConsulta(dados) {
    const payload = Object.fromEntries(
        Object.entries(dados).filter(([_, valor]) => valor !== null && valor !== undefined)
    );
    const resposta = await api.post("/consulta", payload);
    return resposta.data;
}

export async function listarConsultasSemana(dados) {
    const payload = Object.fromEntries(
        Object.entries(dados).filter(([_, valor]) => valor !== null && valor !== undefined)
    );
    const resposta = await api.post("/horario/semana", payload);
    return resposta.data;
}

export async function buscarConsulta(id){
    const resposta = await api.post(`/consulta/${id}`, {});
    return resposta.data;
}

export async function atualizarConsulta(id, dados) {
    const payload = Object.fromEntries(
        Object.entries(dados).filter(([_, valor]) => valor !== null && valor !== undefined && valor !== "")
    );
    const resposta = await api.patch(`/consulta/${id}`, payload);
    return resposta.data;
}

export async function deletarConsulta(id) {
    const resposta = await api.delete(`/consulta/${id}`);
    return resposta.data;
}

export async function contarConsultasHoje() {
    const resposta = await api.get("/consulta/contar-hoje");

    return resposta.data.total;
}

export async function gerarDebito(consulta_id,paciente_id,valor) {
    const dados1 = {paciente_id: paciente_id, valor: valor};
    const resposta = await api.post("/financeiro/debito", dados1);
    return resposta.data;
}