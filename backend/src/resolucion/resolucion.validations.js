function validarResolucion(req, res, next) {
    const { idReporte, resolucion, cuerpoResolucion } = req.body;

    if (
        idReporte === undefined ||
        !resolucion ||
        !cuerpoResolucion
    ) {
        return res.status(400).json({
            error: "ID de reporte, resolución y cuerpo de resolución son obligatorios"
        });
    }

    if (!Number.isInteger(Number(idReporte)) || Number(idReporte) <= 0) {
        return res.status(400).json({
            error: "El ID del reporte debe ser un entero positivo"
        });
    }

    if (typeof resolucion !== "string" || !resolucion.trim()) {
        return res.status(400).json({
            error: "La resolución debe ser un texto no vacío"
        });
    }

    if (
        typeof cuerpoResolucion !== "string" ||
        !cuerpoResolucion.trim()
    ) {
        return res.status(400).json({
            error: "El cuerpo de resolución debe ser un texto no vacío"
        });
    }

    req.body.idReporte = Number(idReporte);

    next();
}

module.exports = {
    validarResolucion
};