
const express = require("express");
const reaccionController = require("./reaccion.controller");
const {
  validarReaccion,
  validarActualizacionReaccion
} = require("./reaccion.validations");
const { verificarToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", reaccionController.obtenerReacciones);
router.get("/:id", reaccionController.obtenerReaccionPorId);

router.post(
  "/",
  verificarToken,
  validarReaccion,
  reaccionController.crearReaccion
);

router.put(
  "/:id",
  verificarToken,
  validarActualizacionReaccion,
  reaccionController.actualizarReaccion
);

router.delete(
  "/:id",
  verificarToken,
  reaccionController.eliminarReaccion
);

module.exports = router;
