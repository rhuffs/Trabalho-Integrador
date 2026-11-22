const express = require("express");
const ProcedimentosController = require("./procedimentos.controller");
const { requirePermissaoMult } = require("../auth/auth.config");
const router = express.Router();

// GET /Procedimentos
router.get("/Procedimentos",requirePermissaoMult(["DENTISTA", "ADMIN", "SECRETARIO"]), ProcedimentosController.listar);

// GET /Procedimentos/:nome
router.get("/Procedimentos/nome",requirePermissaoMult(["DENTISTA", "ADMIN"]),ProcedimentosController.buscarPorNome);

// GET /Procedimentos/:id
router.get("/Procedimentos/:id",requirePermissaoMult(["DENTISTA", "ADMIN"]),ProcedimentosController.buscarPorId);

// POST /Procedimentos
router.post("/Procedimentos",requirePermissaoMult(["DENTISTA", "ADMIN"]),ProcedimentosController.criar);

// PUT /Procedimentos/:id
router.put("/Procedimentos/:id",requirePermissaoMult(["DENTISTA", "ADMIN"]),ProcedimentosController.atualizar);

router.patch("/Procedimentos/:id/preco",requirePermissaoMult(["DENTISTA", "ADMIN"]),ProcedimentosController.atualizarPreco);

// DELETE /Procedimentos/:id
router.delete("/Procedimentos/:id",requirePermissaoMult(["DENTISTA", "ADMIN"]),ProcedimentosController.deletar);

module.exports = router;
