import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/useAuth";
import "../styles/AdminTable.css";

interface Reporte {
  idReporte: number;
  titulo: string;
  fechaHora: string;
  estado: string;
  zona: { nombre: string };
  usuario: { nombre: string };
  categoria: { nombre: string };
}

const ESTADOS = ["NO_VERIFICADO", "EN_INVESTIGACION", "VERIFICADO"];

const ESTADO_LABELS: Record<string, string> = {
  NO_VERIFICADO: "No verificado",
  EN_INVESTIGACION: "En investigación",
  VERIFICADO: "Verificado"
};

function AdminReportes() {
  const { token } = useAuth();
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [reporteEditando, setReporteEditando] = useState<Reporte | null>(null);

  async function cargarReportes() {
    setCargando(true);
    try {
      const respuesta = await fetch("http://localhost:3000/reportes");

      if (!respuesta.ok) {
        setError("No se pudieron cargar los reportes");
        return;
      }

      setReportes(await respuesta.json());
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    let cancelado = false;

    async function cargarReportesEfecto() {
      setCargando(true);
      try {
        const respuesta = await fetch("http://localhost:3000/reportes");

        if (cancelado) return;

        if (!respuesta.ok) {
          setError("No se pudieron cargar los reportes");
          return;
        }

        setReportes(await respuesta.json());
      } catch (err) {
        if (!cancelado) {
          console.error(err);
          setError("No se pudo conectar con el servidor");
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargarReportesEfecto();

    return () => {
      cancelado = true;
    };
  }, []);

  async function handleGuardarEstado(nuevoEstado: string) {
    if (!reporteEditando) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/reportes/${reporteEditando.idReporte}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (!respuesta.ok) {
        const datos = await respuesta.json();
        alert(datos.error || "Error al actualizar el reporte");
        return;
      }

      setReporteEditando(null);
      cargarReportes();
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  }

  async function handleEliminar(reporte: Reporte) {
    const confirmar = window.confirm(`¿Eliminar el reporte "${reporte.titulo}"? Esta acción no se puede deshacer.`);
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/reportes/${reporte.idReporte}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!respuesta.ok) {
        const datos = await respuesta.json();
        alert(datos.error || "Error al eliminar el reporte");
        return;
      }

      cargarReportes();
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  }

  const reportesFiltrados = reportes.filter((r) => {
    const coincideBusqueda = r.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === "TODOS" || r.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  return (
    <Layout>
      <div className="header-section">
        <h2>Gestión de Reportes</h2>
      </div>

      <div className="crud-tools crud-tools-fila">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
          <option value="TODOS">Todos los estados</option>
          {ESTADOS.map((estado) => (
            <option key={estado} value={estado}>{ESTADO_LABELS[estado]}</option>
          ))}
        </select>
      </div>

      {cargando && <p className="admin-mensaje">Cargando...</p>}
      {error && <p className="admin-mensaje admin-error">{error}</p>}

      {!cargando && !error && (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Categoría</th>
                <th>Zona</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reportesFiltrados.map((reporte) => (
                <tr key={reporte.idReporte}>
                  <td>{reporte.idReporte}</td>
                  <td>
                    <Link to={`/reportes/${reporte.idReporte}`} className="tabla-link">
                      {reporte.titulo}
                    </Link>
                  </td>
                  <td>{reporte.usuario.nombre}</td>
                  <td>{reporte.categoria.nombre}</td>
                  <td>{reporte.zona.nombre}</td>
                  <td>
                    <span className={`badge-estado badge-${reporte.estado.toLowerCase()}`}>
                      {ESTADO_LABELS[reporte.estado]}
                    </span>
                  </td>
                  <td>{new Date(reporte.fechaHora).toLocaleDateString("es-AR")}</td>
                  <td>
                    <button className="btn-action" onClick={() => setReporteEditando(reporte)}>
                      Editar estado
                    </button>
                    <button className="btn-action btn-delete" onClick={() => handleEliminar(reporte)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {reportesFiltrados.length === 0 && (
            <p className="admin-mensaje">No se encontraron reportes.</p>
          )}
        </div>
      )}

      {reporteEditando && (
        <ModalEditarEstado
          reporte={reporteEditando}
          onCancelar={() => setReporteEditando(null)}
          onGuardar={handleGuardarEstado}
        />
      )}
    </Layout>
  );
}

interface ModalEditarEstadoProps {
  reporte: Reporte;
  onCancelar: () => void;
  onGuardar: (estado: string) => void;
}

function ModalEditarEstado({ reporte, onCancelar, onGuardar }: ModalEditarEstadoProps) {
  const [estado, setEstado] = useState(reporte.estado);

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Cambiar estado</h3>
        <p className="modal-subtitulo">{reporte.titulo}</p>

        <label>
          Estado
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            {ESTADOS.map((est) => (
              <option key={est} value={est}>{ESTADO_LABELS[est]}</option>
            ))}
          </select>
        </label>

        <div className="modal-acciones">
          <button className="btn-secundario" onClick={onCancelar}>Cancelar</button>
          <button className="btn-primary" onClick={() => onGuardar(estado)}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default AdminReportes;