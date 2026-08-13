const express = require("express");
const usuarioController = require("./usuario.controller");
const { validarUsuario, validarActualizacionUsuario } = require("./usuario.validations");

const router = express.Router();

router.get("/", usuarioController.obtenerUsuarios);
router.get("/:id", usuarioController.obtenerUsuarioPorId);
router.post("/", validarUsuario, usuarioController.crearUsuario);
router.put("/:id", validarActualizacionUsuario, usuarioController.actualizarUsuario);
router.delete("/:id", usuarioController.eliminarUsuario);

module.exports = router;