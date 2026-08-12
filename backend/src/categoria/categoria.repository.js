const prisma = require("../prisma");

// OBTENER TODAS LAS CATEGORÍAS
async function obtenerCategorias() {
    return await prisma.categoria.findMany();
}

// OBTENER UNA CATEGORÍA POR ID
async function obtenerCategoriaPorId(id) {
    return await prisma.categoria.findUnique({
        where: { idCategoria: id }
    });
}

// CREAR UNA CATEGORÍA
async function crearCategoria(datos) {
    return await prisma.categoria.create({
        data: datos
    });
}

// ACTUALIZAR UNA CATEGORÍA
async function actualizarCategoria(id, datos) {
    return await prisma.categoria.update({
        where: { idCategoria: id },
        data: datos
    });
}

// ELIMINAR UNA CATEGORÍA
async function eliminarCategoria(id) {
    return await prisma.categoria.delete({
        where: { idCategoria: id }
    });
}

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};