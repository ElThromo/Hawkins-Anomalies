import { useEffect, useState } from "react";

type Zona = {
  idZona: number;
  nombre: string;
  descripcion: string;
  nivelPeligro: string;
};

const nivelesPeligro = [
  { nombre: "BAJO", color: "#42c76b" },
  { nombre: "MEDIO", color: "#e6c44a" },
  { nombre: "ALTO", color: "#f28c45" },
  { nombre: "CRITICO", color: "#e84b5b" },
];

function colorDelNivel(nivel: string) {
  return nivelesPeligro.find((opcion) => opcion.nombre === nivel)?.color ?? "#d1d1d1";
}

function Zonas() {
  const [zonas, setZonas] = useState<Zona[]>([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nivelPeligro, setNivelPeligro] = useState("");
  const [nivelesAbiertos, setNivelesAbiertos] = useState(false);

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
    setNivelesAbiertos(false);
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
    setNivelesAbiertos(false);
    setIdEditando(null);
  }

  return (
    <div className="zonas-page">
      <h1>Zonas</h1>

      <h2>{idEditando === null ? "Crear zona" : "Editar zona"}</h2>

      <div className="zonas-form">
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

        <div
          className="nivel-selector"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setNivelesAbiertos(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setNivelesAbiertos(false);
          }}
        >
          <button
            type="button"
            className="nivel-toggle"
            aria-expanded={nivelesAbiertos}
            onClick={() => setNivelesAbiertos(!nivelesAbiertos)}
          >
            <span className="nivel-toggle-contenido">
              <span
                className="nivel-indicador"
                style={{ backgroundColor: nivelPeligro ? colorDelNivel(nivelPeligro) : "#999" }}
              />
              <span style={{ color: nivelPeligro ? colorDelNivel(nivelPeligro) : "#999" }}>
                {nivelPeligro || "Nivel de peligro"}
              </span>
            </span>
            <span aria-hidden="true">▾</span>
          </button>

          {nivelesAbiertos && (
            <div className="nivel-opciones" role="group" aria-label="Niveles de peligro">
              {nivelesPeligro.map((nivel) => (
                <button
                  key={nivel.nombre}
                  type="button"
                  className="nivel-opcion"
                  onClick={() => {
                    setNivelPeligro(nivel.nombre);
                    setNivelesAbiertos(false);
                  }}
                >
                  <span className="nivel-indicador" style={{ backgroundColor: nivel.color }} />
                  <span style={{ color: nivel.color }}>{nivel.nombre}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={guardarZona}>
          {idEditando === null ? "Crear zona" : "Guardar cambios"}
        </button>

        {idEditando !== null && (
          <button onClick={limpiarFormulario}>Cancelar</button>
        )}
      </div>

      <h2>Listado de zonas</h2>

      {zonas.map((zona) => (
        <div className="zona-card" key={zona.idZona}>
          <h3>{zona.nombre}</h3>

          <p>{zona.descripcion}</p>

          <p>
            Nivel de peligro: {" "}
            <span className="nivel-valor" style={{ color: colorDelNivel(zona.nivelPeligro) }}>
              {zona.nivelPeligro}
            </span>
          </p>

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
