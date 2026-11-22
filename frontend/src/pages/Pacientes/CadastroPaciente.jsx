
import { useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    MenuItem
} from "@mui/material";

import { cadastrarPaciente } from "../../services/pacientesService";

export default function CadastroPaciente({ abrir, fechar, aoCadastrar }) {

    const [dados, setDados] = useState({
        nome: "",
        cpf: "",
        rg: "",
        data_nascimento: "",
        sexo: "",
        estado_civil: "",
        profissao: "",
        telefone: "",
        email: "",
        endereco: "",
        cidade: "",
        uf: "",
        cep: "",
        local_nascimento: "",
        mae_pai: "",
        quem_indicou: "",
        autorizacao: true
    });

    const [odontograma, setOdontograma] = useState(null);
    const [carregando, setCarregando] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setDados({
            ...dados,
            [name]: value
        });
    }

    async function handleCadastrar() {
        try {
            setCarregando(true);
            await cadastrarPaciente(dados, odontograma);
            // Atualiza a lista de pacientes após o cadastro
            if (aoCadastrar) {
                await aoCadastrar();
            }
            alert("Paciente cadastrado com sucesso!");

            setDados({
                nome: "",
                cpf: "",
                rg: "",
                data_nascimento: "",
                sexo: "",
                estado_civil: "",
                profissao: "",
                telefone: "",
                email: "",
                endereco: "",
                cidade: "",
                uf: "",
                cep: "",
                local_nascimento: "",
                mae_pai: "",
                quem_indicou: "",
                autorizacao: true
            });

            setOdontograma(null);
            fechar();

        } catch (erro) {
            console.error("Erro ao cadastrar paciente:", erro);
            alert(erro.response?.data?.erro || "Erro ao cadastrar paciente.");

        } finally {
            setCarregando(false);
        }
    }

    return (
        <Dialog open={abrir} onClose={fechar} fullWidth maxWidth="md">
            <DialogTitle>Cadastrar paciente</DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>

                    <TextField label="Nome completo" name="nome" value={dados.nome} onChange={handleChange} fullWidth required />
                    <TextField label="CPF" name="cpf" value={dados.cpf} onChange={handleChange} fullWidth />
                    <TextField label="RG" name="rg" value={dados.rg} onChange={handleChange} fullWidth required />

                    <TextField
                        label="Data de nascimento"
                        name="data_nascimento"
                        type="date"
                        value={dados.data_nascimento}
                        onChange={handleChange}
                        fullWidth
                        required
                        slotProps={{ inputLabel: { shrink: true } }}
                    />

                    <TextField select label="Sexo" name="sexo" value={dados.sexo} onChange={handleChange} fullWidth required>
                        <MenuItem value="Masculino">Masculino</MenuItem>
                        <MenuItem value="Feminino">Feminino</MenuItem>
                        <MenuItem value="Outro">Outro</MenuItem>
                    </TextField>

                    <TextField select label="Estado civil" name="estado_civil" value={dados.estado_civil} onChange={handleChange} fullWidth>
                        <MenuItem value="Solteiro">Solteiro</MenuItem>
                        <MenuItem value="Casado">Casado</MenuItem>
                        <MenuItem value="Divorciado">Divorciado</MenuItem>
                        <MenuItem value="Viúvo">Viúvo</MenuItem>
                        <MenuItem value="União Estável">União Estável</MenuItem>
                    </TextField>

                    <TextField label="Profissão" name="profissao" value={dados.profissao} onChange={handleChange} fullWidth />

                    <TextField label="Telefone" name="telefone" value={dados.telefone} onChange={handleChange} fullWidth required />
                    <TextField label="E-mail" name="email" type="email" value={dados.email} onChange={handleChange} fullWidth required />

                    <TextField label="Endereço" name="endereco" value={dados.endereco} onChange={handleChange} fullWidth required />
                    <TextField label="Cidade" name="cidade" value={dados.cidade} onChange={handleChange} fullWidth required />
                    <TextField label="UF" name="uf" value={dados.uf} onChange={handleChange} fullWidth required />
                    <TextField label="CEP" name="cep" value={dados.cep} onChange={handleChange} fullWidth required />

                    <TextField label="Local de nascimento" name="local_nascimento" value={dados.local_nascimento} onChange={handleChange} fullWidth />
                    <TextField label="Nome da mãe/pai" name="mae_pai" value={dados.mae_pai} onChange={handleChange} fullWidth />
                    <TextField label="Quem indicou?" name="quem_indicou" value={dados.quem_indicou} onChange={handleChange} fullWidth />

                    <Button variant="outlined" component="label">
                        Anexar odontograma
                        <input
                            type="file"
                            hidden
                            accept="image/jpeg,image/png,application/pdf"
                            onChange={(e) => setOdontograma(e.target.files[0] || null)}
                        />
                    </Button>

                    {odontograma && (
                        <span>Arquivo selecionado: {odontograma.name}</span>
                    )}

                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={fechar}>Cancelar</Button>
                <Button
                    variant="contained"
                    onClick={handleCadastrar}
                    disabled={carregando}
                >
                    {carregando ? "Cadastrando..." : "Cadastrar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
