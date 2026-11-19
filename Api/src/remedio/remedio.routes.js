const express = require("express");
const RemedioController = require("./remedio.controller");
const { requirePermissaoMult } = require("../auth/auth.config");
const router = express.Router();

// GET /remedio
router.get("/remedios",requirePermissaoMult(["DENTISTA", "ADMIN"]), RemedioController.listar);

// GET /Remedio/:nome
router.get("/remedios/nome",requirePermissaoMult(["DENTISTA", "ADMIN"]),RemedioController.buscarPorNome);

// GET /Remedio/:id
router.get("/remedios/:id",requirePermissaoMult(["DENTISTA", "ADMIN"]), RemedioController.buscarPorId);

// POST /Remedio
router.post("/remedios",requirePermissaoMult(["DENTISTA", "ADMIN"]), RemedioController.criar);

// PUT /Remedio/:id
router.put("/remedios/:id",requirePermissaoMult(["DENTISTA", "ADMIN"]), RemedioController.atualizar);

// DELETE /Remedio/:id
router.delete("/remedios/:id",requirePermissaoMult(["DENTISTA", "ADMIN"]), RemedioController.deletar);

module.exports = router;
