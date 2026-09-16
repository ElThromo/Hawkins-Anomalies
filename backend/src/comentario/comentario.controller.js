
const comentarioService = require("./comentario.service");

async function obtenerComentarios(req, res) {
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

    const comentarios = await comentarioService.obtenerComentarios(idReporte);
    return res.json(comentarios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener los comentarios" });
  }
}

async function obtenerComentarioPorId(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El ID del comentario debe ser un entero positivo"
      });
    }

    const comentario = await comentarioService.obtenerComentarioPorId(id);

    if (!comentario) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    return res.json(comentario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener el comentario" });
  }
}

async function crearComentario(req, res) {
  try {
    const comentario = await comentarioService.crearComentario(
      req.body,
      req.usuario.idUsuario
    );

    return res.status(201).json({
      mensaje: "Comentario creado",
      comentario
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2003") {
      return res.status(400).json({
        error: "El reporte o usuario asociado no existe"
      });
    }

    return res.status(500).json({ error: "Error al crear el comentario" });
  }
}

async function actualizarComentario(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El ID del comentario debe ser un entero positivo"
      });
    }

    const comentario = await comentarioService.actualizarComentario(
      id,
      req.body.texto,
      req.usuario.idUsuario
    );

    if (!comentario) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    return res.json({
      mensaje: "Comentario actualizado",
      comentario
    });
  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: "Error al actualizar el comentario" });
  }
}

async function eliminarComentario(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "El ID del comentario debe ser un entero positivo"
      });
    }

    const comentario = await comentarioService.eliminarComentario(
      id,
      req.usuario.idUsuario
    );

    if (!comentario) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    return res.json({ mensaje: "Comentario eliminado" });
  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: "Error al eliminar el comentario" });
  }
}

module.exports = {
  obtenerComentarios,
  obtenerComentarioPorId,
  crearComentario,
  actualizarComentario,
  eliminarComentario
};
