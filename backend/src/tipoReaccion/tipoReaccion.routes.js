
const express = require("express");
const tipoReaccionController = require("./tipoReaccion.controller");
const { validarTipoReaccion } = require("./tipoReaccion.validations");
const {
  verificarToken,
  verificarAdmin
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", tipoReaccionController.obtenerTiposReaccion);

router.get("/:id", tipoReaccionController.obtenerTipoReaccionPorId);

router.post(
  "/",
  verificarToken,
  verificarAdmin,
  validarTipoReaccion,
  tipoReaccionController.crearTipoReaccion
);

router.put(
  "/:id",
  verificarToken,
  verificarAdmin,
  validarTipoReaccion,
  tipoReaccionController.actualizarTipoReaccion
);

router.delete(
  "/:id",
  verificarToken,
  verificarAdmin,
  tipoReaccionController.eliminarTipoReaccion
);

module.exports = router;
