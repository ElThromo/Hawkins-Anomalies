
import { useState, useEffect, type FormEvent } from "react";
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
  const [reporte, setReporte] = useState<Reporte | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

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
    "¿Seguro que querés eliminar este comentario?"
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

    setComentarios((anteriores) =>
      anteriores.filter(
        (comentario) => comentario.idComentario !== idComentario
      )
    );
  } catch (err) {
    console.error(err);
    setErrorComentarios("No se pudo conectar con el servidor");
  }
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

  {!cargandoComentarios &&
    comentarios.map((comentario) => (
      <article className="comentario-card" key={comentario.idComentario}>
        <div className="comentario-meta">
          <strong>Usuario #{comentario.idUsuario}</strong>
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

    {usuario?.idUsuario === comentario.idUsuario && (
      <div className="comentario-acciones">
        <button type="button" onClick={() => iniciarEdicion(comentario)}>
          Editar
        </button>

        <button
          type="button"
          onClick={() => eliminarComentario(comentario.idComentario)}
        >
          Eliminar
        </button>
      </div>
    )}
  </>
)}
      </article>
    ))}
</section>
      </div>
    </Layout>
  );
}

export default DetalleReporte;
