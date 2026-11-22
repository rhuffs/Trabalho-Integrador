
import { useMemo } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";

function decimal(valor) {
    return Number(valor).toFixed(2);
}

function normalizarTexto(texto) {
    return String(texto ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export default function ListaContas({
    contas = [],
    pesquisa = "",
    carregando,
    erro,
    aoSelecionarPaciente
}) {

    const devedores = useMemo(() => {
        const agrupados = {};

        contas.forEach((conta) => {
            console.log("Dados da conta:", conta);
            const id = conta.paciente_id;
            const dataMovimentacao = conta.data_movimentacao
                ? new Date(conta.data_movimentacao)
                : null;

            if (!agrupados[id]) {
                agrupados[id] = {
                    paciente_id: id,
                    nomePaciente: conta.Paciente?.nome || `Paciente #${id}`,
                    pago: 0,
                    saldo: 0,
                    ultimaMovimentacao: null
                };
            }

            const paciente = agrupados[id];

            paciente.pago += Number(conta.financeiro_pago || 0);
            paciente.saldo += Number(conta.financeiro_saldo || 0);

            if (dataMovimentacao && !Number.isNaN(dataMovimentacao.getTime()) &&(!paciente.ultimaMovimentacao || dataMovimentacao > paciente.ultimaMovimentacao)
            ) {
                paciente.ultimaMovimentacao = dataMovimentacao;
                paciente.nomePaciente = conta.Paciente?.nome || paciente.nomePaciente;;
            }
        });
        return Object.values(agrupados)
            .filter((paciente) => paciente.saldo > 0.005)
            .sort((a, b) =>
                (b.ultimaMovimentacao?.getTime() || 0) -
                (a.ultimaMovimentacao?.getTime() || 0)
            );

    }, [contas]);
    const contasFiltradas = useMemo(() => {
        const termo = normalizarTexto(pesquisa);
        return devedores.filter((paciente) => {
            const nome = normalizarTexto(paciente.nomePaciente);
        
            return (nome.includes(termo) || String(paciente.paciente_id).includes(termo));
        });

    }, [devedores, pesquisa]);

    if (carregando) {
        return (
            <Stack sx={{ alignItems: "center", mt: 4 }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>
                    Carregando devedores...
                </Typography>
            </Stack>
        );
    }

    if (erro) {
        return (
            <Typography color="error">
                {erro}
            </Typography>
        );
    }

    return (
        <Stack spacing={2} sx={{ width: "100%", mt: 3 }}>

            <Typography variant="h5">
                Pacientes com débitos
            </Typography>

            <TableContainer component={Paper} variant="outlined">
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Paciente</TableCell>
                            <TableCell>Total pago</TableCell>
                            <TableCell>Valor em aberto</TableCell>
                            <TableCell>Última movimentação</TableCell>
                            <TableCell>Situação</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {contasFiltradas.map((paciente) => (
                            <TableRow
                                key={paciente.paciente_id}
                                hover
                            >
                                <TableCell>
                                    <Button
                                        variant="text"
                                        onClick={() =>
                                            aoSelecionarPaciente(paciente)
                                        }
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {paciente.nomePaciente}
                                    </Button>
                                </TableCell>

                                <TableCell>
                                    R$ {decimal(paciente.pago)}
                                </TableCell>

                                <TableCell>
                                    <Typography
                                        fontWeight="bold"
                                        color="error"
                                    >
                                        R$ {decimal(
                                            Math.max(paciente.saldo, 0)
                                        )}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    {paciente.ultimaMovimentacao
                                        ? paciente.ultimaMovimentacao.toLocaleDateString("pt-BR")
                                        : "Não informado"}
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label="Pendente"
                                        color="warning"
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {contasFiltradas.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Nenhum paciente com débitos encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
        </Stack>
    );
}
