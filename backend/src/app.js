const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let usuarios = [
    {
        id: 1,
        nombre: "Ignacio",
        email: "igna@gmail.com"
    }
];



// GET ALL
app.get("/usuarios", (req, res) => {

    res.json(usuarios);

});



// CREATE
app.post("/usuarios", (req, res) => {

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        email: req.body.email
    };

    usuarios.push(nuevoUsuario);

    res.json({
        mensaje: "Usuario creado",
        usuario: nuevoUsuario
    });

});



// UPDATE
app.put("/usuarios/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if(!usuario){
        return res.status(404).json({
            error: "Usuario no encontrado"
        });
    }

    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;

    res.json({
        mensaje: "Usuario actualizado",
        usuario
    });

});



// DELETE
app.delete("/usuarios/:id", (req, res) => {

    const id = parseInt(req.params.id);

    usuarios = usuarios.filter(u => u.id !== id);

    res.json({
        mensaje: "Usuario eliminado"
    });

});



app.listen(3000, () => {

    console.log("Servidor funcionando en puerto 3000");

});