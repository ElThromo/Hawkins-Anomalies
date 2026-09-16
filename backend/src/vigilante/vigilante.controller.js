const vigilanteService = require("./vigilante.service");

// OBTENER TODOS LOS VIGILANTES
async function obtenerVigilantes(req, res) {
    try {
        const vigilantes = await vigilanteService.obtenerVigilantes();
        res.json(vigilantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener los vigilantes"
        });
    }
}

// OBTENER UN VIGILANTE POR ID
async function obtenerVigilantePorId(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "El ID del vigilante debe ser un entero positivo"
            });
        }

        const vigilante = await vigilanteService.obtenerVigilantePorId(id);

        if (!vigilante) {
            return res.status(404).json({
                error: "Vigilante no encontrado"
            });
        }

        res.json(vigilante);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener el vigilante"
        });
    }
}

// CREAR UN VIGILANTE
async function crearVigilante(req, res) {
    try {
        const vigilante = await vigilanteService.crearVigilante(req.body);

        res.status(201).json({
            mensaje: "Vigilante creado",
            vigilante
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al crear el vigilante"
        });
    }
}

// ACTUALIZAR UN VIGILANTE
async function actualizarVigilante(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "El ID del vigilante debe ser un entero positivo"
            });
        }

        const vigilanteExistente =
            await vigilanteService.obtenerVigilantePorId(id);

        if (!vigilanteExistente) {
            return res.status(404).json({
                error: "Vigilante no encontrado"
            });
        }

        const vigilante =
            await vigilanteService.actualizarVigilante(id, req.body);

        res.json({
            mensaje: "Vigilante actualizado",
            vigilante
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al actualizar el vigilante"
        });
    }
}

// ELIMINAR UN VIGILANTE
async function eliminarVigilante(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "El ID del vigilante debe ser un entero positivo"
            });
        }

        const vigilante =
            await vigilanteService.obtenerVigilantePorId(id);

        if (!vigilante) {
            return res.status(404).json({
                error: "Vigilante no encontrado"
            });
        }

        await vigilanteService.eliminarVigilante(id);

        res.json({
            mensaje: "Vigilante eliminado"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al eliminar el vigilante"
        });
    }
}

module.exports = {
    obtenerVigilantes,
    obtenerVigilantePorId,
    crearVigilante,
    actualizarVigilante,
    eliminarVigilante
};