
import { useState } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import CadastroPaciente from "./CadastroPaciente";

export default function PesquisaPacientes({ pesquisa, setPesquisa, aoCadastrar }) {

    const [abrirCadastro, setAbrirCadastro] = useState(false);

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
                label="Pesquisar paciente por nome ou CPF"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
            />

            <Button
                variant="contained"
                onClick={() => setAbrirCadastro(true)}
                sx={{ alignSelf: "flex-start" }}
            >
                Cadastrar paciente
            </Button>

            <CadastroPaciente
                abrir={abrirCadastro}
                fechar={() => setAbrirCadastro(false)}
                aoCadastrar={aoCadastrar}
            />

        </Stack>
    );
}
