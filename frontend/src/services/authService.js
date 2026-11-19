import axios from "axios";

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