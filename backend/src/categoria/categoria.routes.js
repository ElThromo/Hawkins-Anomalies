const express = require("express");
const categoriaController = require("./categoria.controller");
const { validarCategoria } = require("./categoria.validations");

const router = express.Router();

// READ - obtener todas las categorías
router.get("/", categoriaController.obtenerCategorias);

// READ - obtener una categoría por ID
router.get("/:id", categoriaController.obtenerCategoriaPorId);

// CREATE - crear una categoría
router.post("/", validarCategoria, categoriaController.crearCategoria);

// UPDATE - actualizar una categoría
router.put("/:id", validarCategoria, categoriaController.actualizarCategoria);

// DELETE - eliminar una categoría
router.delete("/:id", categoriaController.eliminarCategoria);

module.exports = router;