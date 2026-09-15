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

  if (!nombre.trim() || !descripcion.trim() || !nivelPeligro.trim()) {
    return res.status(400).json({
      error: "Nombre, descripción y nivel de peligro son obligatorios"
    });
  }
  
  if (/\d/.test(nombre) || /\d/.test(descripcion) || /\d/.test(nivelPeligro)) {
  return res.status(400).json({
    error: "Los campos de la zona deben contener texto, no números."
  });
  }

  next();
}

module.exports = {
  validarZona
};
