import api from "./api";

export async function cadastrarConsulta(dados) {
    const payload = Object.fromEntries(
        Object.entries(dados).filter(([_, valor]) => valor !== null && valor !== undefined)
    );
    const resposta = await api.post("/consulta", payload);
    return resposta.data;
}

export async function listarConsultasSemana(dia, profissional_login) {
    const resposta = await api.get("/consulta/paciente", {
        params: { dia, profissional_login }
    });
    return resposta.data;
}

export async function atualizarConsulta(id, dados) {
    const resposta = await api.patch(`/consulta/${id}`, dados);
    return resposta.data;
}

export async function deletarConsulta(id) {
    const resposta = await api.delete(`/consulta/${id}`);
    return resposta.data;
}