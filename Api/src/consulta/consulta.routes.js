const express = require("express");
const consultaController = require("./consulta.controller");
const { requireJWTAuth } = require("../auth/auth.config");
const { requirePermissao } = require("../auth/auth.config");
const { requirePermissaoMult } = require("../auth/auth.config");

const router = express.Router();

// GET /consulta
router.get("/consulta", requirePermissaoMult(['SECRETARIO','DENTISTA','ADMIN']) , consultaController.listarConsultas);

router.get("/consulta/paciente",requirePermissaoMult(["SECRETARIO", "DENTISTA",'ADMIN']),consultaController.listarConsultasPaciente); //Rhuan: criei uma nova para funcioonar na pagina de paciente

// GET /consulta/contar-hoje  Rhuan: serve para conatbilizar consultas de hj
router.get(
    "/consulta/contar-hoje",
    requirePermissaoMult(["SECRETARIO", "DENTISTA", "ADMIN"]),
    consultaController.contarConsultasHoje
);

router.post("/consulta/:id", requirePermissaoMult(['SECRETARIO', 'DENTISTA']) ,consultaController.buscarConsulta);

// POST /consulta
router.post("/consulta", requirePermissaoMult(['SECRETARIO','DENTISTA','ADMIN']) , consultaController.criarConsulta);

router.post("/consulta/:id/dentista", requirePermissao(['SECRETARIO','ADMIN']) , consultaController.adicionarDentistaConsulta);

router.put("/consulta/:id", requirePermissaoMult(['SECRETARIO','DENTISTA','ADMIN']) , consultaController.atualizarConsulta);
// DELETE /consulta/:id
router.delete("/consulta/:id", requirePermissaoMult(['SECRETARIO','DENTISTA','ADMIN']) , consultaController.deletarConsulta);

router.delete("/consulta/:id/dentista", requirePermissao('SECRETARIO','ADMIN') , consultaController.removerDentistaConsulta);


module.exports = router;
