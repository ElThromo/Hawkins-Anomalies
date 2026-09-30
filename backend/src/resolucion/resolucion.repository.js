
const prisma = require("../prisma");

// OBTENER TODAS LAS RESOLUCIONES
async function obtenerResoluciones(idReporte) {
    return await prisma.resolucion.findMany({
        where: idReporte === undefined ? {} : { idReporte },
        orderBy: [
            { fechaHora: "desc" },
            { idResolucion: "desc" }
        ]
    });
}

// OBTENER UNA RESOLUCIÓN POR ID
async function obtenerResolucionPorId(id) {
    return await prisma.resolucion.findUnique({
        where: { idResolucion: id }
    });
}

// CREAR UNA RESOLUCIÓN
async function crearResolucion(datos) {
    return await prisma.$transaction(async (tx) => {
        const resolucion = await tx.resolucion.create({
            data: {
                idReporte: datos.idReporte,
                resolucion: datos.resolucion.trim(),
                cuerpoResolucion: datos.cuerpoResolucion.trim()
            }
        });

        await tx.reporte.update({
            where: { idReporte: datos.idReporte },
            data: { estado: "RESUELTO" }
        });

        return resolucion;
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
