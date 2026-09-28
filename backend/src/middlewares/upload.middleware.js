const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: function (req, file, cb) {
        const nombreUnico = `reporte-${req.params.id}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, nombreUnico);
    }
});

function filtrarArchivo(req, file, cb) {
    const tiposPermitidos = /jpeg|jpg|png|webp/;
    const extensionValida = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
    const mimeValido = tiposPermitidos.test(file.mimetype);

    if (extensionValida && mimeValido) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes (jpeg, jpg, png, webp)"));
    }
}

const upload = multer({
    storage,
    fileFilter: filtrarArchivo,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

module.exports = { upload };