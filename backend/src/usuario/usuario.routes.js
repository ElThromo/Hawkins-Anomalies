
const express = require("express");
const usuarioController = require("./usuario.controller");
const {
  validarUsuario,
  validarActualizacionUsuario,
  validarEdicionPerfil
} = require("./usuario.validations");
const {
  verificarToken,
  verificarAdmin
} = require("../middlewares/auth.middleware");
const { verificarRol } = require("../middlewares/rol.middleware");
const { uploadAvatar } = require("../middlewares/uploadAvatar.middleware");

const router = express.Router();

router.get("/", verificarToken, verificarRol("ADMIN"), usuarioController.obtenerUsuarios);
router.get("/:id", usuarioController.obtenerUsuarioPorId);
router.post("/", validarUsuario, usuarioController.crearUsuario);
router.put("/:id", verificarToken, verificarAdmin, validarActualizacionUsuario, usuarioController.actualizarUsuario);
router.delete("/:id", verificarToken, verificarAdmin, usuarioController.eliminarUsuario);
router.put("/perfil/editar", verificarToken, validarEdicionPerfil, usuarioController.actualizarPerfilPropio);
router.post("/perfil/avatar", verificarToken, uploadAvatar.single("avatar"), usuarioController.subirAvatar);

module.exports = router;
