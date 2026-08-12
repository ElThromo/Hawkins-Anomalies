const zonaRepository = require("./zona.repository");

async function obtenerZonas() {
    return await zonaRepository.obtenerZonas();
}

async function obtenerZonaPorId(id) {
    return await zonaRepository.obtenerZonaPorId(id);
}

async function crearZona(datos) {
    return await zonaRepository.crearZona(datos);
}

async function actualizarZona(id, datos) {
    return await zonaRepository.actualizarZona(id, datos);
}

async function eliminarZona(id) {
    return await zonaRepository.eliminarZona(id);
}

module.exports = {
    obtenerZonas,
    obtenerZonaPorId,
    crearZona,
    actualizarZona,
    eliminarZona
};
