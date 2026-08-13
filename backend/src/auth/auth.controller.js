const authService = require("./auth.service");

async function login(req, res) {
    try {
        const { email, contrasena } = req.body;

        if (!email || !contrasena) {
            return res.status(400).json({ error: "Email y contraseña son obligatorios" });
        }

        const resultado = await authService.login(email, contrasena);
        res.json(resultado);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.mensaje });
        }
        console.error(error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
}

module.exports = { login };