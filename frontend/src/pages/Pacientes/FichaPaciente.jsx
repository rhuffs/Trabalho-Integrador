import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    Divider,
    Grid,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    CircularProgress,
    TextField
} from "@mui/material";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import {
    listarConsultasPaciente,
    atualizarPaciente,
    deletarPaciente
} from "../../services/pacientesService";

export default function FichaPaciente({ paciente, fechar, aoExcluir, aoAtualizar }) {

    const [consultas, setConsultas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [editando, setEditando] = useState(false);
    const [dados, setDados] = useState({});
    const [salvando, setSalvando] = useState(false);
    const [erroAcao, setErroAcao] = useState("");

    useEffect(() => {
        if (paciente) {
            setDados({
                nome: paciente.nome || "",
                cpf: paciente.cpf || "",
                rg: paciente.rg || "",
                telefone: paciente.telefone || "",
                email: paciente.email || "",
                endereco: paciente.endereco || "",
                cidade: paciente.cidade || "",
                uf: paciente.uf || "",
                data_nascimento: paciente.data_nascimento || ""
            });

            setEditando(false);
            setErroAcao("");
        }
    }, [paciente]);

    useEffect(() => {

        async function carregarConsultas() {
            try {
                setCarregando(true);
                setErro("");

                const resposta = await listarConsultasPaciente(paciente.id);
                setConsultas(resposta);
            } catch (erro) {
                console.error("Erro ao carregar histórico:", erro);
                setErro("Não foi possível carregar o histórico de consultas.");
            } finally {
                setCarregando(false);
            }
        }

        if (paciente?.id) {
            carregarConsultas();
        }

    }, [paciente?.id]);

    function alterarCampo(campo, valor) {
        setDados((anterior) => ({
            ...anterior,
            [campo]: valor
        }));
    }

    async function salvarAlteracoes() {
        try {
            setSalvando(true);
            setErroAcao("");

            const pacienteAtualizado = await atualizarPaciente(paciente.id, dados);

            if (aoAtualizar) {
                aoAtualizar(pacienteAtualizado);
            }

            setEditando(false);

        } catch (erro) {
            console.error("Erro ao atualizar paciente:", erro);
            setErroAcao("Não foi possível atualizar o paciente.");
        } finally {
            setSalvando(false);
        }
    }

    async function excluirPaciente() {
        if (!window.confirm("Tem certeza de que deseja excluir este paciente?")) {
            return;
        }

        try {
            setSalvando(true);
            setErroAcao("");

            await deletarPaciente(paciente.id);

            if (aoExcluir) {
                aoExcluir(paciente.id);
            }

            fechar();

        } catch (erro) {
            console.error("Erro ao excluir paciente:", erro);
            setErroAcao(
                "Não foi possível excluir o paciente. Verifique se existem registros vinculados."
            );
        } finally {
            setSalvando(false);
        }
    }

    function campoPessoal(campo, titulo, valor, tamanho = 6) {
        return (
            <Grid size={{ xs: 12, sm: tamanho }}>
                <Typography color="text.secondary" variant="body2">
                    {titulo}
                </Typography>

                {editando ? (
                    <TextField
                        fullWidth
                        size="small"
                        value={dados[campo] || ""}
                        onChange={(e) => alterarCampo(campo, e.target.value)}
                    />
                ) : (
                    <Typography>
                        {valor || "-"}
                    </Typography>
                )}
            </Grid>
        );
    }

    return (
        <Dialog
            open={Boolean(paciente)}
            onClose={fechar}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                Ficha do paciente
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3} sx={{ mt: 1 }}>

                    <Typography variant="h5">
                        {editando ? dados.nome : paciente.nome}
                    </Typography>

                    <Divider />

                    <Typography variant="h6">
                        Dados pessoais
                    </Typography>

                    <Grid container spacing={2}>

                        {campoPessoal("nome", "Nome", paciente.nome, 12)}
                        {campoPessoal("cpf", "CPF", paciente.cpf)}
                        {campoPessoal("rg", "RG", paciente.rg)}
                        {campoPessoal("telefone", "Telefone", paciente.telefone)}
                        {campoPessoal("email", "E-mail", paciente.email)}
                        {campoPessoal("endereco", "Endereço", paciente.endereco, 12)}
                        {campoPessoal(
                            "cidade",
                            "Cidade",
                            `${paciente.cidade || "-"} / ${paciente.uf || "-"}`,
                        )}
                        {campoPessoal(
                            "data_nascimento",
                            "Data de nascimento",
                            paciente.data_nascimento
                        )}

                        {editando && (
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography color="text.secondary" variant="body2">
                                    UF
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={dados.uf}
                                    onChange={(e) => alterarCampo("uf", e.target.value)}
                                />
                            </Grid>
                        )}

                    </Grid>

                    <Divider />

                    <Typography variant="h6">
                        Histórico de consultas
                    </Typography>

                    {carregando ? (

                        <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
                            <CircularProgress />
                            <Typography color="text.secondary">
                                Carregando histórico...
                            </Typography>
                        </Stack>

                    ) : erro ? (

                        <Typography color="error">
                            {erro}
                        </Typography>

                    ) : consultas.length === 0 ? (

                        <Paper
                            variant="outlined"
                            sx={{ p: 4, textAlign: "center" }}
                        >
                            <CalendarMonthOutlined
                                sx={{
                                    fontSize: 48,
                                    color: "text.secondary",
                                    mb: 1
                                }}
                            />

                            <Typography variant="h6">
                                Nenhuma consulta encontrada
                            </Typography>

                            <Typography color="text.secondary">
                                Este paciente ainda não possui consultas registradas.
                            </Typography>
                        </Paper>

                    ) : (

                        <TableContainer component={Paper} variant="outlined">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Consulta</strong></TableCell>
                                        <TableCell><strong>Descrição</strong></TableCell>
                                        <TableCell align="right"><strong>Valor</strong></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {consultas.map((consulta) => (
                                        <TableRow key={consulta.consulta_id} hover>
                                            <TableCell>
                                                #{consulta.consulta_id}
                                            </TableCell>

                                            <TableCell>
                                                {consulta.consulta_desc || "-"}
                                            </TableCell>

                                            <TableCell align="right">
                                                R$ {Number(consulta.consulta_valor).toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    )}

                </Stack>
            </DialogContent>

            {erroAcao && (
                <Typography color="error" sx={{ px: 3 }}>
                    {erroAcao}
                </Typography>
            )}

            <DialogActions>
                <Button
                    color="error"
                    onClick={excluirPaciente}
                    disabled={salvando}
                >
                    Excluir paciente
                </Button>

                {editando ? (
                    <>
                        <Button
                            onClick={() => setEditando(false)}
                            disabled={salvando}
                        >
                            Cancelar edição
                        </Button>

                        <Button
                            variant="contained"
                            onClick={salvarAlteracoes}
                            disabled={salvando}
                        >
                            {salvando ? "Salvando..." : "Salvar alterações"}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="outlined"
                            onClick={() => setEditando(true)}
                        >
                            Editar dados
                        </Button>

                        <Button onClick={fechar}>
                            Fechar
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}
