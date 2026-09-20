const express = require("express");
const usuarioController = require("./usuario.controller");
const { validarUsuario, validarActualizacionUsuario } = require("./usuario.validations");

const { verificarToken, verificarAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", usuarioController.obtenerUsuarios);
router.get("/:id", usuarioController.obtenerUsuarioPorId);
router.post("/", validarUsuario, usuarioController.crearUsuario);
router.put("/:id", verificarToken, verificarAdmin, validarActualizacionUsuario, usuarioController.actualizarUsuario);
router.delete("/:id", verificarToken, verificarAdmin, usuarioController.eliminarUsuario);

module.exports = router;