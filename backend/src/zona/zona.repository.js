const prisma = require("../prisma");

// OBTENER TODAS LAS ZONAS
async function obtenerZonas() {
    return await prisma.zona.findMany();
}

// OBTENER UNA ZONA POR ID
async function obtenerZonaPorId(id) {
    return await prisma.zona.findUnique({
        where: { idZona: id }
    });
}

// CREAR UNA ZONA
async function crearZona(datos) {
    return await prisma.zona.create({
        data: datos
    });
}

// ACTUALIZAR UNA ZONA
async function actualizarZona(id, datos) {
    return await prisma.zona.update({
        where: { idZona: id },
        data: datos
    });
}

// ELIMINAR UNA ZONA
async function eliminarZona(id) {
    return await prisma.zona.delete({
        where: { idZona: id }
    });
}

module.exports = {
    obtenerZonas,
    obtenerZonaPorId,
    crearZona,
    actualizarZona,
    eliminarZona
};
