const reporteService = require("./reporte.service");

async function obtenerReportes(req, res) {
    try {
        const reportes = await reporteService.obtenerReportes();
        res.json(reportes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los reportes" });
    }
}

async function obtenerReportePorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const reporte = await reporteService.obtenerReportePorId(id);

        if (!reporte) {
            return res.status(404).json({ error: "Reporte no encontrado" });
        }

        res.json(reporte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el reporte" });
    }
}

async function crearReporte(req, res) {
    try {
        const reporte = await reporteService.crearReporte(req.body, req.usuario.idUsuario);

        res.status(201).json({
            mensaje: "Reporte creado",
            reporte
        });
    } catch (error) {
        console.error(error);

        if (error.code === "P2003") {
            return res.status(400).json({ error: "Zona o categoría no válidos" });
        }

        res.status(500).json({ error: "Error al crear el reporte" });
    }
}

async function actualizarReporte(req, res) {
    try {
        const id = parseInt(req.params.id);
        const reporte = await reporteService.actualizarReporte(id, req.body);

        res.json({
            mensaje: "Reporte actualizado",
            reporte
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el reporte" });
    }
}

async function eliminarReporte(req, res) {
    try {
        const id = parseInt(req.params.id);
        await reporteService.eliminarReporte(id);

        res.json({ mensaje: "Reporte eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el reporte" });
    }
}

async function subirImagenes(req, res) {
    try {
        const idReporte = parseInt(req.params.id);

        // Confirmá que el reporte exista
        const reporte = await reporteService.obtenerReportePorId(idReporte);
        if (!reporte) {
            return res.status(404).json({ error: "Reporte no encontrado" });
        }

        // Solo el autor del reporte (o un admin) puede agregarle imágenes
        const esAutor = reporte.usuario.idUsuario === req.usuario.idUsuario;
        const esAdmin = req.usuario.rol === "ADMIN";

        if (!esAutor && !esAdmin) {
            return res.status(403).json({ error: "No tenés permiso para modificar este reporte" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No se recibió ninguna imagen" });
        }

        await reporteService.agregarImagenes(idReporte, req.files);

        const reporteActualizado = await reporteService.obtenerReportePorId(idReporte);

        res.status(201).json({
            mensaje: "Imágenes subidas correctamente",
            reporte: reporteActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al subir las imágenes" });
    }
}


module.exports = {
    obtenerReportes,
    obtenerReportePorId,
    crearReporte,
    actualizarReporte,
    eliminarReporte,
    subirImagenes
};