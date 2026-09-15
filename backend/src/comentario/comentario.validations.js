
function validarComentario(req, res, next) {
  const { texto, idReporte } = req.body ?? {};

  if (typeof texto !== "string" || !texto.trim()) {
    return res.status(400).json({
      error: "El texto del comentario es obligatorio"
    });
  }

  if (!Number.isInteger(idReporte) || idReporte <= 0) {
    return res.status(400).json({
      error: "idReporte debe ser un entero positivo"
    });
  }

  next();
}

function validarActualizacionComentario(req, res, next) {
  const { texto } = req.body ?? {};

  if (typeof texto !== "string" || !texto.trim()) {
    return res.status(400).json({
      error: "El texto del comentario es obligatorio"
    });
  }

  next();
}

module.exports = {
  validarComentario,
  validarActualizacionComentario
};
