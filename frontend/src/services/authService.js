import axios from "axios";
import api from "./api";

export async function login(username, password) {
    const resposta = await axios.post(
        "http://localhost:3001/login",
        {
            username,
            password
        }
    );

    return resposta.data;
}

export async function listarDentistas() {
    const resposta = await api.get("/listarDentistas");
    return resposta.data;
}

export async function listarProfissionais() {
    const resposta = await api.get("/listarUsuarios");
    return resposta.data;
}

export async function cadastrarProfissional(dados) {
    const resposta = await api.post("/novoUsuario", dados);
    return resposta.data;
}

export async function deletarProfissional(profissional_login) {
    const resposta = await api.delete("/deletarUsuario", {
        data: { profissional_login }
    });

    return resposta.data;
}