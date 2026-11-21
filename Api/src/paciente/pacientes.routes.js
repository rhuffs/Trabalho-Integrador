const express = require("express");
const pacientesController = require("./pacientes.controller");
const { requirePermissaoMult } = require("../auth/auth.config");
const router = express.Router();
const upload = require("../middlewares/upload");


// GET /pacientes
router.get("/pacientes",requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]), pacientesController.listar);

// GET /pacientes/:id
router.get("/pacientes/:id",requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),pacientesController.buscarPorId);

// GET /pacientes/:nome
router.get("/pacientes/nome",requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),pacientesController.buscarPorNome);

// GET /pacientes/cpf
router.get("/pacientes/cpf",requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),pacientesController.buscarPorCpf);

// POST /pacientes
router.post(
    "/pacientes",
    requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),
    upload.single("odontograma"),
    pacientesController.criar
);

// PUT /pacientes/:id
router.put("/pacientes/:id",requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),pacientesController.atualizar);

// DELETE /pacientes/:id
router.delete("/pacientes/:id",requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),pacientesController.deletar);

// PATCH /pacientes/:id
router.patch(
    "/pacientes/:id",
    requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),
    pacientesController.atualizar
);

module.exports = router;
