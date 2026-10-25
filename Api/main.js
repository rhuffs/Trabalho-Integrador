const express = require("express");
const cors = require("cors");
const pgp = require('pg-promise');
const app = express();
app.use(express.json());
app.use(cors());

const PORTA = 3001;
const pacientesRoutes = require("./src/paciente/pacientes.routes");

app.use(pacientesRoutes);

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

