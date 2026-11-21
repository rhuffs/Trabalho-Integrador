import api from "./api";

export async function listarProcedimentos(){
    const resposta = await api.get("/Procedimentos");

    return resposta.data;
}