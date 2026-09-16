const prisma = require("../prisma");

// OBTENER TODAS LAS RESOLUCIONES
async function obtenerResoluciones() {
    return await prisma.resolucion.findMany();
}

// OBTENER UNA RESOLUCIÓN POR ID
async function obtenerResolucionPorId(id) {
    return await prisma.resolucion.findUnique({
        where: { idResolucion: id }
    });
}

// CREAR UNA RESOLUCIÓN
async function crearResolucion(datos) {
    return await prisma.resolucion.create({
        data: datos
    });
}

// ACTUALIZAR UNA RESOLUCIÓN
async function actualizarResolucion(id, datos) {
    return await prisma.resolucion.update({
        where: { idResolucion: id },
        data: datos
    });
}

// ELIMINAR UNA RESOLUCIÓN
async function eliminarResolucion(id) {
    return await prisma.resolucion.delete({
        where: { idResolucion: id }
    });
}

module.exports = {
    obtenerResoluciones,
    obtenerResolucionPorId,
    crearResolucion,
    actualizarResolucion,
    eliminarResolucion
};