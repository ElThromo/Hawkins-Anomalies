const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuarioRepository = require("../usuario/usuario.repository");

async function login(email, contrasena) {
    const usuario = await usuarioRepository.obtenerUsuarioPorEmail(email);

    if (!usuario) {
        throw { status: 401, mensaje: "Email o contraseña incorrectos" };
    }

    if (!usuario.activo) {
        throw { status: 403, mensaje: "Esta cuenta está desactivada" };
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasenaHash);

    if (!contrasenaValida) {
        throw { status: 401, mensaje: "Email o contraseña incorrectos" };
    }

    const token = jwt.sign(
        {
            idUsuario: usuario.idUsuario,
            nombre: usuario.nombre,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        usuario: {
            idUsuario: usuario.idUsuario,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        }
    };
}

module.exports = { login };