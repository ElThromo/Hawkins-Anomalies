
const reaccionRepository = require("./reaccion.repository");

async function obtenerReacciones(idReporte) {
  return await reaccionRepository.obtenerReacciones(idReporte);
}

async function obtenerReaccionPorId(id) {
  return await reaccionRepository.obtenerReaccionPorId(id);
}

async function crearReaccion(datos, idUsuario) {
  return await reaccionRepository.crearReaccion({
    idTipoReaccion: datos.idTipoReaccion,
    idReporte: datos.idReporte,
    idUsuario
  });
}

async function comprobarAutor(id, idUsuario) {
  const reaccion = await reaccionRepository.obtenerReaccionPorId(id);

  if (!reaccion) return null;

  if (reaccion.idUsuario !== idUsuario) {
    const error = new Error(
      "No podés modificar o eliminar reacciones de otra persona"
    );
    error.status = 403;
    throw error;
  }

  return reaccion;
}

async function actualizarReaccion(id, idTipoReaccion, idUsuario) {
  const reaccion = await comprobarAutor(id, idUsuario);

  if (!reaccion) return null;

  return await reaccionRepository.actualizarReaccion(id, idTipoReaccion);
}

async function eliminarReaccion(id, idUsuario) {
  const reaccion = await comprobarAutor(id, idUsuario);

  if (!reaccion) return null;

  return await reaccionRepository.eliminarReaccion(id);
}

module.exports = {
  obtenerReacciones,
  obtenerReaccionPorId,
  crearReaccion,
  actualizarReaccion,
  eliminarReaccion
};
