const usuarioService = require("./usuario.service");

async function obtenerUsuarios(req, res) {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
}

async function obtenerUsuarioPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const usuario = await usuarioService.obtenerUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
}

async function crearUsuario(req, res) {
    try {
        const usuario = await usuarioService.crearUsuario(req.body);

        res.status(201).json({
            mensaje: "Usuario creado",
            usuario
        });
    } catch (error) {
        console.error(error);

        // Prisma tira error si el email o nombre único ya existe
        if (error.code === "P2002") {
            return res.status(409).json({ error: "El nombre de usuario o email ya está en uso" });
        }

        res.status(500).json({ error: "Error al crear el usuario" });
    }
}

async function actualizarUsuario(req, res) {
    try {
        const id = parseInt(req.params.id);
        const usuario = await usuarioService.actualizarUsuario(id, req.body);

        res.json({
            mensaje: "Usuario actualizado",
            usuario
        });
    } catch (error) {
        console.error(error);

        if (error.code === "P2002") {
            return res.status(409).json({ error: "El nombre de usuario o email ya está en uso" });
        }

        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
}

async function eliminarUsuario(req, res) {
    try {
        const id = parseInt(req.params.id);
        await usuarioService.eliminarUsuario(id);

        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};