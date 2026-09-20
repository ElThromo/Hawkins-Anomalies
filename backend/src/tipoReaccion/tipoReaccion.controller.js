
const tipoReaccionService = require("./tipoReaccion.service");

async function obtenerTiposReaccion(req, res) {
  try {
    const tipos = await tipoReaccionService.obtenerTiposReaccion();
    return res.json(tipos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al obtener los tipos de reacción"
    });
  }
}

async function obtenerTipoReaccionPorId(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El ID debe ser un entero positivo"
      });
    }

    const tipo = await tipoReaccionService.obtenerTipoReaccionPorId(id);

    if (!tipo) {
      return res.status(404).json({
        error: "Tipo de reacción no encontrado"
      });
    }

    return res.json(tipo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al obtener el tipo de reacción"
    });
  }
}

async function crearTipoReaccion(req, res) {
  try {
    const tipoReaccion = await tipoReaccionService.crearTipoReaccion(
      req.body
    );

    return res.status(201).json({
      mensaje: "Tipo de reacción creado",
      tipoReaccion
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Ya existe un tipo de reacción con ese nombre"
      });
    }

    console.error(error);
    return res.status(500).json({
      error: "Error al crear el tipo de reacción"
    });
  }
}

async function actualizarTipoReaccion(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El ID debe ser un entero positivo"
      });
    }

    const tipoReaccion =
      await tipoReaccionService.actualizarTipoReaccion(id, req.body);

    return res.json({
      mensaje: "Tipo de reacción actualizado",
      tipoReaccion
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Tipo de reacción no encontrado"
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Ya existe un tipo de reacción con ese nombre"
      });
    }

    console.error(error);
    return res.status(500).json({
      error: "Error al actualizar el tipo de reacción"
    });
  }
}

async function eliminarTipoReaccion(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El ID debe ser un entero positivo"
      });
    }

    await tipoReaccionService.eliminarTipoReaccion(id);

    return res.json({
      mensaje: "Tipo de reacción eliminado"
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Tipo de reacción no encontrado"
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "No se puede eliminar un tipo que tiene reacciones asociadas"
      });
    }

    console.error(error);
    return res.status(500).json({
      error: "Error al eliminar el tipo de reacción"
    });
  }
}

module.exports = {
  obtenerTiposReaccion,
  obtenerTipoReaccionPorId,
  crearTipoReaccion,
  actualizarTipoReaccion,
eliminarTipoReaccion
};
