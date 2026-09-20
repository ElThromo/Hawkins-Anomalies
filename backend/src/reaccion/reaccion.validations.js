
function validarReaccion(req, res, next) {
  const { idTipoReaccion, idReporte } = req.body ?? {};

  if (!Number.isInteger(idTipoReaccion) || idTipoReaccion <= 0) {
    return res.status(400).json({
      error: "idTipoReaccion debe ser un entero positivo"
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
  const { idTipoReaccion } = req.body ?? {};

  if (!Number.isInteger(idTipoReaccion) || idTipoReaccion <= 0) {
    return res.status(400).json({
      error: "idTipoReaccion debe ser un entero positivo"
    });
  }

  next();
}

module.exports = {
  validarReaccion,
  validarActualizacionReaccion
};
