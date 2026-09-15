
const comentarioRepository = require("./comentario.repository");

async function obtenerComentarios(idReporte) {
  return await comentarioRepository.obtenerComentarios(idReporte);
}

async function obtenerComentarioPorId(id) {
  return await comentarioRepository.obtenerComentarioPorId(id);
}

async function crearComentario(datos, idUsuario) {
  return await comentarioRepository.crearComentario({
    texto: datos.texto.trim(),
    idReporte: datos.idReporte,
    idUsuario
  });
}

async function comprobarAutor(id, idUsuario) {
  const comentario = await comentarioRepository.obtenerComentarioPorId(id);

  if (!comentario) return null;

  if (comentario.idUsuario !== idUsuario) {
    const error = new Error("No podés editar o eliminar comentarios de otra persona");
    error.status = 403;
    throw error;
  }

  return comentario;
}

async function actualizarComentario(id, texto, idUsuario) {
  const comentario = await comprobarAutor(id, idUsuario);
  if (!comentario) return null;

  return await comentarioRepository.actualizarComentario(id, texto.trim());
}

async function eliminarComentario(id, idUsuario) {
  const comentario = await comprobarAutor(id, idUsuario);
  if (!comentario) return null;

  return await comentarioRepository.eliminarComentario(id);
}

module.exports = {
  obtenerComentarios,
  obtenerComentarioPorId,
  crearComentario,
  actualizarComentario,
  eliminarComentario
};
