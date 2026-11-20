
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Receber({ totalReceber, totalRecebido }) {

    return (
        <Stack
            direction="row"
            spacing={8}
            sx={{
                width: "100%",
                marginTop: 5
            }}
        >
            <Stack
                sx={{
                    flex: 1,
                    border: "1px solid black",
                    borderRadius: 2,
                    padding: 3,
                    backgroundColor: "white"
                }}
            >
                <Typography>A receber</Typography>
                <Typography variant="h2" sx={{ color: "black" }}>
                    R$ {Number(totalReceber || 0).toFixed(2)}
                </Typography>
            </Stack>

            <Stack
                sx={{
                    flex: 1,
                    border: "1px solid black",
                    borderRadius: 2,
                    padding: 3,
                    backgroundColor: "white"
                }}
            >
                <Typography>Total recebido</Typography>

                <Typography variant="h2" sx={{ color: "green" }}>
                    R$ {Number(totalRecebido || 0).toFixed(2)}
                </Typography>
            </Stack>

        </Stack>
    );
}
