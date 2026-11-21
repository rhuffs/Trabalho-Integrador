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