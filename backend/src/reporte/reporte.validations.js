function validarReporte(req, res, next) {
    const { titulo, cuerpo, idZona, idCategoria } = req.body;

    if (!titulo || !cuerpo || !idZona || !idCategoria) {
        return res.status(400).json({
            error: "Título, cuerpo, zona y categoría son obligatorios"
        });
    }

    if (typeof titulo !== "string" || typeof cuerpo !== "string") {
        return res.status(400).json({
            error: "Título y cuerpo deben ser texto"
        });
    }

    if (!Number.isInteger(idZona) || !Number.isInteger(idCategoria)) {
        return res.status(400).json({
            error: "idZona e idCategoria deben ser números enteros"
        });
    }

    next();
}


function validarActualizacionReporte(req, res, next) {
    const { titulo, cuerpo, estado } = req.body;

    if (titulo && typeof titulo !== "string") {
        return res.status(400).json({ error: "El título debe ser texto" });
    }

    if (cuerpo && typeof cuerpo !== "string") {
        return res.status(400).json({ error: "El cuerpo debe ser texto" });
    }

    const estadosValidos = ["NO_VERIFICADO", "EN_INVESTIGACION", "VERIFICADO"];
    if (estado && !estadosValidos.includes(estado)) {
        return res.status(400).json({ error: "Estado no válido" });
    }

    next();
}

module.exports = {
    validarReporte,
    validarActualizacionReporte
};