const express = require("express");
const cors = require("cors");
const zonaRoutes = require("./zona/zona.routes");
const categoriaRoutes = require("./categoria/categoria.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/zonas", zonaRoutes);
app.use("/categorias", categoriaRoutes);

app.listen(3000, () => {

    console.log("Servidor funcionando en puerto 3000");

});
