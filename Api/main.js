const express = require("express");
const cors = require("cors");
const pgp = require('pg-promise');
const app = express();
const passport = require("passport");
const authConfig = require("./src/auth/auth.config");
app.use(passport.initialize());
authConfig.configureJwtStrategy();
app.use(express.json());
app.use(cors());

const PORTA = 3001;
const pacientesRoutes = require("./src/paciente/pacientes.routes");
const authRoutes = require("./src/auth/auth.routes");
const anamneseRoutes = require("./src/anamnese/anamnese.routes");
const procedimentosRoutes = require("./src/procedimentos/procedimentos.routes");
const financeiroRoutes = require("./src/financeiro/financeiro.routes");
const remedioRoutes = require("./src/remedio/remedio.routes");
const horarioRoutes = require("./src/horario/horario.routes");
const receituarioRoutes = require("./src/receituario/receituario.routes");
const consultaRoutes = require("./src/consulta/consulta.routes");

app.use(pacientesRoutes);
app.use(authRoutes);
app.use(anamneseRoutes);
app.use(procedimentosRoutes);
app.use(horarioRoutes);
app.use("/financeiro",financeiroRoutes);
app.use(remedioRoutes);
app.use(receituarioRoutes);
app.use(consultaRoutes);

app.get('/', (req, res) => {
	res.json({
		mensagem: 'API funcionando!',
		versao: '1.0.0',
		timestamp: new Date().toISOString()
	});
});

app.listen(PORTA, () => {
	console.log("Servidor rodando em http://localhost:" + PORTA);
});

