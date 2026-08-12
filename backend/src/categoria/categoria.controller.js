const categoriaService = require("./categoria.service");

// OBTENER TODAS LAS CATEGORÍAS
async function obtenerCategorias(req, res) {
    try {
        const categorias = await categoriaService.obtenerCategorias();
        res.json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las categorías" });
    }
}

// OBTENER UNA CATEGORÍA POR ID
async function obtenerCategoriaPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const categoria = await categoriaService.obtenerCategoriaPorId(id);

        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener la categoría" });
    }
}

// CREAR UNA CATEGORÍA
async function crearCategoria(req, res) {
    try {
        const categoria = await categoriaService.crearCategoria(req.body);

        res.status(201).json({
            mensaje: "Categoría creada",
            categoria
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la categoría" });
    }
}

// ACTUALIZAR UNA CATEGORÍA
async function actualizarCategoria(req, res) {
    try {
        const id = parseInt(req.params.id);
        const categoria = await categoriaService.actualizarCategoria(id, req.body);

        res.json({
            mensaje: "Categoría actualizada",
            categoria
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la categoría" });
    }
}

// ELIMINAR UNA CATEGORÍA
async function eliminarCategoria(req, res) {
    try {
        const id = parseInt(req.params.id);
        await categoriaService.eliminarCategoria(id);

        res.json({
            mensaje: "Categoría eliminada"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar la categoría" });
    }
}

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};