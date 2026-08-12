import { useEffect, useState } from "react";

type Zona = {
  idZona: number;
  nombre: string;
  descripcion: string;
  nivelPeligro: string;
};

function Zonas() {
  const [zonas, setZonas] = useState<Zona[]>([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nivelPeligro, setNivelPeligro] = useState("");

  const [idEditando, setIdEditando] = useState<number | null>(null);

  useEffect(() => {
    cargarZonas();
  }, []);

  async function cargarZonas() {
    const respuesta = await fetch("http://localhost:3000/zonas");
    const datos = await respuesta.json();
    setZonas(datos);
  }

  async function guardarZona() {
    if (idEditando === null) {
      await crearZona();
    } else {
      await actualizarZona();
    }
  }

  async function crearZona() {
    const respuesta = await fetch("http://localhost:3000/zonas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        nivelPeligro,
      }),
    });

    if (!respuesta.ok) {
      const error = await respuesta.json();
      alert(error.error);
      return;
    }

    limpiarFormulario();
    await cargarZonas();
  }

  async function actualizarZona() {
    const respuesta = await fetch(
      `http://localhost:3000/zonas/${idEditando}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          nivelPeligro,
        }),
      }
    );

    if (!respuesta.ok) {
      const error = await respuesta.json();
      alert(error.error);
      return;
    }

    limpiarFormulario();
    await cargarZonas();
  }

  function editarZona(zona: Zona) {
    setIdEditando(zona.idZona);
    setNombre(zona.nombre);
    setDescripcion(zona.descripcion);
    setNivelPeligro(zona.nivelPeligro);
  }

  async function eliminarZona(idZona: number) {
    const confirmar = window.confirm(
      "¿Estás seguro de que querés eliminar esta zona?"
    );

    if (!confirmar) {
      return;
    }

    const respuesta = await fetch(
      `http://localhost:3000/zonas/${idZona}`,
      {
        method: "DELETE",
      }
    );

    if (!respuesta.ok) {
      const error = await respuesta.json();
      alert(error.error);
      return;
    }

    await cargarZonas();
  }

  function limpiarFormulario() {
    setNombre("");
    setDescripcion("");
    setNivelPeligro("");
    setIdEditando(null);
  }

  return (
    <div>
      <h1>Zonas</h1>

      <h2>{idEditando === null ? "Crear zona" : "Editar zona"}</h2>

      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nivel de peligro"
          value={nivelPeligro}
          onChange={(e) => setNivelPeligro(e.target.value)}
        />

        <button onClick={guardarZona}>
          {idEditando === null ? "Crear zona" : "Guardar cambios"}
        </button>

        {idEditando !== null && (
          <button onClick={limpiarFormulario}>Cancelar</button>
        )}
      </div>

      <h2>Listado de zonas</h2>

      {zonas.map((zona) => (
        <div key={zona.idZona}>
          <h3>{zona.nombre}</h3>

          <p>{zona.descripcion}</p>

          <p>Nivel de peligro: {zona.nivelPeligro}</p>

          <button onClick={() => editarZona(zona)}>Editar</button>

          <button onClick={() => eliminarZona(zona.idZona)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Zonas;
