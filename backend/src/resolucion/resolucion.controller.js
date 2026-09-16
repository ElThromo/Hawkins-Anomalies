const resolucionService = require("./resolucion.service");

// OBTENER TODAS
async function obtenerResoluciones(req, res) {
    try {
        const resoluciones = await resolucionService.obtenerResoluciones();

        res.json(resoluciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener las resoluciones"
        });
    }
}

// OBTENER UNA POR ID
async function obtenerResolucionPorId(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "El ID de la resolución debe ser un entero positivo"
            });
        }

        const resolucion =
            await resolucionService.obtenerResolucionPorId(id);

        if (!resolucion) {
            return res.status(404).json({
                error: "Resolución no encontrada"
            });
        }

        res.json(resolucion);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener la resolución"
        });
    }
}

// CREAR
async function crearResolucion(req, res) {
    try {
        const resolucion =
            await resolucionService.crearResolucion(req.body);

        res.status(201).json({
            mensaje: "Resolución creada",
            resolucion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al crear la resolución"
        });
    }
}

// ACTUALIZAR
async function actualizarResolucion(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "El ID de la resolución debe ser un entero positivo"
            });
        }

        const resolucionExistente =
            await resolucionService.obtenerResolucionPorId(id);

        if (!resolucionExistente) {
            return res.status(404).json({
                error: "Resolución no encontrada"
            });
        }

        const resolucion =
            await resolucionService.actualizarResolucion(id, req.body);

        res.json({
            mensaje: "Resolución actualizada",
            resolucion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al actualizar la resolución"
        });
    }
}

// ELIMINAR
async function eliminarResolucion(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "El ID de la resolución debe ser un entero positivo"
            });
        }

        const resolucion =
            await resolucionService.obtenerResolucionPorId(id);

        if (!resolucion) {
            return res.status(404).json({
                error: "Resolución no encontrada"
            });
        }

        await resolucionService.eliminarResolucion(id);

        res.json({
            mensaje: "Resolución eliminada"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al eliminar la resolución"
        });
    }
}

module.exports = {
    obtenerResoluciones,
    obtenerResolucionPorId,
    crearResolucion,
    actualizarResolucion,
    eliminarResolucion
};