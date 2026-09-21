const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>" -> nos quedamos solo con <token>

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = payload; // { idUsuario, nombre, rol }
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
}

async function verificarAdmin(req, res, next) {
  try {
    const usuarioRepository = require("../usuario/usuario.repository");
    const usuario = await usuarioRepository.obtenerUsuarioPorId(
      req.usuario.idUsuario
    );

    if (!usuario || !usuario.activo || usuario.rol !== "ADMIN") {
      return res.status(403).json({
        error: "Solo un administrador activo puede realizar esta acción"
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al comprobar los permisos"
    });
  }
}

module.exports = {
  verificarToken,
  verificarAdmin
};
