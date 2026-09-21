
import { useState, useEffect, type FormEvent, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/useAuth";
import "../styles/DetalleReporte.css";

interface Reporte {
  idReporte: number;
  titulo: string;
  cuerpo: string;
  fechaHora: string;
  estado: string;
  zona: { idZona: number; nombre: string; nivelPeligro: string };
  usuario: { idUsuario: number; nombre: string };
  categoria: { idCategoria: number; nombre: string };
  imagenes: { idImagen: number; url: string }[];
}

interface Comentario {
  idComentario: number;
  texto: string;
  fechaHora: string;
  idUsuario: number;
  idReporte: number;
  idComentarioPadre: number | null;
  usuario: {
    idUsuario: number;
    nombre: string;
  };
}

interface TipoReaccion {
  idTipoReaccion: number;
  nombre: string;
  emoji: string;
}

interface Reaccion {
  idReaccion: number;
  idTipoReaccion: number;
  idUsuario: number;
  idReporte: number;
}

const ESTADO_LABELS: Record<string, string> = {
  NO_VERIFICADO: "No verificado",
  EN_INVESTIGACION: "En investigación",
  VERIFICADO: "Verificado"
};

function DetalleReporte() {
  const { id } = useParams();
  const { usuario, token } = useAuth();

  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [cargandoComentarios, setCargandoComentarios] = useState(true);
  const [errorComentarios, setErrorComentarios] = useState("");
  const [idComentarioEditando, setIdComentarioEditando] = useState<number | null>(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [reacciones, setReacciones] = useState<Reaccion[]>([]);
  const [tiposReaccion, setTiposReaccion] = useState<TipoReaccion[]>([]);
  const [cargandoReacciones, setCargandoReacciones] = useState(true);
  const [errorReacciones, setErrorReacciones] = useState("");
  const [procesandoReaccion, setProcesandoReaccion] = useState(false);
  const [reporte, setReporte] = useState<Reporte | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [selectorReaccionesAbierto, setSelectorReaccionesAbierto] =
  useState(false);
const [idComentarioRespondiendo, setIdComentarioRespondiendo] =
  useState<number | null>(null);

const [textoRespuesta, setTextoRespuesta] = useState("");

const [enviandoRespuesta, setEnviandoRespuesta] = useState(false);

  useEffect(() => {
    async function cargarReporte() {
      try {
        const respuesta = await fetch(`http://localhost:3000/reportes/${id}`);

        if (!respuesta.ok) {
          setError("No se pudo encontrar el reporte");
          setCargando(false);
          return;
        }

        const datos = await respuesta.json();
        setReporte(datos);
      } catch (err) {
        console.error(err);
        setError("No se pudo conectar con el servidor");
      } finally {
        setCargando(false);
      }
    }

    cargarReporte();
  }, [id]);

  useEffect(() => {
    async function cargarComentarios() {
      setCargandoComentarios(true);
      setErrorComentarios("");

      try {
        const respuesta = await fetch(
          `http://localhost:3000/comentarios?idReporte=${id}`
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {
          setErrorComentarios(datos.error || "No se pudieron cargar los comentarios");
          return;
        }

        setComentarios(datos);
      } catch (err) {
        console.error(err);
        setErrorComentarios("No se pudo conectar con el servidor");
      } finally {
        setCargandoComentarios(false);
      }
    }

    if (id) {
      cargarComentarios();
    }
  }, [id]);

useEffect(() => {
  async function cargarReacciones() {
    setCargandoReacciones(true);
    setErrorReacciones("");

    try {
      const respuesta = await fetch(
        `http://localhost:3000/reacciones?idReporte=${id}`
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setErrorReacciones(
          datos.error || "No se pudieron cargar las reacciones"
        );
        return;
      }
const respuestaTipos = await fetch(
  "http://localhost:3000/tipos-reaccion"
);

const datosTipos = await respuestaTipos.json();

if (!respuestaTipos.ok) {
  setErrorReacciones(
    datosTipos.error || "No se pudieron cargar los tipos de reacción"
  );
  return;
}

setTiposReaccion(datosTipos);
      setReacciones(datos);
    } catch (err) {
      console.error(err);
      setErrorReacciones("No se pudo conectar con el servidor");
    } finally {
      setCargandoReacciones(false);
    }
  }

  if (id) {
    cargarReacciones();
  }
}, [id]);

async function reaccionar(idTipoReaccion: number) {
  setErrorReacciones("");

  if (!usuario || !token) {
    setErrorReacciones("Tenés que iniciar sesión para reaccionar");
    return;
  }

  const reaccionActual = reacciones.find(
    (reaccion) => reaccion.idUsuario === usuario.idUsuario
  );

  setProcesandoReaccion(true);

  try {
    if (reaccionActual?.idTipoReaccion === idTipoReaccion) {
      const respuesta = await fetch(
        `http://localhost:3000/reacciones/${reaccionActual.idReaccion}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setErrorReacciones(datos.error || "No se pudo eliminar la reacción");
        return;
      }

      setReacciones((anteriores) =>
        anteriores.filter(
          (reaccion) => reaccion.idReaccion !== reaccionActual.idReaccion
        )
      );

      return;
    }

    if (reaccionActual) {
      const respuesta = await fetch(
        `http://localhost:3000/reacciones/${reaccionActual.idReaccion}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ idTipoReaccion })
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setErrorReacciones(datos.error || "No se pudo cambiar la reacción");
        return;
      }

      setReacciones((anteriores) =>
        anteriores.map((reaccion) =>
          reaccion.idReaccion === reaccionActual.idReaccion
            ? datos.reaccion
            : reaccion
        )
      );

      return;
    }

    const respuesta = await fetch("http://localhost:3000/reacciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        idTipoReaccion,
        idReporte: Number(id)
      })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      setErrorReacciones(datos.error || "No se pudo crear la reacción");
      return;
    }

    setReacciones((anteriores) => [datos.reaccion, ...anteriores]);
  } catch (err) {
    console.error(err);
    setErrorReacciones("No se pudo conectar con el servidor");
  } finally {
    setProcesandoReaccion(false);
  }
}

async function enviarRespuesta(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (enviandoRespuesta || idComentarioRespondiendo === null) {
    return;
  }

  setErrorComentarios("");

  if (!usuario || !token) {
    setErrorComentarios("Tenés que iniciar sesión para responder");
    return;
  }

  if (!textoRespuesta.trim()) {
    setErrorComentarios("La respuesta no puede estar vacía");
    return;
  }

  setEnviandoRespuesta(true);

  try {
    const respuesta = await fetch("http://localhost:3000/comentarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        texto: textoRespuesta.trim(),
        idReporte: Number(id),
        idComentarioPadre: idComentarioRespondiendo
      })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      setErrorComentarios(datos.error || "No se pudo enviar la respuesta");
      return;
    }

    setComentarios((anteriores) => [...anteriores, datos.comentario]);
    setTextoRespuesta("");
    setIdComentarioRespondiendo(null);
  } catch (err) {
    console.error(err);
    setErrorComentarios("No se pudo conectar con el servidor");
  } finally {
    setEnviandoRespuesta(false);
  }
}

async function crearComentario(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setErrorComentarios("");

  if (!nuevoComentario.trim()) {
    setErrorComentarios("El comentario no puede estar vacío");
    return;
  }

  if (!token) {
    setErrorComentarios("Tenés que iniciar sesión para comentar");
    return;
  }

  try {
    const respuesta = await fetch("http://localhost:3000/comentarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        texto: nuevoComentario,
        idReporte: Number(id)
      })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      setErrorComentarios(datos.error || "No se pudo crear el comentario");
      return;
    }

    setComentarios((anteriores) => [datos.comentario, ...anteriores]);
    setNuevoComentario("");
  } catch (err) {
    console.error(err);
    setErrorComentarios("No se pudo conectar con el servidor");
  }
}

function iniciarEdicion(comentario: Comentario) {
  setIdComentarioEditando(comentario.idComentario);
  setTextoEditado(comentario.texto);
  setErrorComentarios("");
}

function cancelarEdicion() {
  setIdComentarioEditando(null);
  setTextoEditado("");
}

async function guardarEdicion(idComentario: number) {
  if (!textoEditado.trim() || !token) {
    setErrorComentarios("El comentario no puede estar vacío");
    return;
  }

  try {
    const respuesta = await fetch(
      `http://localhost:3000/comentarios/${idComentario}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ texto: textoEditado })
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      setErrorComentarios(datos.error || "No se pudo editar el comentario");
      return;
    }

    setComentarios((anteriores) =>
      anteriores.map((comentario) =>
        comentario.idComentario === idComentario
          ? datos.comentario
          : comentario
      )
    );

    cancelarEdicion();
  } catch (err) {
    console.error(err);
    setErrorComentarios("No se pudo conectar con el servidor");
  }
}

async function eliminarComentario(idComentario: number) {
  if (!token) return;

const confirmar = window.confirm(
  "¿Seguro que querés eliminar este comentario? También se eliminarán todas sus respuestas."
);

  if (!confirmar) return;

  try {
    const respuesta = await fetch(
      `http://localhost:3000/comentarios/${idComentario}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      setErrorComentarios(datos.error || "No se pudo eliminar el comentario");
      return;
    }

setComentarios((anteriores) => {
  const idsEliminados = new Set<number>([idComentario]);

  let hayCambios = true;

  while (hayCambios) {
    hayCambios = false;

    for (const comentario of anteriores) {
      if (
        comentario.idComentarioPadre !== null &&
        idsEliminados.has(comentario.idComentarioPadre) &&
        !idsEliminados.has(comentario.idComentario)
      ) {
        idsEliminados.add(comentario.idComentario);
        hayCambios = true;
      }
    }
  }

  return anteriores.filter(
    (comentario) => !idsEliminados.has(comentario.idComentario)
  );
});

setIdComentarioRespondiendo(null);
setTextoRespuesta("");
setIdComentarioEditando(null);
setTextoEditado("");
setErrorComentarios("");
  } catch (err) {
    console.error(err);
    setErrorComentarios("No se pudo conectar con el servidor");
  }
}

  function renderizarComentario(comentario: Comentario): ReactNode {
    const respuestas = comentarios
      .filter(respuesta => respuesta.idComentarioPadre === comentario.idComentario)
      .sort((a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime());
    return (
      <article className="comentario-card" key={comentario.idComentario}>
        <div className="comentario-avatar" aria-hidden="true">
  {comentario.usuario.nombre.charAt(0).toUpperCase()}
</div>

<div className="comentario-contenido">
        <div className="comentario-meta">
         <strong>{comentario.usuario.nombre}</strong>
          <span>
            {new Date(comentario.fechaHora).toLocaleString("es-AR")}
          </span>
        </div>

        {idComentarioEditando === comentario.idComentario ? (
  <div className="comentario-edicion">
    <textarea
      value={textoEditado}
      onChange={(e) => setTextoEditado(e.target.value)}
      rows={3}
    />

    <div className="comentario-acciones">
      <button
        type="button"
        onClick={() => guardarEdicion(comentario.idComentario)}
      >
        Guardar
      </button>

      <button type="button" onClick={cancelarEdicion}>
        Cancelar
      </button>
    </div>
  </div>
) : (
  <>
    <p>{comentario.texto}</p>

{usuario && (
  <button
    type="button"
    className="comentario-responder"
    disabled={enviandoRespuesta}
    onClick={() => {
      setIdComentarioRespondiendo(comentario.idComentario);
      setTextoRespuesta("");
      setErrorComentarios("");
    }}
  >
    Responder
  </button>
)}

{usuario && idComentarioRespondiendo === comentario.idComentario && (
  <form className="comentario-form" onSubmit={enviarRespuesta}>
    <label htmlFor={`respuesta-${comentario.idComentario}`}>
      Responder a {comentario.usuario.nombre}
    </label>

    <textarea
      id={`respuesta-${comentario.idComentario}`}
      value={textoRespuesta}
      onChange={(e) => setTextoRespuesta(e.target.value)}
      placeholder="Escribí tu respuesta..."
      rows={2}
      required
      disabled={enviandoRespuesta}
    />

    <div className="comentario-acciones">
      <button
        type="submit"
        disabled={enviandoRespuesta || !textoRespuesta.trim()}
      >
        {enviandoRespuesta ? "Enviando..." : "Enviar respuesta"}
      </button>

      <button
        type="button"
        disabled={enviandoRespuesta}
        onClick={() => {
          setIdComentarioRespondiendo(null);
          setTextoRespuesta("");
        }}
      >
        Cancelar
      </button>
    </div>
  </form>
)}

{usuario?.idUsuario === comentario.idUsuario && (
  <details className="comentario-menu">
    <summary aria-label="Opciones del comentario">⋯</summary>

    <div className="comentario-menu-opciones">
      <button
        type="button"
        onClick={(e) => {
          e.currentTarget.closest("details")?.removeAttribute("open");
          iniciarEdicion(comentario);
        }}
      >
        Editar
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.currentTarget.closest("details")?.removeAttribute("open");
          eliminarComentario(comentario.idComentario);
        }}
      >
        Eliminar
      </button>
    </div>
  </details>
)}
  </>

)}
          {respuestas.length > 0 && (
            <details className="comentario-respuestas">
              <summary>
                {respuestas.length}{" "}
                {respuestas.length === 1 ? "respuesta" : "respuestas"}
              </summary>
              {respuestas.map(renderizarComentario)}
            </details>
          )}
        </div>
      </article>
    );
  }

  if (cargando) {
    return (
      <Layout>
        <p className="detalle-mensaje">Cargando reporte...</p>
      </Layout>
    );
  }

  if (error || !reporte) {
    return (
      <Layout>
        <p className="detalle-mensaje detalle-error">{error || "Reporte no encontrado"}</p>
      </Layout>
    );
  }

  const fecha = new Date(reporte.fechaHora);
  const fechaFormateada = fecha.toLocaleDateString("es-AR");
  const horaFormateada = fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

  return (
    <Layout>
      <div className="detalle-reporte">
        <div className="detalle-header">
          <span className={`badge-estado badge-${reporte.estado.toLowerCase()}`}>
            {ESTADO_LABELS[reporte.estado]}
          </span>
          <h1>{reporte.titulo}</h1>
          <p className="detalle-meta">
            Por <strong>{reporte.usuario.nombre}</strong> · {fechaFormateada} a las {horaFormateada}
          </p>
        </div>

        <div className="detalle-tags">
          <span className="tag">{reporte.categoria.nombre}</span>
          <span className="tag tag-zona">
            {reporte.zona.nombre} ({reporte.zona.nivelPeligro})
          </span>
        </div>

        <p className="detalle-cuerpo">{reporte.cuerpo}</p>

        <section className="detalle-reacciones">
  <h2>Reacciones</h2>

  {cargandoReacciones ? (
    <p className="detalle-mensaje">Cargando reacciones...</p>
  ) : (
    <div className="reacciones-lista">
      {tiposReaccion
  .filter((tipo) =>
    reacciones.some(
      (reaccion) =>
        reaccion.idUsuario === usuario?.idUsuario &&
        reaccion.idTipoReaccion === tipo.idTipoReaccion
    )
  )
  .map(({ idTipoReaccion, emoji, nombre }) => {
        const cantidad = reacciones.filter(
          (reaccion) => reaccion.idTipoReaccion === idTipoReaccion
        ).length;

        const seleccionada = reacciones.some(
          (reaccion) =>
            reaccion.idTipoReaccion === idTipoReaccion &&
            reaccion.idUsuario === usuario?.idUsuario
        );

        return (
          <button
            type="button"
            className={`reaccion-boton ${
              seleccionada ? "reaccion-seleccionada" : ""
            }`}
            key={idTipoReaccion}
            title={nombre}
            aria-label={`${nombre}: ${cantidad}`}
            aria-pressed={seleccionada}
            disabled={procesandoReaccion}
            onClick={() => reaccionar(idTipoReaccion)}
          >
            <span className="reaccion-emoji">{emoji}</span>
            <span className="reaccion-cantidad">{cantidad}</span>
          </button>
        );
      })}
      <button
  type="button"
  className="reaccion-boton reaccion-agregar"
  aria-label="Ver todas las reacciones"
  aria-expanded={selectorReaccionesAbierto}
  aria-controls="catalogo-reacciones"
  onClick={() => setSelectorReaccionesAbierto((abierto) => !abierto)}
>
  +
</button>
    </div>
  )}

{selectorReaccionesAbierto && (
  <div id="catalogo-reacciones" className="catalogo-reacciones">
    <p>Elegí una reacción</p>

    <div className="reacciones-lista">
      {tiposReaccion.map(({ idTipoReaccion, emoji, nombre }) => (
        <button
          key={idTipoReaccion}
          type="button"
          className="reaccion-boton"
          title={nombre}
          aria-label={nombre}
          aria-pressed={reacciones.some(
            (reaccion) =>
              reaccion.idTipoReaccion === idTipoReaccion &&
              reaccion.idUsuario === usuario?.idUsuario
          )}
          disabled={procesandoReaccion}
          onClick={() => {
            setSelectorReaccionesAbierto(false);
            reaccionar(idTipoReaccion);
          }}
        >
          <span className="reaccion-emoji">{emoji}</span>
        </button>
      ))}
    </div>

    {tiposReaccion.length === 0 && (
      <p>No hay tipos de reacción disponibles.</p>
    )}
  </div>
)}

  {errorReacciones && (
    <p className="detalle-mensaje detalle-error">{errorReacciones}</p>
  )}
</section>

        {reporte.imagenes.length > 0 && (
          <div className="detalle-imagenes">
            {reporte.imagenes.map((img) => (
              <img key={img.idImagen} src={img.url} alt={reporte.titulo} />
            ))}
          </div>
        )}

       <section className="detalle-comentarios">
        <h2>Comentarios</h2>
        {usuario ? (
  <form className="comentario-form" onSubmit={crearComentario}>
    <textarea
      value={nuevoComentario}
      onChange={(e) => setNuevoComentario(e.target.value)}
      placeholder="Escribí un comentario..."
      rows={3}
    />

    <button type="submit">Comentar</button>
  </form>
) : (
  <p className="detalle-mensaje">
    Iniciá sesión para escribir un comentario.
  </p>
)}

  {cargandoComentarios && (
    <p className="detalle-mensaje">Cargando comentarios...</p>
  )}

  {errorComentarios && (
    <p className="detalle-mensaje detalle-error">{errorComentarios}</p>
  )}

  {!cargandoComentarios &&
    !errorComentarios &&
    comentarios.length === 0 && (
      <p className="detalle-mensaje">
        Todavía no hay comentarios en este reporte.
      </p>
    )}

  {!cargandoComentarios && comentarios
    .filter(comentario => comentario.idComentarioPadre === null)
    .map(renderizarComentario)}
</section>
      </div>
    </Layout>
  );
}

export default DetalleReporte;
