
const express = require("express");
const comentarioController = require("./comentario.controller");
const {
  validarComentario,
  validarActualizacionComentario
} = require("./comentario.validations");
const { verificarToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", comentarioController.obtenerComentarios);
router.get("/:id", comentarioController.obtenerComentarioPorId);
router.post("/", verificarToken, validarComentario, comentarioController.crearComentario);
router.put("/:id", verificarToken, validarActualizacionComentario, comentarioController.actualizarComentario);
router.delete("/:id", verificarToken, comentarioController.eliminarComentario);

module.exports = router;
