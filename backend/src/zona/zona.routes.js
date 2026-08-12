const express = require("express");
const zonaController = require("./zona.controller");
const { validarZona } = require("./zona.validations");

const router = express.Router();

// READ - obtener todas las zonas
router.get("/", zonaController.obtenerZonas);

// READ - obtener una zona por ID
router.get("/:id", zonaController.obtenerZonaPorId);

// CREATE - crear una zona
router.post("/", validarZona, zonaController.crearZona);

// UPDATE - actualizar una zona
router.put("/:id", validarZona, zonaController.actualizarZona);

// DELETE - eliminar una zona
router.delete("/:id", zonaController.eliminarZona);

module.exports = router;
