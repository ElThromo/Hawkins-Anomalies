const prisma = require("../prisma");

// OBTENER TODOS LOS USUARIOS
async function obtenerUsuarios() {
    return await prisma.usuario.findMany({
        select: {
            idUsuario: true,
            nombre: true,
            email: true,
            rol: true,
            activo: true,
            fechaCreado: true
            // contrasenaHash NO se selecciona, nunca se expone
        }
    });
}

// OBTENER UN USUARIO POR ID
async function obtenerUsuarioPorId(id) {
    return await prisma.usuario.findUnique({
        where: { idUsuario: id },
        select: {
            idUsuario: true,
            nombre: true,
            email: true,
            rol: true,
            activo: true,
            fechaCreado: true
        }
    });
}

// OBTENER USUARIO POR EMAIL (útil para login)
async function obtenerUsuarioPorEmail(email) {
    return await prisma.usuario.findUnique({
        where: { email }
    });
}

// CREAR UN USUARIO
async function crearUsuario(datos) {
    return await prisma.usuario.create({
        data: datos,
        select: {
            idUsuario: true,
            nombre: true,
            email: true,
            rol: true,
            activo: true,
            fechaCreado: true
        }
    });
}

// ACTUALIZAR UN USUARIO
async function actualizarUsuario(id, datos) {
    return await prisma.usuario.update({
        where: { idUsuario: id },
        data: datos,
        select: {
            idUsuario: true,
            nombre: true,
            email: true,
            rol: true,
            activo: true,
            fechaCreado: true
        }
    });
}

// ELIMINAR UN USUARIO
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