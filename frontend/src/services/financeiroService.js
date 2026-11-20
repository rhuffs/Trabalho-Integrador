import api from "./api";

export async function listarDevedores() {
    const resposta = await api.get("/financeiro");

    return resposta.data;
}

export async function getValorDebitos() {
    const devedores = await listarDevedores();

    const saldosPorPaciente = devedores.reduce((acumulado, conta) => {
        const id = conta.paciente_id;
        acumulado[id] = (acumulado[id] || 0) + Number(conta.financeiro_saldo || 0);
        return acumulado;
    }, {});

    return Object.values(saldosPorPaciente).reduce((total, saldo) => {
        return total + Math.max(saldo, 0);
    }, 0);
}

export async function getTotalRecebido() {
    const devedores = await listarDevedores();

    return devedores.reduce((total, conta) => {
        return total + Number(conta.financeiro_pago || 0);
    }, 0);
}

export async function RegistarPagamentos({paciente_id,valor}) {
    const resposta = await api.post(
        "/financeiro/credito",
        {
            paciente_id,
            valor
        }
    );

    return resposta.data;
}
