const prisma = require("../prisma");

// Config reutilizable: qué traer de las relaciones cada vez que se pide un reporte
const incluirRelaciones = {
    zona: {
        select: { idZona: true, nombre: true, nivelPeligro: true }
    },
    usuario: {
        select: { idUsuario: true, nombre: true } // nunca traer email ni contrasenaHash
    },
    categoria: {
        select: { idCategoria: true, nombre: true }
    },
    imagenes: true
};

// OBTENER TODOS LOS REPORTES
async function obtenerReportes() {
    return await prisma.reporte.findMany({
        include: incluirRelaciones,
        orderBy: { fechaHora: "desc" }
    });
}

// OBTENER UN REPORTE POR ID
async function obtenerReportePorId(id) {
    return await prisma.reporte.findUnique({
        where: { idReporte: id },
        include: incluirRelaciones
    });
}

// CREAR UN REPORTE
async function crearReporte(datos) {
    return await prisma.reporte.create({
        data: datos,
        include: incluirRelaciones
    });
}

// ACTUALIZAR UN REPORTE
async function actualizarReporte(id, datos) {
    return await prisma.reporte.update({
        where: { idReporte: id },
        data: datos,
        include: incluirRelaciones
    });
}

// ELIMINAR UN REPORTE
async function eliminarReporte(id) {
    return await prisma.reporte.delete({
        where: { idReporte: id }
    });
}

module.exports = {
    obtenerReportes,
    obtenerReportePorId,
    crearReporte,
    actualizarReporte,
    eliminarReporte
};