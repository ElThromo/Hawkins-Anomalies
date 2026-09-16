const express = require("express");

const resolucionController = require("./resolucion.controller");
const { validarResolucion } = require("./resolucion.validations");

const router = express.Router();

// READ - obtener todas
router.get("/", resolucionController.obtenerResoluciones);

// READ - obtener por ID
router.get("/:id", resolucionController.obtenerResolucionPorId);

// CREATE
router.post("/", validarResolucion, resolucionController.crearResolucion);

// UPDATE
router.put("/:id", validarResolucion, resolucionController.actualizarResolucion);

// DELETE
router.delete("/:id", resolucionController.eliminarResolucion);

module.exports = router;