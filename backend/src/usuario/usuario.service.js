const bcrypt = require("bcrypt");
const usuarioRepository = require("./usuario.repository");

const SALT_ROUNDS = 10;

async function obtenerUsuarios() {
    return await usuarioRepository.obtenerUsuarios();
}

async function obtenerUsuarioPorId(id) {
    return await usuarioRepository.obtenerUsuarioPorId(id);
}

async function crearUsuario(datos) {
    const contrasenaHash = await bcrypt.hash(datos.contrasena, SALT_ROUNDS);

    return await usuarioRepository.crearUsuario({
        nombre: datos.nombre,
        email: datos.email,
        contrasenaHash
    });
}

async function actualizarUsuario(id, datos) {
    const datosActualizados = { ...datos };

    // Si viene contraseña nueva, la hasheamos; si no, no la tocamos
    if (datos.contrasena) {
        datosActualizados.contrasenaHash = await bcrypt.hash(datos.contrasena, SALT_ROUNDS);
        delete datosActualizados.contrasena;
    }

    return await usuarioRepository.actualizarUsuario(id, datosActualizados);
}

async function eliminarUsuario(id) {
    return await usuarioRepository.eliminarUsuario(id);
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};