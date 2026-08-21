const express = require('express');

const app = express();

const PORTA = 3001;

app.use(express.json());

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

