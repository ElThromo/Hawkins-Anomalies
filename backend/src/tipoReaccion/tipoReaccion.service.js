
const tipoReaccionRepository = require("./tipoReaccion.repository");

async function obtenerTiposReaccion() {
  return await tipoReaccionRepository.obtenerTiposReaccion();
}

async function obtenerTipoReaccionPorId(id) {
  return await tipoReaccionRepository.obtenerTipoReaccionPorId(id);
}

async function crearTipoReaccion(datos) {
  return await tipoReaccionRepository.crearTipoReaccion({
    nombre: datos.nombre.trim(),
    emoji: datos.emoji.trim()
  });
}

async function actualizarTipoReaccion(id, datos) {
  return await tipoReaccionRepository.actualizarTipoReaccion(id, {
    nombre: datos.nombre.trim(),
    emoji: datos.emoji.trim()
  });
}

async function eliminarTipoReaccion(id) {
  return await tipoReaccionRepository.eliminarTipoReaccion(id);
}

module.exports = {
  obtenerTiposReaccion,
  obtenerTipoReaccionPorId,
  crearTipoReaccion,
  actualizarTipoReaccion,
  eliminarTipoReaccion
};
