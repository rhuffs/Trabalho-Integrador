const express = require("express");
const horarioController = require("./horario.controller");
const { requireJWTAuth } = require("../auth/auth.config");
const { requirePermissao } = require("../auth/auth.config");
const { requirePermissaoMult } = require("../auth/auth.config");

const router = express.Router();

// GET /horario
router.get("/horario", requirePermissaoMult(['SECRETARIO','DENTISTA']) , horarioController.buscarHorario);

router.get("/horario/semana", requirePermissaoMult(['SECRETARIO','DENTISTA']) ,horarioController.listarHorariosSemana);

// POST /horario
router.post("/horario", requirePermissaoMult(['SECRETARIO','DENTISTA']) , horarioController.criarHorario);

// DELETE /horario/:id
router.delete("/horario", requirePermissaoMult(['SECRETARIO','DENTISTA']) , horarioController.deletarHorario);

module.exports = router;
