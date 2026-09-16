import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
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

const ESTADO_LABELS: Record<string, string> = {
  NO_VERIFICADO: "No verificado",
  EN_INVESTIGACION: "En investigación",
  VERIFICADO: "Verificado"
};

function DetalleReporte() {
  const { id } = useParams();
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
          <p className="detalle-mensaje">Todavía no hay comentarios en este reporte.</p>
        </section>
      </div>
    </Layout>
  );
}

export default DetalleReporte;