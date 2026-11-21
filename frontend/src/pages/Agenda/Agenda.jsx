import { useState, useEffect } from "react";
import "./Agenda.css";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { VerificaPermissao } from "../Login/Login";
import { listarDentistas } from "../../services/authService";
import { listarPacientes } from "../../services/pacientesService";
import { listarProcedimentos } from "../../services/procedimentosService";
import { cadastrarConsulta } from "../../services/consultaService";

function getProcedimentoId(procedimento) {
    return procedimento.procedimento_id;
}

function getPacienteId(paciente) {
    return paciente.id;
}

function getDentistaLogin(dentista){
    return dentista.profissional_login;
}

export default function Agenda(){
    const [categoria, setCategoria] = useState(0);
    const [dentistas, setDentistas] = useState(null);
    const [pacientes, setPacientes] = useState(null);
    const [procedimentos, setProcedimentos] = useState(null);
    const [dentistaConsultas, setDentistaConsultas] = useState(0);
    const [procedimentoRegistro, setProcedimentoRegistro] = useState(null);
    const [pacienteRegistro, setPacienteRegistro] = useState(null);
    const [dentistaRegistro, setDentistaRegistro] = useState(null);
    const [valorRegistro, setValorRegistro] = useState("");
    const [dataRegistro, setDataRegistro] = useState("");
    const [inicioRegistro, setInicioRegistro] = useState("");
    const [fimRegistro, setFimRegistro] = useState("");
    const [descRegistro, setDescRegistro] = useState("");
    const [openRegistrar, setOpenRegistrar] = useState(false);
    const [carregando, setCarregando] = useState(false);

  const handleClickOpenRegistrar = () => {
    const botao = document.activeElement;
    botao.blur();
    setOpenRegistrar(true);
  };

  const handleCloseRegistrar = () => {
    setPacienteRegistro(null);
    setProcedimentoRegistro(null);
    setDentistaRegistro(null);
    setValorRegistro("");
    setDescRegistro("");
    setDataRegistro("");
    setInicioRegistro("");
    setFimRegistro("");
    setOpenRegistrar(false);
  };

  const handleSubmit = (event) => {
    try{
        setCarregando(true);
        const dados = {
            paciente_id: pacienteRegistro,
            procedimento_id: procedimentoRegistro,
            profissional_login: dentistaRegistro,
            consulta_valor: valorRegistro,
            consulta_desc: descRegistro,
            horario_data: dataRegistro,
            horario_hora: inicioRegistro,
            horario_fim: fimRegistro,
        }
        console.log(dados);
        cadastrarConsulta(dados);
    }
    catch(error){
        console.error("Erro ao cadastrar consulta:", erro);
        alert(erro.response?.data?.erro || "Erro ao cadastrar consulta.");
    } finally {
        setCarregando(false);
        handleCloseRegistrar();
    }
  };

    useEffect(() => {
        async function buscarTodosDentistas() {
            try{
                if(VerificaPermissao("SECRETARIO")){
                    const response = await listarDentistas();
                    let i = 0;
                    for(let x of response){
                        x.id = i;
                        x.label = x.nome;
                        i++; 
                    }
                    setDentistas(response);
                }
                else{
                    setDentistas(null);
                }
            }
            catch (error) {
                console.log(error);
                setDentistas(null);
                // COLOCAR UM ALERT AQUI
            }
        }

        async function buscarTodosPacientes() {
            try{
                const response = await listarPacientes();
                for(let x of response){
                    x.label = x.nome + " (" + x.cpf + ")";
                }
                setPacientes(response);
            }
            catch (error) {
                console.log(error);
                setPacientes(null);
                // COLOCAR UM ALERT AQUI
            }
        }

        async function buscarTodosProcedimentos() {
            try{
                const response = await listarProcedimentos();
                for(let x of response){
                    x.label = x.procedimento_nome;
                }
                setProcedimentos(response);
            }
            catch (error) {
                console.log(error);
                setProcedimentos(null);
                // COLOCAR UM ALERT AQUI
            }
        }

        buscarTodosDentistas();
        buscarTodosPacientes();
        buscarTodosProcedimentos();
    },
    [

    ]);

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    };

    const handleChangeDentistaConsultas = (event) => {
        setDentistaConsultas(event.target.value);
    };

    return (
        <Stack className="pagina-agenda">
            <Header/>
            <h1>Agenda</h1>
            <Dialog open={openRegistrar} onClose={handleCloseRegistrar}>
                <DialogTitle>Registrar Consulta</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Preencha os dados da consulta abaixo:
                </DialogContentText>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <Autocomplete
                        disablePortal
                        options={pacientes}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Paciente" />}
                        name="paciente_id"
                        getOptionValue={getPacienteId}
                        value={pacienteRegistro}
                        onChange={(_event, newValue) => {
                            setPacienteRegistro(newValue);
                        }}
                        />
                        <Autocomplete
                        disablePortal
                        options={procedimentos}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Procedimento" />}
                        name="procedimento_id"
                        getOptionValue={getProcedimentoId}
                        value={procedimentoRegistro}
                        onChange={(_event, newValue) => {
                            setProcedimentoRegistro(newValue);
                        }}
                        />
                    </div>
                    <div>
                        { VerificaPermissao("SECRETARIO") && <Autocomplete
                        disablePortal
                        options={dentistas}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Dentista" />}
                        getOptionValue={getDentistaLogin}
                        value={dentistaRegistro}
                        onChange={(_event, newValue) => {
                            setDentistaRegistro(newValue);
                        }}
                        />}
                        <TextField 
                        value={valorRegistro}
                        onChange={(event) => {
                            setValorRegistro(event.target.value);
                        }}
                        label="Valor"
                        />
                    </div>
                    <div> 
                        <TextField 
                        value={dataRegistro}
                        onChange={(event) => {
                            setDataRegistro(event.target.value);
                        }}
                        label="Data da Consulta"
                        />
                    </div>
                    <div> 
                        <TextField 
                        value={inicioRegistro}
                        onChange={(event) => {
                            setInicioRegistro(event.target.value);
                        }}
                        label="Inicio da Consulta"
                        />
                        <TextField 
                        value={fimRegistro}
                        onChange={(event) => {
                            setFimRegistro(event.target.value);
                        }}
                        label="Fim da Consulta"
                        />
                    </div>
                    <div> 
                        <TextField 
                        value={descRegistro}
                        onChange={(event) => {
                            setDescRegistro(event.target.value);
                        }}
                        multiline
                        label="Descrição da Consulta"
                        />
                    </div>
                </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseRegistrar}>Cancelar</Button>
                <Button onClick={handleSubmit}>
                    {carregando ? "Registrando..." : "Registrar"}
                </Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={9} sx={{justifyContent: "space-between",}}>
                <Grid size={1}></Grid>
                <Grid size="grow">
                    <Button variant="contained" onClick={handleClickOpenRegistrar}>Registrar Consulta</Button>
                </Grid>
                <Grid size="grow">
                    { dentistas && <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dentistaConsultas}
                        label="Dentista"
                        onChange={handleChangeDentistaConsultas}
                    >
                            {dentistas.map((row) => (
                                <MenuItem value={row.id}> {row.nome} </MenuItem>
                            ))}
                    </Select>}
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoria}
                        label="Categoria"
                        onChange={handleChangeCategoria}
                    >
                            <MenuItem value={0}>Paciente</MenuItem>
                            <MenuItem value={10}>Procedimento</MenuItem>
                    </Select>
                </Grid>
                <Grid size={1}></Grid>            
            </Grid>
        </Stack>
    );
}
