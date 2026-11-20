import { useState, useEffect } from "react";
import "./Agenda.css";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";


export default function Agenda(){

    return (
        <Stack className="pagina-agenda">
            <Header/>
            <h1>Agenda</h1>
        </Stack>
    );
}
