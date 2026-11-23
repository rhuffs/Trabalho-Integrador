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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerificaPermissao } from "../Login/Login";
import { listarDentistas } from "../../services/authService";
import { listarPacientes } from "../../services/pacientesService";
import { listarProcedimentos } from "../../services/procedimentosService";
import { cadastrarConsulta, listarConsultasSemana, buscarConsulta, deletarConsulta, atualizarConsulta, gerarDebito } from "../../services/consultaService";

function getProcedimentoId(procedimento) {
    return procedimento.procedimento_id;
}

function getPacienteId(paciente) {
    return paciente.id;
}

function getDentistaLogin(dentista){
    return dentista.profissional_login;
}

function createData(horario, segunda, terca, quarta, quinta, sexta, sabado, domingo) {
  return { horario, segunda, terca, quarta, quinta, sexta, sabado, domingo };
}

function getHoje(){
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth() + 1;
    const dia = hoje.getDate();
    const string = `${ano}/${mes}/${dia}`;
    return string;
}

function getSegunda(dia) {
    const base = dia.replaceAll("/", "-") + "T00:00:00";
    const diaBase = new Date(base);
    if(diaBase.getDay() == 0) return diaBase.getDate() - 6;
    return (diaBase.getDate() - diaBase.getDay() + 1);
}

function createAgenda() {
    const linhas = []
    for(let i = 7; i < 24; i++){
        linhas.push(createData(`${i}:00`, "Vazio", "Vazio", "Vazio", "Vazio", "Vazio", "Vazio", "Vazio"));
        linhas.push(createData(`${i}:30`, "Vazio", "Vazio", "Vazio", "Vazio", "Vazio", "Vazio", "Vazio"));
    }
    return linhas;
}

function getHorarioInicio(horario_inicio){
    const tempo = horario_inicio.split(":");
    return `${tempo[0]}:${tempo[1]}`;
}

function getHorarioFim(horario_fim){
    const tempo = horario_fim.split(":");
    if(tempo[1] == 30){
        tempo[0] = Number(tempo[0]) + 1;
        tempo[1] = "00";
    }
    else tempo[1] = 30;
    return `${tempo[0]}:${tempo[1]}`;
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
    const [attPacienteRegistro, setAttPacienteRegistro] = useState("");
    const [altOdontoRegistro, setAltOdontoRegistro] = useState("");
    const [openRegistrar, setOpenRegistrar] = useState(false);
    const [openConsulta, setOpenConsulta] = useState(false);
    const [consultaAgenda, setConsultaAgenda] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [dia, setDia] = useState(getHoje());
    const [atualizaAgenda, setAtualizaAgenda] = useState(false);
    const [rows, setRows] = useState(createAgenda());
    const [dataEntrada, setDataEntrada] = useState(dia);
  const handleClickOpenRegistrar = () => {
    const botao = document.activeElement;
    botao.blur();
    setOpenRegistrar(true);
  };

  function modifyRow(agenda, diff, linha, consulta_id){
    if(diff == 0) agenda[linha].segunda = consulta_id;
    else if(diff == 1) agenda[linha].terca = consulta_id;
    else if(diff == 2) agenda[linha].quarta = consulta_id;
    else if(diff == 3) agenda[linha].quinta = consulta_id;
    else if(diff == 4) agenda[linha].sexta = consulta_id;
    else if(diff == 5) agenda[linha].sabado = consulta_id;
    else agenda[linha].domingo = consulta_id;
}

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

  const verificarData = (string) => {
    const numeros = string.split("/");
    if(isNaN(numeros[0]) || isNaN(numeros[1]) || isNaN(numeros[2])) throw new Error("Formato Inválido");
    if( Number(numeros[1]) > 12 || Number(numeros[2]) > 31) throw new Error("Mês ou Ano acima do possível");
    if( Number(numeros[0]) < 0 || Number(numeros[1]) < 0 || Number(numeros[2]) < 0 ) throw new Error("Números negativos");
    return numeros[0] + "/" + numeros[1] + "/" + numeros[2];
  }

  const Atualiza = () => {
    setAtualizaAgenda(!atualizaAgenda);
  }

  const getLabelAgenda = (categoria, horario) => {
    if(categoria == 0){
        return `${horario.Consulta.Paciente.nome} | ${horario.horario_consulta}`;
    }
    else{
        return `${horario.Consulta.Procedimento.procedimento_nome} | ${horario.horario_consulta}`;
    }
  }

  async function handleSubmit() {
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
        await cadastrarConsulta(dados);
        Atualiza();
    }
    catch(error){
        console.error("Erro ao cadastrar consulta:", erro);
        alert(error.response?.data?.error || "Erro ao cadastrar consulta.");
    } finally {
        setCarregando(false);
        handleCloseRegistrar();
    }
    Atualiza();
  };

  async function handleSubmitAtualiza() {
    try{
        setCarregando(true);
        const dados = {
            paciente_id: pacienteRegistro,
            procedimento_id: procedimentoRegistro,
            consulta_valor: valorRegistro,
            consulta_desc: descRegistro,
            consulta_alt_odonto: altOdontoRegistro,
            consulta_att_paciente: attPacienteRegistro,
        }
        if(dados.consulta_valor != "" && isNaN(dados.consulta_valor)) throw new Error("Valor tem que ser númerico");
        await atualizarConsulta(consultaAgenda.consulta_id ,dados);
        Atualiza();
        handleCloseConsulta();
    }
    catch(error){
        console.error("Erro ao atualizar consulta:", error);
        alert(error.message || "Erro ao atualizar consulta.");
    } finally {
        setCarregando(false);
    }
    Atualiza();
  };

  async function handleSubmitDeleta() {
    try{
        setCarregando(true);
        await deletarConsulta(consultaAgenda.consulta_id);
        Atualiza();
        handleCloseConsulta();
    }
    catch(error){
        console.error("Erro ao deletar consulta:", error);
        alert(error.message || "Erro ao deletar consulta.");
    } finally {
        setCarregando(false);
    }
    Atualiza();
  };

  async function handleSubmitDebito() {
    try{
        setCarregando(true);
        await gerarDebito(consultaAgenda.consulta_id, consultaAgenda.paciente_id, consultaAgenda.consulta_valor);
        Atualiza();
        handleCloseConsulta();
    }
    catch(error){
        console.error("Erro ao gerar débito:", error);
        alert(error.message || "Erro ao gerar débito.");
    } finally {
        setCarregando(false);
    }
    Atualiza();
  }

  async function handleCloseConsulta() {
    setPacienteRegistro(null);
    setProcedimentoRegistro(null);
    setValorRegistro("");
    setDescRegistro("");
    setAttPacienteRegistro("");
    setAltOdontoRegistro("");
    setOpenConsulta(false);
  }

  async function handleClickOpenAgenda(event) {
    if(carregando) return;
    try{
        setCarregando(true);
        const texto = event.target.innerText.split("|");
        if(texto[0] == "Vazio"){
            return;
        }
        const consulta_id = Number(texto[texto.length-1]);
        const agendaConsulta = await buscarConsulta(consulta_id);
        setConsultaAgenda(agendaConsulta);
        setOpenConsulta(true);
    }
    catch(error){
        console.error("Erro ao buscar consulta:", error.message);
        alert(error.message || "Erro ao buscar consulta.");
    } finally {
        setCarregando(false);
    }
  }

  async function onChangeData() {
    try{
        const novaData = await verificarData(dataEntrada);
        setDia(novaData);
        Atualiza();
    }
    catch(error){
        console.error("Erro ao setar data nova:", error);
        alert(error.response?.data?.error || "Erro ao setar data nova.");
    }
  }

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
                    return response;
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

        async function buscarConsultasSemana(atualizar) {
            try{
                const profissionais = await buscarTodosDentistas();
                const profissional_login = !profissionais ? null : profissionais[dentistaConsultas].profissional_login;
                const dados = {
                    dia: dia,
                    profissional_login: profissional_login,
                };
                const response = await listarConsultasSemana(dados);
                const segunda = getSegunda(dia);
                const agenda = createAgenda();
                for(let x of response){
                    const tempos = x.horario_hora.split(":");
                    const dataList = x.horario_data.split("-");
                    const linha =  ((Number(tempos[0])-7)*2) + (Number(tempos[1])/30);
                    const string = getLabelAgenda(categoria, x)
                    modifyRow(agenda, Number(dataList[2]) - segunda, linha, string);
                }
                setRows(agenda);
            }
            catch (error) {
                console.log(error);
            }
        }

        //buscarTodosDentistas();
        buscarTodosPacientes();
        buscarTodosProcedimentos();
        buscarConsultasSemana();
    },
    [
        atualizaAgenda
    ]);

    const handleChangeCategoria = (event) => {
        Atualiza();
        setCategoria(event.target.value);
    };

    const handleChangeDentistaConsultas = (event) => {
        Atualiza();
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
                        placeholder="x.xx"
                        />
                    </div>
                    <div> 
                        <TextField 
                        value={dataRegistro}
                        onChange={(event) => {
                            setDataRegistro(event.target.value);
                        }}
                        label="Data da Consulta"
                        placeholder="ano/mes/dia"
                        />
                    </div>
                    <div> 
                        <TextField 
                        value={inicioRegistro}
                        onChange={(event) => {
                            setInicioRegistro(event.target.value);
                        }}
                        label="Inicio da Consulta"
                        placeholder="hora:00 ou hora:30"
                        />
                        <TextField 
                        value={fimRegistro}
                        onChange={(event) => {
                            setFimRegistro(event.target.value);
                        }}
                        label="Fim da Consulta"
                        placeholder="hora:00 ou hora:30"
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
                <Button disabled={carregando} onClick={handleSubmit}>
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Horario</TableCell>
                        <TableCell>Segunda</TableCell>
                        <TableCell>Terça</TableCell>
                        <TableCell>Quarta</TableCell>
                        <TableCell>Quinta</TableCell>
                        <TableCell>Sexta</TableCell>
                        <TableCell>Sabado</TableCell>
                        <TableCell>Domingo</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.horario}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell onClick={handleClickOpenAgenda}> {row.horario} </TableCell>
                        <TableCell onClick={handleClickOpenAgenda}>{row.segunda}</TableCell>
                        <TableCell onClick={handleClickOpenAgenda}>{row.terca}</TableCell>
                        <TableCell onClick={handleClickOpenAgenda}>{row.quarta}</TableCell>
                        <TableCell onClick={handleClickOpenAgenda}>{row.quinta}</TableCell>
                        <TableCell onClick={handleClickOpenAgenda}>{row.sexta}</TableCell>
                        <TableCell onClick={handleClickOpenAgenda}>{row.sabado}</TableCell>
                        <TableCell onClick={handleClickOpenAgenda}>{row.domingo}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {consultaAgenda && <Dialog 
            open={openConsulta} 
            onClose={handleCloseConsulta}
            fullWidth
            maxWidth="md"
            >
                <DialogTitle>Consulta {consultaAgenda.consulta_id}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Abaixo estão os dados da consulta:
                    </DialogContentText>
                    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                        <p>Paciente: {consultaAgenda.Paciente.nome}</p>
                        <p>Dentista: {consultaAgenda.Profissionals[0].nome}</p>
                        <p>Procedimento: {consultaAgenda.Procedimento.procedimento_nome}</p>
                        <p>Valor: {consultaAgenda.consulta_valor}</p>
                        <p>Data: {consultaAgenda.Horarios[0].horario_data}</p>
                        <p>Hora da consulta: {getHorarioInicio(consultaAgenda.Horarios[0].horario_hora)} - {getHorarioFim(consultaAgenda.Horarios[consultaAgenda.Horarios.length - 1].horario_hora)}</p>
                        <p>Descrição: {consultaAgenda.consulta_desc}</p>
                        <p>Atualização do Paciente: {consultaAgenda.consulta_att}</p>
                        <p>Atualização do Odontograma: {consultaAgenda.alt_odonto}</p>
                    </Box>
                    {consultaAgenda.Financeiro && <div>
                        <h2>Financeiro</h2>
                        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                            <p>Pago: {consultaAgenda.Financeiro.financeiro_pago}</p>
                            <p>Devendo: {consultaAgenda.Financeiro.financeiro_devendo}</p>
                            <p>Saldo: {consultaAgenda.Financeiro.financeiro_saldo}</p>
                        </Box>
                    </div>}
                    <h2>Editar Consulta</h2>
                    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
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
                        <TextField 
                        value={valorRegistro}
                        onChange={(event) => {
                            setValorRegistro(event.target.value);
                        }}
                        label="Valor"
                        placeholder="x.xx"
                        />
                        <div>
                            <TextField 
                            value={descRegistro}
                            onChange={(event) => {
                                setDescRegistro(event.target.value);
                            }}
                            multiline
                            fullWidth
                            label="Descrição da Consulta"
                            />
                        </div>
                        { VerificaPermissao("DENTISTA") && <div>
                            <div>
                                <TextField 
                                value={attPacienteRegistro}
                                onChange={(event) => {
                                    setAttPacienteRegistro(event.target.value);
                                }}
                                multiline
                                fullWidth
                                label="Atualização do Estado do Paciente"
                                />
                            </div>
                            <div>
                                <TextField 
                                value={altOdontoRegistro}
                                onChange={(event) => {
                                    setAltOdontoRegistro(event.target.value);
                                }}
                                multiline
                                fullWidth
                                label="Alterações feitas no Odontograma"
                                />
                            </div>
                        </div>}
                        <Button disabled={carregando} onClick={handleSubmitAtualiza}>Atualizar Consulta</Button>
                    </Box>
                    {!consultaAgenda.Financeiro && <Button disabled={carregando} onClick={handleSubmitDebito}>Gerar Débito</Button>}
                    <Button disabled={carregando} onClick={handleSubmitDeleta}>Deletar Consulta</Button>
                </DialogContent>
            </Dialog>}
            <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            >
                <TextField 
                value={dataEntrada}
                onChange={(event) => {
                    setDataEntrada(event.target.value);
                }}
                label="Dia"
                placeholder="ano/mes/dia"
                />
                <Button onClick={onChangeData}>Ver Agenda do Dia</Button>
            </Box>
        </Stack>
    );
}