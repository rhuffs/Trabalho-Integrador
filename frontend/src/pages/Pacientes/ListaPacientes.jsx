
import { useEffect, useState } from "react";
import {
    Stack,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress
} from "@mui/material";
import { listarPacientes } from "../../services/pacientesService";
import FichaPaciente from "./FichaPaciente";

export default function ListaPacientes({ pesquisa,atualizacao }) {
    const [pacientes, setPacientes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

    async function carregarPacientes() {
        try {
            setCarregando(true);
            setErro("");
            const resposta = await listarPacientes();
            setPacientes(resposta);
        } catch (erro) {
            console.error("Erro ao listar pacientes:", erro);
            setErro("Não foi possível carregar os pacientes.");
        } finally {
            setCarregando(false);
        }
    }

    function removerPaciente(id) {
        setPacientes((anterior) =>
            anterior.filter((paciente) => paciente.id !== id)
        );
    }

    function atualizarPacienteNaLista(pacienteAtualizado) {
        setPacientes((anterior) =>
            anterior.map((paciente) =>
                paciente.id === pacienteAtualizado.id ? { ...paciente, ...pacienteAtualizado } : paciente
            )
        );
        setPacienteSelecionado((anterior) =>
            anterior ? { ...anterior, ...pacienteAtualizado } : anterior
        );
    }

    useEffect(() => {
        carregarPacientes();
    }, [atualizacao]);

    const pacientesFiltrados = pacientes.filter((paciente) => {
        const nome = paciente.nome.toLowerCase();
        const cpf = paciente.cpf || "";
        const busca = pesquisa.toLowerCase();
        return nome.includes(busca) || cpf.includes(busca);
    });

    return (
        <Stack spacing={2} sx={{ mt: 4 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h5">
                    Pacientes cadastrados
                </Typography>
            </Stack>

            {carregando ? (
                <CircularProgress />
            ) : erro ? (
                <Typography color="error">
                    {erro}
                </Typography>
            ) : pacientesFiltrados.length === 0 ? (
                <Typography color="text.secondary">
                    Nenhum paciente encontrado.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Nome</strong></TableCell>
                                <TableCell><strong>CPF</strong></TableCell>
                                <TableCell><strong>Telefone</strong></TableCell>
                                <TableCell><strong>E-mail</strong></TableCell>
                                <TableCell><strong>Cidade</strong></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {pacientesFiltrados.map((paciente) => (
                                <TableRow
                                    key={paciente.id}
                                    hover
                                    onClick={() => setPacienteSelecionado(paciente)}
                                    sx={{ cursor: "pointer" }}
                                >

                                    <TableCell>
                                        {paciente.nome}
                                    </TableCell>

                                    <TableCell>
                                        {paciente.cpf || "-"}
                                    </TableCell>

                                    <TableCell>
                                        {paciente.telefone}
                                    </TableCell>

                                    <TableCell>
                                        {paciente.email}
                                    </TableCell>

                                    <TableCell>
                                        {paciente.cidade}/{paciente.uf}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            )}

            {pacienteSelecionado && (
                <FichaPaciente
                    paciente={pacienteSelecionado}
                    fechar={() => setPacienteSelecionado(null)}
                    aoExcluir={removerPaciente}
                    aoAtualizar={atualizarPacienteNaLista}
                />
            )}

        </Stack>
    );
}
