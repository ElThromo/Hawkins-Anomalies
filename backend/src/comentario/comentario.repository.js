
const prisma = require("../prisma");

async function obtenerComentarios(idReporte) {
  return await prisma.comentario.findMany({
    where: idReporte === undefined ? undefined : { idReporte },
    orderBy: { fechaHora: "desc" }
  });
}

async function obtenerComentarioPorId(id) {
  return await prisma.comentario.findUnique({
    where: { idComentario: id }
  });
}

async function crearComentario(datos) {
  return await prisma.comentario.create({
    data: datos
  });
}

async function actualizarComentario(id, texto) {
  return await prisma.comentario.update({
    where: { idComentario: id },
    data: { texto }
  });
}

async function eliminarComentario(id) {
  return await prisma.comentario.delete({
    where: { idComentario: id }
  });
}

module.exports = {
  obtenerComentarios,
  obtenerComentarioPorId,
  crearComentario,
  actualizarComentario,
  eliminarComentario
};
