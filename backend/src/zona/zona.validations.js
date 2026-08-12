function validarZona(req, res, next) {
  const { nombre, descripcion, nivelPeligro } = req.body;

  if (!nombre || !descripcion || !nivelPeligro) {
    return res.status(400).json({
      error: "Nombre, descripción y nivel de peligro son obligatorios"
    });
  }

  if (
    typeof nombre !== "string" ||
    typeof descripcion !== "string" ||
    typeof nivelPeligro !== "string"
  ) {
    return res.status(400).json({
      error: "Los datos de la zona deben ser texto"
    });
  }

  next();
}

module.exports = {
  validarZona
};
