
const prisma = require("../prisma");

async function obtenerReacciones(idReporte) {
  return await prisma.reaccion.findMany({
    where: idReporte === undefined ? undefined : { idReporte },
    orderBy: { idReaccion: "desc" }
  });
}

async function obtenerReaccionPorId(id) {
  return await prisma.reaccion.findUnique({
    where: { idReaccion: id }
  });
}

async function crearReaccion(datos) {
  return await prisma.reaccion.create({
    data: datos
  });
}

async function actualizarReaccion(id, idTipoReaccion) {
  return await prisma.reaccion.update({
    where: { idReaccion: id },
    data: { idTipoReaccion }
  });
}

async function eliminarReaccion(id) {
  return await prisma.reaccion.delete({
    where: { idReaccion: id }
  });
}

module.exports = {
  obtenerReacciones,
  obtenerReaccionPorId,
  crearReaccion,
  actualizarReaccion,
  eliminarReaccion
};
