function validarVigilante(req, res, next) {
    const { nombre, idZona } = req.body;

    if (!nombre || idZona === undefined) {
        return res.status(400).json({
            error: "Nombre e ID de zona son obligatorios"
        });
    }

    if (typeof nombre !== "string") {
        return res.status(400).json({
            error: "El nombre debe ser texto"
        });
    }

    if (!nombre.trim()) {
        return res.status(400).json({
            error: "El nombre es obligatorio"
        });
    }

    const zonaId = Number(idZona);

    if (!Number.isInteger(zonaId) || zonaId <= 0) {
        return res.status(400).json({
            error: "El ID de la zona debe ser un entero positivo"
        });
    }

    req.body.idZona = zonaId;

    next();
}

module.exports = {
    validarVigilante
};