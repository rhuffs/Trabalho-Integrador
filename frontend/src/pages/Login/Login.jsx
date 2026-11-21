import {useState} from "react";
import Stack from '@mui/material/Stack'
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { login } from "../../services/authService";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export function VerificaPermissao(perm) {
    const autoriza = localStorage.getItem("permissoes").split(",");
    for(let x of autoriza){
        if(x == perm) return true;
    }
    return false;
}

export default function Login(){
    
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");


    async function logar() {
        setErro("");

        try {
            const dados = await login(username, password);
            const perms = [];
            for(let x of dados.permissoes){
                perms.push(x.descricao);
            }
            localStorage.setItem("token", dados.token);
            localStorage.setItem("permissoes", perms);
            navigate("/agenda");
        } catch (error) {
            console.log(error);
            setErro("Usuário ou senha incorretos.");
        }
    }

    return (
        <Stack
            sx={{
                minHeight: "100vh",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ddeeff"
            }}
        >
            <Stack
                spacing={2}
                sx={{
                    width: 350,
                    padding: 4,
                    border: "1px solid #ccc",
                    borderColor : "black",
                    borderRadius: 3,
                    backgroundColor: "white",
                    boxShadow: 6
                }}
            >
                <Typography variant="h4" align="center">Login</Typography>
                <OutlinedInput
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nome de usuário"
                    fullWidth
                    sx = {{backgroundColor: "#ddeeff"}}
                />
                <OutlinedInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    fullWidth
                    sx = {{backgroundColor: "#ddeeff"}}
                />
                <Button onClick={logar} sx={{backgroundColor : "#ddeeff"}}>Entrar</Button>
                {erro && (
                    <p>Usuario ou senha incorretos.</p>
                )}
            </Stack>
        </Stack>
    );
}