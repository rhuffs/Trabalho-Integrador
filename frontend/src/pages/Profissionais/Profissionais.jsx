
import { useState, useEffect } from "react";
import "./Profissionais.css";
import Header from "../../components/Header";

import {
    listarProfissionais,
    cadastrarProfissional,
    deletarProfissional
} from "../../services/authService";

import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

export default function Profissionais() {
    const [profissionais, setProfissionais] = useState([]);
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");
    const [tipo, setTipo] = useState("DENTISTA");
    const [pesquisa, setPesquisa] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(false);

    async function carregarProfissionais() {
        try {
            const dados = await listarProfissionais();
            setProfissionais(dados);
        } catch (error) {
            console.log(error);
            setMensagem("Erro ao carregar profissionais.");
            setErro(true);
        }
    }

    useEffect(() => {
        carregarProfissionais();
    }, []);

    async function cadastrar() {
        try {
            const dados = {
                username: username,
                passwd: passwd,
                nome: nome,
                telefone: telefone,
                tipo_profissional: tipo
            };

            await cadastrarProfissional(dados);
            setNome("");
            setTelefone("");
            setUsername("");
            setPasswd("");
            setTipo("DENTISTA");
            setMensagem("Profissional cadastrado com sucesso!");
            setErro(false);
            carregarProfissionais();
        } catch (error) {
            console.log(error);
            setMensagem("Erro ao cadastrar profissional.");
            setErro(true);
        }
    }
    async function excluir(login) {
        const confirmar = window.confirm("Deseja excluir este profissional?");

        if (confirmar) {
            try {
                await deletarProfissional(login);
                setMensagem("Profissional excluído com sucesso!");
                setErro(false);
                carregarProfissionais();
            } catch (error) {
                console.log(error);
                setMensagem("Erro ao excluir profissional.");
                setErro(true);
            }
        }
    }

    let profissionaisFiltrados = [];

    for (let profissional of profissionais) {
        if (
            profissional.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
            profissional.profissional_login.toLowerCase().includes(pesquisa.toLowerCase())
        ) {
            profissionaisFiltrados.push(profissional);
        }
    }

    return (
        <Stack className="pagina-profissionais">
            <Header />

            <Box sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Profissionais
                </Typography>

                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Cadastrar profissional
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        <TextField
                            label="Nome completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <TextField
                            label="Telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />

                        <TextField
                            label="Login"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <TextField
                            label="Senha"
                            type="password"
                            value={passwd}
                            onChange={(e) => setPasswd(e.target.value)}
                        />

                        <FormControl sx={{ minWidth: 160 }}>
                            <InputLabel>Tipo</InputLabel>

                            <Select
                                value={tipo}
                                label="Tipo"
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <MenuItem value="DENTISTA">Dentista</MenuItem>
                                <MenuItem value="SECRETARIO">Secretário</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            onClick={cadastrar}
                            disabled={!nome || !telefone || !username || !passwd}
                        >
                            Cadastrar
                        </Button>
                    </Box>
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Profissionais cadastrados
                    </Typography>

                    <TextField
                        fullWidth
                        label="Pesquisar por nome ou login"
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Login</TableCell>
                                    <TableCell>Telefone</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell align="center">Ações</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {profissionaisFiltrados.map((profissional) => (
                                    <TableRow key={profissional.profissional_login}>
                                        <TableCell>{profissional.nome}</TableCell>
                                        <TableCell>{profissional.profissional_login}</TableCell>
                                        <TableCell>{profissional.telefone}</TableCell>
                                        <TableCell>{profissional.tipo_profissional}</TableCell>

                                        <TableCell align="center">
                                            <Button
                                                color="error"
                                                onClick={() => excluir(profissional.profissional_login)}
                                            >
                                                Excluir
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {profissionaisFiltrados.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            Nenhum profissional encontrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            <Snackbar
                open={mensagem !== ""}
                autoHideDuration={4000}
                onClose={() => setMensagem("")}
            >
                <Alert
                    severity={erro ? "error" : "success"}
                    onClose={() => setMensagem("")}
                >
                    {mensagem}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
