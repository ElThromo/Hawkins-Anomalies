const categoriaRepository = require("./categoria.repository");

async function obtenerCategorias() {
    return await categoriaRepository.obtenerCategorias();
}

async function obtenerCategoriaPorId(id) {
    return await categoriaRepository.obtenerCategoriaPorId(id);
}

async function crearCategoria(datos) {
    return await categoriaRepository.crearCategoria(datos);
}

async function actualizarCategoria(id, datos) {
    return await categoriaRepository.actualizarCategoria(id, datos);
}

async function eliminarCategoria(id) {
    return await categoriaRepository.eliminarCategoria(id);
}

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};