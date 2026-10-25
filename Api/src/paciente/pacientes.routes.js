const express = require("express");
const pacientesController = require("./pacientes.controller");

const router = express.Router();

// GET /pacientes
router.get("/pacientes", pacientesController.listar);

// GET /pacientes/:id
router.get("/pacientes/:id", pacientesController.buscarPorId);

// POST /pacientes
router.post("/pacientes", pacientesController.criar);

// PUT /pacientes/:id
router.put("/pacientes/:id", pacientesController.atualizar);

// DELETE /pacientes/:id
router.delete("/pacientes/:id", pacientesController.deletar);

module.exports = router;
