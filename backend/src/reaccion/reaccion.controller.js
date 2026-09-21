
const reaccionService = require("./reaccion.service");

async function obtenerReacciones(req, res) {
  try {
    let idReporte;

    if (req.query.idReporte !== undefined) {
      idReporte = Number(req.query.idReporte);

      if (!Number.isInteger(idReporte) || idReporte <= 0) {
        return res.status(400).json({
          error: "idReporte debe ser un entero positivo"
        });
      }
    }

    const reacciones = await reaccionService.obtenerReacciones(idReporte);
    return res.json(reacciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al obtener las reacciones"
    });
  }
}

async function obtenerReaccionPorId(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El ID de la reacción debe ser un entero positivo"
      });
    }

    const reaccion = await reaccionService.obtenerReaccionPorId(id);

    if (!reaccion) {
      return res.status(404).json({
        error: "Reacción no encontrada"
      });
    }

    return res.json(reaccion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al obtener la reacción"
    });
  }
}

async function crearReaccion(req, res) {
  try {
    const reaccion = await reaccionService.crearReaccion(
      req.body,
      req.usuario.idUsuario
    );

    return res.status(201).json({
      mensaje: "Reacción creada",
      reaccion
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Ya reaccionaste a este reporte"
      });
    }

    if (error.code === "P2003") {
      return res.status(400).json({
        error: "El reporte, usuario o tipo de reacción asociado no existe"
      });
    }

    console.error(error);
    return res.status(500).json({
      error: "Error al crear la reacción"
    });
  }
}

async function actualizarReaccion(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El ID de la reacción debe ser un entero positivo"
      });
    }

    const reaccion = await reaccionService.actualizarReaccion(
      id,
      req.body.idTipoReaccion,
      req.usuario.idUsuario
    );

    if (!reaccion) {
      return res.status(404).json({
        error: "Reacción no encontrada"
      });
    }

    return res.json({
      mensaje: "Reacción actualizada",
      reaccion
    });
  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({
        error: error.message
      });
    }

if (error.code === "P2003") {
  return res.status(400).json({
    error: "El tipo de reacción indicado no existe"
  });
}

    console.error(error);
    return res.status(500).json({
      error: "Error al actualizar la reacción"
    });
  }
}

async function eliminarReaccion(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El ID de la reacción debe ser un entero positivo"
      });
    }

    const reaccion = await reaccionService.eliminarReaccion(
      id,
      req.usuario.idUsuario
    );

    if (!reaccion) {
      return res.status(404).json({
        error: "Reacción no encontrada"
      });
    }

    return res.json({
      mensaje: "Reacción eliminada"
    });
  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({
        error: error.message
      });
    }

    console.error(error);
    return res.status(500).json({
      error: "Error al eliminar la reacción"
    });
  }
}

module.exports = {
  obtenerReacciones,
  obtenerReaccionPorId,
  crearReaccion,
  actualizarReaccion,
  eliminarReaccion
};
