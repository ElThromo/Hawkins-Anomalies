const reporteRepository = require("./reporte.repository");

async function obtenerReportes() {
    return await reporteRepository.obtenerReportes();
}

async function obtenerReportePorId(id) {
    return await reporteRepository.obtenerReportePorId(id);
}

async function crearReporte(datos, idUsuario) {
    return await reporteRepository.crearReporte({
        titulo: datos.titulo,
        cuerpo: datos.cuerpo,
        idZona: datos.idZona,
        idUsuario: idUsuario,
        idCategoria: datos.idCategoria
    });
}

async function actualizarReporte(id, datos) {
    return await reporteRepository.actualizarReporte(id, datos);
}

async function eliminarReporte(id) {
    return await reporteRepository.eliminarReporte(id);
}

module.exports = {
    obtenerReportes,
    obtenerReportePorId,
    crearReporte,
    actualizarReporte,
    eliminarReporte
};