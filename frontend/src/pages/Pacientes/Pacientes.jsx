
import { useState } from "react";

import { Stack, Typography } from "@mui/material";

import Header from "../../components/Header";
import PesquisaPacientes from "./PesquisaPacientes.jsx";
import ListaPacientes from "./ListaPacientes.jsx";
import "./Pacientes.css";

export default function Pacientes() {

    const [pesquisa, setPesquisa] = useState("");
    const [atualizacao, setAtualizacao] = useState(0);

    function atualizarLista() {
        setAtualizacao((anterior) => anterior + 1);
    }

    return (
        <Stack className="pagina-paciente">

            <Header />

            <Stack
                className="container-fluid"
                sx={{ width: "90%", maxWidth: 1200, mx: "auto", my: 4 }}
            >

                <Typography variant="h4">
                    Pacientes
                </Typography>

                <PesquisaPacientes
                    pesquisa={pesquisa}
                    setPesquisa={setPesquisa}
                    aoCadastrar={atualizarLista}
                />

                <ListaPacientes
                    pesquisa={pesquisa}
                    atualizacao={atualizacao}
                />

            </Stack>

        </Stack>
    );
}
