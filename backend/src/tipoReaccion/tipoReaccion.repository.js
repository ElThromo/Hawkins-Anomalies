
const prisma = require("../prisma");

async function obtenerTiposReaccion() {
  return await prisma.tipoReaccion.findMany({
    orderBy: { idTipoReaccion: "asc" }
  });
}

async function obtenerTipoReaccionPorId(id) {
  return await prisma.tipoReaccion.findUnique({
    where: { idTipoReaccion: id }
  });
}

async function crearTipoReaccion(datos) {
  return await prisma.tipoReaccion.create({
    data: {
      nombre: datos.nombre,
      emoji: datos.emoji
    }
  });
}

async function actualizarTipoReaccion(id, datos) {
  return await prisma.tipoReaccion.update({
    where: { idTipoReaccion: id },
    data: {
      nombre: datos.nombre,
      emoji: datos.emoji
    }
  });
}

async function eliminarTipoReaccion(id) {
  return await prisma.tipoReaccion.delete({
    where: { idTipoReaccion: id }
  });
}

module.exports = {
  obtenerTiposReaccion,
  obtenerTipoReaccionPorId,
  crearTipoReaccion,
  actualizarTipoReaccion,
  eliminarTipoReaccion
};
