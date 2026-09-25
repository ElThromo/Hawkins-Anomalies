import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/useAuth";
import "../styles/AdminTable.css";

type TipoReaccion = { idTipoReaccion: number; nombre: string; emoji: string };
const API = "http://localhost:3000/tipos-reaccion";

function TiposReaccion() {
  const { usuario, token } = useAuth();
  const esAdmin = usuario?.rol === "ADMIN" && !!token;

  const [tipos, setTipos] = useState<TipoReaccion[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [tipoEditando, setTipoEditando] = useState<TipoReaccion | "nuevo" | null>(null);

  async function cargarTipos() {
    setCargando(true);
    try {
      const respuesta = await fetch(API);
      if (!respuesta.ok) {
        setError("No se pudo cargar el catálogo");
        return;
      }
      setTipos(await respuesta.json());
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    if (!esAdmin) return;
    let cancelado = false;

    async function cargarTiposEfecto() {
      setCargando(true);
      try {
        const respuesta = await fetch(API);
        if (cancelado) return;
        if (!respuesta.ok) {
          setError("No se pudo cargar el catálogo");
          return;
        }
        setTipos(await respuesta.json());
      } catch (err) {
        if (!cancelado) {
          console.error(err);
          setError("No se pudo conectar con el servidor");
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargarTiposEfecto();
    return () => {
      cancelado = true;
    };
  }, [esAdmin]);

  async function handleGuardar(datos: { nombre: string; emoji: string }) {
    const esNuevo = tipoEditando === "nuevo";
    const url = esNuevo ? API : `${API}/${(tipoEditando as TipoReaccion).idTipoReaccion}`;

    try {
      const respuesta = await fetch(url, {
        method: esNuevo ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(datos)
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        alert(resultado.error || "Error al guardar el tipo de reacción");
        return;
      }

      setTipoEditando(null);
      cargarTipos();
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  }

  async function handleEliminar(tipo: TipoReaccion) {
    const confirmar = window.confirm(`¿Eliminar el tipo "${tipo.nombre}"?`);
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`${API}/${tipo.idTipoReaccion}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        alert(resultado.error || "No se pudo eliminar el tipo");
        return;
      }

      cargarTipos();
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  }

  const tiposFiltrados = tipos.filter((t) =>
    t.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (!esAdmin) {
    return (
      <Layout>
        <div className="header-section">
          <h2>Tipos de reacción</h2>
        </div>
        <p className="admin-mensaje">
          Esta sección está disponible solo para administradores.{" "}
          {!token && <Link to="/login" className="tabla-link">Iniciar sesión</Link>}
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="header-section">
        <h2>Tipos de reacción</h2>
        <button className="btn-primary" onClick={() => setTipoEditando("nuevo")}>
          + Nuevo Tipo
        </button>
      </div>

      <div className="crud-tools">
        <input
          type="text"
          placeholder="Buscar tipo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {cargando && <p className="admin-mensaje">Cargando...</p>}
      {error && <p className="admin-mensaje admin-error">{error}</p>}

      {!cargando && !error && (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Emoji</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tiposFiltrados.map((tipo) => (
                <tr key={tipo.idTipoReaccion}>
                  <td>{tipo.idTipoReaccion}</td>
                  <td style={{ fontSize: "1.3rem" }}>{tipo.emoji}</td>
                  <td>{tipo.nombre}</td>
                  <td>
                    <button className="btn-action" onClick={() => setTipoEditando(tipo)}>
                      Editar
                    </button>
                    <button className="btn-action btn-delete" onClick={() => handleEliminar(tipo)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tiposFiltrados.length === 0 && (
            <p className="admin-mensaje">No hay tipos de reacción cargados.</p>
          )}
        </div>
      )}

      {tipoEditando && (
        <ModalTipoReaccion
          tipo={tipoEditando === "nuevo" ? null : tipoEditando}
          onCancelar={() => setTipoEditando(null)}
          onGuardar={handleGuardar}
        />
      )}
    </Layout>
  );
}

interface ModalTipoReaccionProps {
  tipo: TipoReaccion | null;
  onCancelar: () => void;
  onGuardar: (datos: { nombre: string; emoji: string }) => void;
}

function ModalTipoReaccion({ tipo, onCancelar, onGuardar }: ModalTipoReaccionProps) {
  const [nombre, setNombre] = useState(tipo?.nombre ?? "");
  const [emoji, setEmoji] = useState(tipo?.emoji ?? "");

  function handleSubmit() {
    if (!nombre.trim() || !emoji.trim()) {
      alert("Completá el nombre y el emoji");
      return;
    }
    onGuardar({ nombre: nombre.trim(), emoji: emoji.trim() });
  }

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>{tipo ? "Editar tipo" : "Nuevo tipo"}</h3>

        <label>
          Nombre
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Sorpresa"
          />
        </label>

        <label>
          Emoji
          <input
            type="text"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="😮"
          />
        </label>

        <div className="modal-acciones">
          <button className="btn-secundario" onClick={onCancelar}>Cancelar</button>
          <button className="btn-primary" onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default TiposReaccion;