const express = require("express");

const vigilanteController = require("./vigilante.controller");

const { validarVigilante } = require("./vigilante.validations");

const router = express.Router();

// READ - obtener todos los vigilantes
router.get("/", vigilanteController.obtenerVigilantes);

// READ - obtener un vigilante por ID
router.get("/:id", vigilanteController.obtenerVigilantePorId);

// CREATE - crear un vigilante
router.post("/", validarVigilante, vigilanteController.crearVigilante);

// UPDATE - actualizar un vigilante
router.put("/:id", validarVigilante, vigilanteController.actualizarVigilante);

// DELETE - eliminar un vigilante
router.delete("/:id", vigilanteController.eliminarVigilante);

module.exports = router;