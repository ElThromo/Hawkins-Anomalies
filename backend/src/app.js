require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./auth/auth.routes");

const zonaRoutes = require("./zona/zona.routes");
const categoriaRoutes = require("./categoria/categoria.routes");
const usuarioRoutes = require("./usuario/usuario.routes");
const reporteRoutes = require("./reporte/reporte.routes");
const comentarioRoutes = require("./comentario/comentario.routes");
const vigilanteRoutes = require("./vigilante/vigilante.routes");
const resolucionRoutes = require("./resolucion/resolucion.routes");
const reaccionRoutes = require("./reaccion/reaccion.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/zonas", zonaRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/comentarios", comentarioRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/reportes", reporteRoutes);
app.use("/vigilantes", vigilanteRoutes);
app.use("/resoluciones", resolucionRoutes);
app.use("/reacciones", reaccionRoutes);

app.listen(3000, () => {
    console.log("Servidor funcionando en puerto 3000");
});
