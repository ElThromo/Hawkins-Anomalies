const vigilanteRepository = require("./vigilante.repository");

async function obtenerVigilantes() {
    return await vigilanteRepository.obtenerVigilantes();
}

async function obtenerVigilantePorId(id) {
    return await vigilanteRepository.obtenerVigilantePorId(id);
}

async function crearVigilante(datos) {
    return await vigilanteRepository.crearVigilante(datos);
}

async function actualizarVigilante(id, datos) {
    return await vigilanteRepository.actualizarVigilante(id, datos);
}

async function eliminarVigilante(id) {
    return await vigilanteRepository.eliminarVigilante(id);
}

module.exports = {
    obtenerVigilantes,
    obtenerVigilantePorId,
    crearVigilante,
    actualizarVigilante,
    eliminarVigilante
};