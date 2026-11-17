
const express = require("express");
const FinanceiroController = require("./financeiro.controller");
const { requirePermissaoMult } = require("../auth/auth.config");

const router = express.Router();

// GET /financeiro
router.get(
    "/",
    requirePermissaoMult(["SECRETARIO", "DENTISTA"]),
    FinanceiroController.listar
);

// GET /financeiro/paciente/:paciente_id
router.get(
    "/paciente/:paciente_id",
    requirePermissaoMult(["SECRETARIO", "DENTISTA"]),
    FinanceiroController.buscarPorPaciente
);

// GET /financeiro/saldo/:paciente_id
router.get(
    "/saldo/:paciente_id",
    requirePermissaoMult(["SECRETARIO", "DENTISTA"]),
    FinanceiroController.calcularSaldo
);

// GET /financeiro/:id
router.get(
    "/:id",
    requirePermissaoMult(["SECRETARIO", "DENTISTA"]),
    FinanceiroController.buscarPorId
);

// POST /financeiro/debito
router.post(
    "/debito",
    requirePermissaoMult(["SECRETARIO", "DENTISTA"]),
    FinanceiroController.registrarDebito
);

// POST /financeiro/credito
router.post(
    "/credito",
    requirePermissaoMult(["SECRETARIO", "DENTISTA"]),
    FinanceiroController.registrarCredito
);

module.exports = router;
