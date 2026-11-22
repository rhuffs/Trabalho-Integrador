import { useMemo } from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
import { Stack, Typography, Paper } from "@mui/material";


export default function GraficosDashboard({
    totalReceber,
    totalRecebido,
    receitasPorMes
}) {

    const dadosSituacao = [
        {
            nome: "Recebido no mês",
            valor: Number(totalRecebido || 0),
            fill: "green"
        },
        {
            nome: "A receber",
            valor: Number(totalReceber || 0),
            fill: "orange"
        }
    ];

    const dadosMensais = useMemo(() => {
        const meses = [];
        const hoje = new Date();
        for (let i = 5; i >= 0; i--) {
            const data = new Date(
                hoje.getFullYear(),
                hoje.getMonth() - i,
                1
            );
            const ano = data.getFullYear();
            const mes = String(data.getMonth() + 1).padStart(2, "0");
            const chave = `${ano}-${mes}`;
            const registro = receitasPorMes.find(
                (item) => item.mes.substring(0, 7) === chave
            );
            {/*Trasforma data em texto*/}
            meses.push({
                mes: data.toLocaleDateString("pt-BR", { 
                    month: "short"
                }),
                valor: Number(registro?.total || 0)
            });
        }
        return meses;

    }, [receitasPorMes]);
    
    const decimal = (valor) => {
        return Number(valor).toFixed(2);
    };
    
    return (
        <Stack spacing={3} sx={{ width: "100%" }}>

            {/* Situação financeira */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>

                <Typography variant="h6" sx={{ mb: 2 }}>
                    Situação financeira
                </Typography>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={dadosSituacao}
                            dataKey="valor"
                            nameKey="nome"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                        </Pie>
                        <Tooltip
                            formatter={(valor) => decimal(valor)}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>

            </Paper>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Receitas por mês
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dadosMensais}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip
                            formatter={(valor) => decimal(valor)}
                        />
                        <Legend />
                        <Bar
                            dataKey="valor"
                            name="Recebido"
                            fill="blue"
                        />

                    </BarChart>
                </ResponsiveContainer>

            </Paper>

        </Stack>
    );
}
