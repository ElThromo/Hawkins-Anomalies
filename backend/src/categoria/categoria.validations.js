function validarCategoria(req, res, next) {
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({
      error: "Nombre y descripción son obligatorios"
    });
  }

  if (
    typeof nombre !== "string" ||
    typeof descripcion !== "string"
  ) {
    return res.status(400).json({
      error: "Los datos de la categoría deben ser texto"
    });
  }

  next();
}

module.exports = {
  validarCategoria
};