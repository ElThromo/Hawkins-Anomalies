const express = require("express");
const categoriaController = require("./categoria.controller");
const { validarCategoria } = require("./categoria.validations");
const { verificarToken } = require("../middlewares/auth.middleware");
const { verificarRol } = require("../middlewares/rol.middleware");

const router = express.Router();

// READ - obtener todas las categorías
router.get("/", categoriaController.obtenerCategorias);

// READ - obtener una categoría por ID
router.get("/:id", categoriaController.obtenerCategoriaPorId);

// CREATE - crear una categoría
router.post("/", verificarToken, verificarRol("ADMIN"), validarCategoria, categoriaController.crearCategoria);

// UPDATE - actualizar una categoría
router.put("/:id", verificarToken, verificarRol("ADMIN"), validarCategoria, categoriaController.actualizarCategoria);

// DELETE - eliminar una categoría
router.delete("/:id", verificarToken, verificarRol("ADMIN"), categoriaController.eliminarCategoria);
module.exports = router;