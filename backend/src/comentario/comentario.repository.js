
const prisma = require("../prisma");

const incluirUsuario = {
  usuario: {
    select: {
      idUsuario: true,
      nombre: true
    }
  }
};

async function obtenerComentarios(idReporte) {
  return await prisma.comentario.findMany({
    where: idReporte === undefined ? undefined : { idReporte },
    orderBy: { fechaHora: "desc" },
    include: incluirUsuario
  });
}

async function obtenerComentarioPorId(id) {
  return await prisma.comentario.findUnique({
    where: { idComentario: id },
    include: incluirUsuario
  });
}

async function crearComentario(datos) {
  return await prisma.comentario.create({
    data: datos,
    include: incluirUsuario
  });
}

async function actualizarComentario(id, texto) {
  return await prisma.comentario.update({
    where: { idComentario: id },
    data: { texto },
    include: incluirUsuario
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
