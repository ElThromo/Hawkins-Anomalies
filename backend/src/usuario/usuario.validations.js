function validarUsuario(req, res, next) {
    const { nombre, email, contrasena } = req.body;

    if (!nombre || !email || !contrasena) {
        return res.status(400).json({
            error: "Nombre, email y contraseña son obligatorios"
        });
    }

    if (typeof nombre !== "string" || typeof email !== "string" || typeof contrasena !== "string") {
        return res.status(400).json({
            error: "Los datos deben ser texto"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: "El email no tiene un formato válido"
        });
    }

    if (contrasena.length < 6) {
        return res.status(400).json({
            error: "La contraseña debe tener al menos 6 caracteres"
        });
    }

    next();
}

function validarActualizacionUsuario(req, res, next) {
    const { nombre, email, contrasena } = req.body;

    if (nombre && typeof nombre !== "string") {
        return res.status(400).json({ error: "El nombre debe ser texto" });
    }

    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "El email no tiene un formato válido" });
        }
    }

    if (contrasena && contrasena.length < 6) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    next();
}

module.exports = {
    validarUsuario,
    validarActualizacionUsuario
};