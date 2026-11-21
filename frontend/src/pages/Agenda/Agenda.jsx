import { useState, useEffect } from "react";
import "./Agenda.css";
import Header from "../../components/Header";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { VerificaPermissao } from "../Login/Login";
import { listarDentistas } from "../../services/authService";

export default function Agenda(){
    const [categoria, setCategoria] = useState(0);
    const [dentistas, setDentistas] = useState(null);
    const [dentistaConsultas, setDentistaConsultas] = useState(0);
    const [openRegistrar, setOpenRegistrar] = useState(false);

  const handleClickOpenRegistrar = () => {
    const botao = document.activeElement;
    botao.blur();
    setOpenRegistrar(true);
  };

  const handleCloseRegistrar = () => {
    setOpenRegistrar(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData).entries());
    const email = formJson.email;
    console.log(email);
    handleCloseRegistrar();
  };

    useEffect(() => {
        async function buscarTodosDentistas() {
            try{
                if(VerificaPermissao("SECRETARIO")){
                    const response = await listarDentistas();
                    let i = 0;
                    for(let x of response){
                        x.id = i;
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

        buscarTodosDentistas();
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
            <Grid container spacing={9} sx={{justifyContent: "space-between",}}>
                <Grid size={1}></Grid>
                <Grid size="grow">
                    <Button variant="contained" onClick={handleClickOpenRegistrar}>Registrar Consulta</Button>
                    <Dialog open={openRegistrar} onClose={handleCloseRegistrar}>
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <form onSubmit={handleSubmit} id="subscription-form">
                            <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            />
                            <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            />
                        </form>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseRegistrar}>Cancel</Button>
                        <Button type="submit" form="subscription-form">
                            Subscribe
                        </Button>
                        </DialogActions>
                    </Dialog>

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
