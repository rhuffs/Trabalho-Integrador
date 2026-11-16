const express = require("express");
const anamneseController = require("./anamnese.controller");
const { requireJWTAuth } = require("../auth/auth.config");
const { requirePermissao } = require("../auth/auth.config");

const router = express.Router();

// GET /anamnese
router.get("/anamnese/itens", requireJWTAuth, anamneseController.listarAnamneseItem);

router.get("/anamnese/itens/nome", requireJWTAuth, anamneseController.buscarAnamneseItemPorNome);

router.get("/anamnese/:id", requireJWTAuth, anamneseController.listarAnamnese);

// GET /anamnese/:id
router.get("/anamnese/itens/:id", requireJWTAuth, anamneseController.buscarAnamneseItemPorId);

// POST /anamnese
router.post("/anamnese/itens", requirePermissao('DENTISTA'), anamneseController.criarAnamneseItem);

router.post("/anamnese", requirePermissao('DENTISTA'), anamneseController.criarConsultaAnamnese);

// PUT /anamnese/:id
router.put("/anamnese/itens/:id", requirePermissao('DENTISTA'), anamneseController.atualizarAnamneseItem);

// DELETE /anamnese/:id
router.delete("/anamnese/itens/:id", requirePermissao('DENTISTA'), anamneseController.deletarAnamneseItem);

router.delete("/anamnese", requirePermissao('DENTISTA'), anamneseController.deletarConsultaAnamneseItem);

router.delete("/anamnese/:id", requirePermissao('DENTISTA'), anamneseController.deletarConsultaAnamnese);

module.exports = router;
