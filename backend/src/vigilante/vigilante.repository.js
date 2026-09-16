const prisma = require("../prisma");

// OBTENER TODOS LOS VIGILANTES
async function obtenerVigilantes() {
    return await prisma.vigilante.findMany();
}

// OBTENER UN VIGILANTE POR ID
async function obtenerVigilantePorId(id) {
    return await prisma.vigilante.findUnique({
        where: { idVigilante: id }
    });
}

// CREAR UN VIGILANTE
async function crearVigilante(datos) {
    return await prisma.vigilante.create({
        data: datos
    });
}

// ACTUALIZAR UN VIGILANTE
async function actualizarVigilante(id, datos) {
    return await prisma.vigilante.update({
        where: { idVigilante: id },
        data: datos
    });
}

// ELIMINAR UN VIGILANTE
async function eliminarVigilante(id) {
    return await prisma.vigilante.delete({
        where: { idVigilante: id }
    });
}

module.exports = {
    obtenerVigilantes,
    obtenerVigilantePorId,
    crearVigilante,
    actualizarVigilante,
    eliminarVigilante
};