
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Dashbord({
    totalReceber,
    totalRecebido,
    totalPacientes,
    consultasHoje
}) {

    return (
        <Stack
            direction="column"
            spacing={3}
            sx={{
                width: "100%",
                marginTop: 5
            }}
        >
            <Stack
                direction="row"
                spacing={3}
                sx={{ width: "100%" }}
            >
                <Stack
                    sx={{
                        flex: 1,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        padding: 3,
                        backgroundColor: "white"
                    }}
                >
                    <Typography>Pacientes ativos</Typography>
                    <Typography variant="h3" sx={{ color: "#1976d2" }}>
                        {totalPacientes || 0}
                    </Typography>
                </Stack>

                <Stack
                    sx={{
                        flex: 1,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        padding: 3,
                        backgroundColor: "white"
                    }}
                >
                    <Typography>Consultas hoje</Typography>
                    <Typography variant="h3" sx={{ color: "orange" }}>
                        {consultasHoje || 0}
                    </Typography>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                spacing={3}
                sx={{ width: "100%" }}
            >
                <Stack
                    sx={{
                        flex: 1,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        padding: 3,
                        backgroundColor: "white"
                    }}
                >
                    <Typography>Total a receber</Typography>

                    <Typography variant="h3" sx={{ color: "black" }}>
                        R$ {Number(totalReceber || 0).toFixed(2)}
                    </Typography>
                </Stack>

                <Stack
                    sx={{
                        flex: 1,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        padding: 3,
                        backgroundColor: "white"
                    }}
                >
                    <Typography>Total recebido no mês</Typography>

                    <Typography variant="h3" sx={{ color: "green" }}>
                        R$ {Number(totalRecebido || 0).toFixed(2)}
                    </Typography>
                </Stack>
            </Stack>

        </Stack>
    );
}
