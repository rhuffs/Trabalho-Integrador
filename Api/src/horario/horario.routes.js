const express = require("express");
const horarioController = require("./horario.controller");
const { requireJWTAuth } = require("../auth/auth.config");
const { requirePermissao } = require("../auth/auth.config");

const router = express.Router();

// GET /horario
router.get("/horario", horarioController.buscarHorario);

router.get("/horario/semana", horarioController.listarHorariosSemana);

// POST /horario
router.post("/horario", horarioController.criarHorario);

// PUT /horario/:id
router.put("/horario", horarioController.atualizarHorario);

// DELETE /horario/:id
router.delete("/horario", horarioController.deletarHorario);

module.exports = router;
