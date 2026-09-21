
function validarTipoReaccion(req, res, next) {
  const { nombre, emoji } = req.body ?? {};

  if (typeof nombre !== "string" || !nombre.trim()) {
    return res.status(400).json({
      error: "El nombre es obligatorio y debe ser texto"
    });
  }

  if (typeof emoji !== "string" || !emoji.trim()) {
    return res.status(400).json({
      error: "El emoji es obligatorio y debe ser texto"
    });
  }

  if (nombre.trim().length > 191 || emoji.trim().length > 191) {
    return res.status(400).json({
      error: "El nombre y el emoji no pueden superar los 191 caracteres"
    });
  }

  next();
}

module.exports = { validarTipoReaccion };
