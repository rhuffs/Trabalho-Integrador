const express = require("express");
const authController = require("./auth.controller");
const { requirePermissao } = require("./auth.config");
const { requirePermissaoMult } = require("./auth.config");

const router = express.Router();

// POST /login - Autenticação de usuário
router.post("/login", authController.login);

// POST /logout - Logout de usuário
router.post("/logout", authController.logout);

// POST /novoUsuario - Criar novo usuário
router.post("/novoUsuario", requirePermissao("ADMIN") ,authController.criarUsuario);

router.delete("/deletarUsuario", requirePermissao("ADMIN"), authController.deletarProfissional);

router.get("/listarUsuarios", requirePermissaoMult(["SECRETARIO","ADMIN"]), authController.listarUsuarios);

router.get("/buscarUsuarioLogin", requirePermissaoMult(["SECRETARIO","ADMIN"]), authController.buscarUsuarioLogin);

router.get("/buscarUsuariosNome", requirePermissaoMult(["SECRETARIO","ADMIN"]), authController.buscarUsuariosNome);

module.exports = router;
