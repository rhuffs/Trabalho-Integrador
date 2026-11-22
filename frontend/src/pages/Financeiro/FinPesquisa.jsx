import { useState } from "react";
import Stack from "@mui/material/Stack";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";


export default function FinPesquisa({ pesquisa, setPesquisa }) {

    const [abrirPagamento, setAbrirPagamento] = useState(false);

    return (
        <Stack
            direction="column"
            spacing={3}
            sx={{
                width: "100%",
                mt: 4
            }}
        >
            <TextField
                fullWidth
                label="Pesquisar paciente"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
            />
            <Dialog
                open={abrirPagamento}
                onClose={() => setAbrirPagamento(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Registrar pagamento</DialogTitle>

                <DialogContent>
                    <p>Formulário de registro de pagamento.</p>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setAbrirPagamento(false)}>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>

        </Stack>
    );
}