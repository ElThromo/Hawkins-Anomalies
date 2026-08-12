const zonaService = require("./zona.service");

// OBTENER TODAS LAS ZONAS
async function obtenerZonas(req, res) {
    try {
        const zonas = await zonaService.obtenerZonas();
        res.json(zonas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las zonas" });
    }
}

// OBTENER UNA ZONA POR ID
async function obtenerZonaPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const zona = await zonaService.obtenerZonaPorId(id);

        if (!zona) {
            return res.status(404).json({ error: "Zona no encontrada" });
        }

        res.json(zona);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener la zona" });
    }
}

// CREAR UNA ZONA
async function crearZona(req, res) {
    try {
        const zona = await zonaService.crearZona(req.body);

        res.status(201).json({
            mensaje: "Zona creada",
            zona
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la zona" });
    }
}

// ACTUALIZAR UNA ZONA
async function actualizarZona(req, res) {
    try {
        const id = parseInt(req.params.id);
        const zona = await zonaService.actualizarZona(id, req.body);

        res.json({
            mensaje: "Zona actualizada",
            zona
        });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la zona" });
    }
}

// ELIMINAR UNA ZONA
async function eliminarZona(req, res) {
    try {
        const id = parseInt(req.params.id);
        await zonaService.eliminarZona(id);

        res.json({
            mensaje: "Zona eliminada"
        });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la zona" });
    }
}

module.exports = {
    obtenerZonas,
    obtenerZonaPorId,
    crearZona,
    actualizarZona,
    eliminarZona
};
