const resolucionRepository = require("./resolucion.repository");

async function obtenerResoluciones() {
    return await resolucionRepository.obtenerResoluciones();
}

async function obtenerResolucionPorId(id) {
    return await resolucionRepository.obtenerResolucionPorId(id);
}

async function crearResolucion(datos) {
    return await resolucionRepository.crearResolucion(datos);
}

async function actualizarResolucion(id, datos) {
    return await resolucionRepository.actualizarResolucion(id, datos);
}

async function eliminarResolucion(id) {
    return await resolucionRepository.eliminarResolucion(id);
}

module.exports = {
    obtenerResoluciones,
    obtenerResolucionPorId,
    crearResolucion,
    actualizarResolucion,
    eliminarResolucion
};