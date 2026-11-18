const express = require("express");
const ReceituarioController = require("./receituario.controller");

const router = express.Router();

// GET /receituarios
router.get("/receituarios", ReceituarioController.listar);

// GET /receituarios/:id
router.get("/receituarios/:id", ReceituarioController.buscarPorId);

router.get("/receituarios/consulta/:id", ReceituarioController.buscarPorConsulta);

// Buscar receituários de um paciente
router.get("/receituarios/paciente/:id", ReceituarioController.buscarPorPaciente);

// POST /receituarios
router.post("/receituarios", ReceituarioController.criar);

// PUT /receituarios/:id
router.put("/receituarios/:id", ReceituarioController.atualizar);

// DELETE /receituarios/:id
router.delete("/receituarios/:id", ReceituarioController.deletar);

module.exports = router;
