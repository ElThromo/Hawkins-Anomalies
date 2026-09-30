
const express = require("express");
const resolucionController = require("./resolucion.controller");
const { validarResolucion } = require("./resolucion.validations");
const { verificarToken } = require("../middlewares/auth.middleware");
const { verificarRol } = require("../middlewares/rol.middleware");

const router = express.Router();

router.get("/", resolucionController.obtenerResoluciones);
router.get("/:id", resolucionController.obtenerResolucionPorId);

router.post(
  "/",
  verificarToken,
  verificarRol("ADMIN", "INVESTIGADOR"),
  validarResolucion,
  resolucionController.crearResolucion
);

router.put(
  "/:id",
  verificarToken,
  verificarRol("ADMIN", "INVESTIGADOR"),
  validarResolucion,
  resolucionController.actualizarResolucion
);

router.delete(
  "/:id",
  verificarToken,
  verificarRol("ADMIN", "INVESTIGADOR"),
  resolucionController.eliminarResolucion
);

module.exports = router;
