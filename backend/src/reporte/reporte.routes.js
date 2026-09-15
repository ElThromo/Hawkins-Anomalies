const express = require("express");
const reporteController = require("./reporte.controller");
const { validarReporte, validarActualizacionReporte } = require("./reporte.validations");
const { verificarToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", reporteController.obtenerReportes);
router.get("/:id", reporteController.obtenerReportePorId);
router.post("/", verificarToken, validarReporte, reporteController.crearReporte);
router.put("/:id", verificarToken, validarActualizacionReporte, reporteController.actualizarReporte);
router.delete("/:id", verificarToken, reporteController.eliminarReporte);

module.exports = router;