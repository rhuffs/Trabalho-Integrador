const express = require("express");
const ReceituarioController = require("./receituario.controller");
const { requirePermissaoMult } = require("../auth/auth.config");
const router = express.Router();

// GET /receituarios
router.get("/receituarios",requirePermissaoMult(["DENTISTA", "ADMIN"]), ReceituarioController.listar);

// GET /receituarios/:id
router.get("/receituarios/:id",requirePermissaoMult(["DENTISTA", "ADMIN"]), ReceituarioController.buscarPorId);

router.get("/receituarios/consulta/:id",requirePermissaoMult(["DENTISTA", "ADMIN"]), ReceituarioController.buscarPorConsulta);

// Buscar receituários de um paciente
router.get("/receituarios/paciente/:id",requirePermissaoMult(["DENTISTA", "ADMIN"]), ReceituarioController.buscarPorPaciente);

// POST /receituarios
router.post("/receituarios",requirePermissaoMult(["DENTISTA", "ADMIN"]), ReceituarioController.criar);

// PUT /receituarios/:id
router.put("/receituarios/:id",requirePermissaoMult(["DENTISTA", "ADMIN"]), ReceituarioController.atualizar);

// DELETE /receituarios/:id
router.delete("/receituarios/:id",requirePermissaoMult(["DENTISTA", "ADMIN"]), ReceituarioController.deletar);

module.exports = router;
