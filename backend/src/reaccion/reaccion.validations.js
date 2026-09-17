
const TIPOS_REACCION = [
  "ME_GUSTA",
  "MIEDO",
  "SORPRESA",
  "ME_ENCANTA"
];

function tipoValido(tipo) {
  return typeof tipo === "string" && TIPOS_REACCION.includes(tipo);
}

function validarReaccion(req, res, next) {
  const { tipo, idReporte } = req.body ?? {};

  if (!tipoValido(tipo)) {
    return res.status(400).json({
      error:
        "El tipo debe ser ME_GUSTA, MIEDO, SORPRESA o ME_ENCANTA"
    });
  }

  if (!Number.isInteger(idReporte) || idReporte <= 0) {
    return res.status(400).json({
      error: "idReporte debe ser un entero positivo"
    });
  }

  next();
}

function validarActualizacionReaccion(req, res, next) {
  const { tipo } = req.body ?? {};

  if (!tipoValido(tipo)) {
    return res.status(400).json({
      error:
        "El tipo debe ser ME_GUSTA, MIEDO, SORPRESA o ME_ENCANTA"
    });
  }

  next();
}

module.exports = {
  validarReaccion,
  validarActualizacionReaccion
};
