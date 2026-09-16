require("dotenv").config(); // 👈 PRIMERA LÍNEA, antes de todo

const express = require("express");
const cors = require("cors");

const authRoutes = require("./auth/auth.routes");

const zonaRoutes = require("./zona/zona.routes");
const categoriaRoutes = require("./categoria/categoria.routes");
const usuarioRoutes = require("./usuario/usuario.routes");
const reporteRoutes = require("./reporte/reporte.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/zonas", zonaRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/reportes", reporteRoutes);

app.listen(3000, () => {
    console.log("Servidor funcionando en puerto 3000");
});
