
import { useState, useEffect, useMemo, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Header from "../../components/Header";
import Receber from "./Receber";
import FinPesquisa from "./FinPesquisa";
import ListaContas from "./ListaContas";
import {listarDevedores,RegistarPagamentos} from "../../services/financeiroService";
import "./Financeiro.css";

export default function Financeiro() {

    const [contas, setContas] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
    const [valorPagamento, setValorPagamento] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [erroPagamento, setErroPagamento] = useState("");

    const carregarContas = useCallback(async () => {
        try {
            setCarregando(true);
            setErro("");

            const dados = await listarDevedores();

            if (!Array.isArray(dados)) {
                throw new Error("A API não retornou uma lista.");
            }

            setContas([...dados]);

        } catch (error) {
            console.error("Erro ao carregar contas:", error);
            setErro("Não foi possível carregar as contas.");

        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregarContas();
    }, [carregarContas]);

    // Calcular totais
    const totais = useMemo(() => {
        const saldosPorPaciente = {};
        let recebido = 0;

        contas.forEach((conta) => {
            const id = conta.paciente_id;
            saldosPorPaciente[id] =(saldosPorPaciente[id] || 0) + Number(conta.financeiro_saldo || 0);
            recebido += Number(conta.financeiro_pago || 0);
        });
        const aReceber = Object.values(saldosPorPaciente).reduce((total, saldo) => total + Math.max(saldo, 0),0);

        return {aReceber,recebido};

    }, [contas]);

  
    function selecionarPaciente(paciente) {
        setPacienteSelecionado(paciente);
        setValorPagamento("");
        setErroPagamento("");
    }


    function fecharPagamento() {
        if (salvando) return;

        setPacienteSelecionado(null);
        setValorPagamento("");
        setErroPagamento("");
    }

    async function confirmarPagamento() {
        const valor = Number(valorPagamento);

        if (!valorPagamento || !Number.isFinite(valor) || valor <= 0) {
            setErroPagamento("Informe um valor válido.");
            return;
        }

        if (valor > pacienteSelecionado.saldo + 0.005) {
            setErroPagamento("O pagamento não pode ser maior que a dívida.");
            return;
        }

        try {
            setSalvando(true);
            setErroPagamento("");
            await RegistarPagamentos({
                paciente_id: pacienteSelecionado.paciente_id,
                valor
            });
            setPacienteSelecionado(null);
            setValorPagamento("");
            await carregarContas();

        } catch (error) {
            console.error("Erro ao registrar pagamento:", error);
            setErroPagamento(
                error.response?.data?.message ||
                "Não foi possível registrar o pagamento."
            );

        } finally {
            setSalvando(false);
        }
    }

    return (
        <Stack className="pagina-financeiro">

            <Header />

            <Stack
                className="financeiro-container"
                spacing={3}
                sx={{
                    width: "90%",
                    maxWidth: 1200,
                    mx: "auto",
                    my: 4
                }}
            >

                <Typography variant="h4">
                    Contas a Receber
                </Typography>

                <Receber
                    totalReceber={totais.aReceber}
                    totalRecebido={totais.recebido}
                />

                <FinPesquisa
                    pesquisa={pesquisa}
                    setPesquisa={setPesquisa}
                />

                <ListaContas
                    contas={contas}
                    pesquisa={pesquisa}
                    carregando={carregando}
                    erro={erro}
                    aoSelecionarPaciente={selecionarPaciente}
                />

            </Stack>

            {/* Janela de pagamento */}
            <Dialog
                open={Boolean(pacienteSelecionado)}
                onClose={fecharPagamento}
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle>
                    Registrar pagamento
                </DialogTitle>

                <DialogContent>

                    {pacienteSelecionado && (
                        <Stack spacing={2} sx={{ mt: 1 }}>

                            <Typography>
                                Paciente: <strong>
                                    {pacienteSelecionado.nomePaciente}
                                </strong>
                            </Typography>

                            <Typography>
                                Saldo devedor: <strong>
                                    R$ {pacienteSelecionado.saldo.toFixed(2)}
                                </strong>
                            </Typography>

                            <TextField
                                label="Valor do pagamento"
                                type="number"
                                fullWidth
                                value={valorPagamento}
                                onChange={(e) => setValorPagamento(e.target.value)}
                                inputProps={{
                                    min: 0.01,
                                    max: pacienteSelecionado.saldo,
                                    step: "0.01"
                                }}
                            />

                            {erroPagamento && (
                                <Typography color="error">
                                    {erroPagamento}
                                </Typography>
                            )}

                        </Stack>
                    )}

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={fecharPagamento}
                        disabled={salvando}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={confirmarPagamento}
                        disabled={salvando}
                    >
                        {salvando ? "Registrando..." : "Confirmar pagamento"}
                    </Button>

                </DialogActions>

            </Dialog>

        </Stack>
    );
}
