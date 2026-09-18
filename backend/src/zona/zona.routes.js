const express = require("express");
const zonaController = require("./zona.controller");
const { validarZona } = require("./zona.validations");
const { verificarToken } = require("../middlewares/auth.middleware");
const { verificarRol } = require("../middlewares/rol.middleware");

const router = express.Router();

// READ - obtener todas las zonas
router.get("/", zonaController.obtenerZonas);

// READ - obtener una zona por ID
router.get("/:id", zonaController.obtenerZonaPorId);

// CREATE - crear una zona
router.post("/", verificarToken, verificarRol("ADMIN"), validarZona, zonaController.crearZona);

// UPDATE - actualizar una zona
router.put("/:id", verificarToken, verificarRol("ADMIN"), validarZona, zonaController.actualizarZona);

// DELETE - eliminar una zona
router.delete("/:id", verificarToken, verificarRol("ADMIN"), zonaController.eliminarZona);

module.exports = router;
