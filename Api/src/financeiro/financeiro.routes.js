
const express = require("express");
const FinanceiroController = require("./financeiro.controller");
const { requirePermissaoMult } = require("../auth/auth.config");

const router = express.Router();

// GET /financeiro
router.get(
    "/",
    requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),
    FinanceiroController.listar
);

// GET /financeiro/receitas-por-mes
router.get(
    "/receitas-por-mes",
    requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),
    FinanceiroController.receitasPorMes
);

// GET /financeiro/paciente/:paciente_id
router.get(
    "/paciente/:paciente_id",
    requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),
    FinanceiroController.buscarPorPaciente
);

// GET /financeiro/saldo/:paciente_id
router.get(
    "/saldo/:paciente_id",
    requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),
    FinanceiroController.calcularSaldo
);

// GET /financeiro/total-recebido-mes
router.get(
    "/total-recebido-mes",
    requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),
    FinanceiroController.totalRecebidoNoMes
);

// GET /financeiro/:id
router.get(
    "/:id",
    requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),
    FinanceiroController.buscarPorId
);

// POST /financeiro/debito
router.post(
    "/debito",
    requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),
    FinanceiroController.registrarDebito
);

// POST /financeiro/credito
router.post(
    "/credito",
    requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),
    FinanceiroController.registrarCredito
);

module.exports = router;
