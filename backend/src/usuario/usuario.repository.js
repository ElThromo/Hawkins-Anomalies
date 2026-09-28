const prisma = require("../prisma");

const camposSeguros = {
    idUsuario: true,
    nombre: true,
    email: true,
    rol: true,
    activo: true,
    fechaCreado: true,
    avatar: true
};

async function obtenerUsuarios() {
    return await prisma.usuario.findMany({ select: camposSeguros });
}

async function obtenerUsuarioPorId(id) {
    return await prisma.usuario.findUnique({
        where: { idUsuario: id },
        select: camposSeguros
    });
}

async function obtenerUsuarioPorEmail(email) {
    return await prisma.usuario.findUnique({
        where: { email }
    });
}

async function crearUsuario(datos) {
    return await prisma.usuario.create({
        data: datos,
        select: camposSeguros
    });
}

async function actualizarUsuario(id, datos) {
    return await prisma.usuario.update({
        where: { idUsuario: id },
        data: datos,
        select: camposSeguros
    });
}

async function eliminarUsuario(id) {
    return await prisma.usuario.delete({
        where: { idUsuario: id }
    });
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    obtenerUsuarioPorEmail,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};