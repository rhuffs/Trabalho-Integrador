const express = require("express");
const consultaController = require("./consulta.controller");
const { requireJWTAuth } = require("../auth/auth.config");
const { requirePermissao } = require("../auth/auth.config");
const { requirePermissaoMult } = require("../auth/auth.config");

const router = express.Router();

// GET /consulta
router.get("/consulta", requirePermissaoMult(['SECRETARIO','DENTISTA']) , consultaController.listarConsultas);

router.get("/consulta/:id", requireJWTAuth ,consultaController.buscarConsulta);

// POST /consulta
router.post("/consulta", requirePermissaoMult(['SECRETARIO','DENTISTA']) , consultaController.criarConsulta);

router.post("/consulta/:id/dentista", requirePermissao('SECRETARIO') , consultaController.adicionarDentistaConsulta);

router.put("/consulta/:id", requirePermissaoMult(['SECRETARIO','DENTISTA']) , consultaController.atualizarConsulta);
// DELETE /consulta/:id
router.delete("/consulta/:id", requirePermissaoMult(['SECRETARIO','DENTISTA']) , consultaController.deletarConsulta);

router.delete("/consulta/:id/dentista", requirePermissao('SECRETARIO') , consultaController.removerDentistaConsulta);

module.exports = router;
