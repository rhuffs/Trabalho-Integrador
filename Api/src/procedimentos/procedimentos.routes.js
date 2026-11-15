const express = require("express");
const ProcedimentosController = require("./procedimentos.controller");

const router = express.Router();

// GET /Procedimentos
router.get("/Procedimentos", ProcedimentosController.listar);

// GET /Procedimentos/:nome
router.get("/Procedimentos/nome",ProcedimentosController.buscarPorNome);

// GET /Procedimentos/:id
router.get("/Procedimentos/:id", ProcedimentosController.buscarPorId);

// POST /Procedimentos
router.post("/Procedimentos", ProcedimentosController.criar);

// PUT /Procedimentos/:id
router.put("/Procedimentos/:id", ProcedimentosController.atualizar);

router.patch("/Procedimentos/:id/preco", ProcedimentosController.atualizarPreco);

// DELETE /Procedimentos/:id
router.delete("/Procedimentos/:id", ProcedimentosController.deletar);

module.exports = router;
