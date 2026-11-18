const express = require("express");
const RemedioController = require("./remedio.controller");

const router = express.Router();

// GET /remedio
router.get("/remedios", RemedioController.listar);

// GET /Remedio/:nome
router.get("/remedios/nome",RemedioController.buscarPorNome);

// GET /Remedio/:id
router.get("/remedios/:id", RemedioController.buscarPorId);

// POST /Remedio
router.post("/remedios", RemedioController.criar);

// PUT /Remedio/:id
router.put("/remedios/:id", RemedioController.atualizar);

// DELETE /Remedio/:id
router.delete("/remedios/:id", RemedioController.deletar);

module.exports = router;
