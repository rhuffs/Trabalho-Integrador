import api from "./api";

export async function listarPacientes(){
    const resposta = await api.get("/pacientes");

    return resposta.data;
}

export async function cadastrarPaciente(dados, odontograma) {
    const formulario = new FormData();
    Object.entries(dados).forEach(([campo, valor]) => {
        if (valor !== null && valor !== undefined) {
            formulario.append(campo, valor);
        }
    });
    if (odontograma) {
        formulario.append("odontograma", odontograma);
    }
    const resposta = await api.post("/pacientes", formulario);
    return resposta.data;
}

export async function listarConsultasPaciente(paciente_id) {
    const resposta = await api.get("/consulta/paciente", {
        params: { paciente_id }
    });
    return resposta.data;
}

export async function atualizarPaciente(id, dados) {
    const resposta = await api.patch(`/pacientes/${id}`, dados);
    return resposta.data;
}

export async function deletarPaciente(id) {
    const resposta = await api.delete(`/pacientes/${id}`);
    return resposta.data;
}

export async function contarPacientesAtivos() {
    const resposta = await api.get("/pacientes/contar-ativos");

    return resposta.data.total;
}