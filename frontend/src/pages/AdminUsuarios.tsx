import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/useAuth";
import "../styles/AdminTable.css";

interface Usuario {
  idUsuario: number;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  fechaCreado: string;
}

const ROLES = ["USUARIO", "ADMIN", "INVESTIGADOR"];

function AdminUsuarios() {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  async function cargarUsuarios() {
    setCargando(true);
    try {
      const respuesta = await fetch("http://localhost:3000/usuarios", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!respuesta.ok) {
        setError("No se pudieron cargar los usuarios");
        return;
      }

      setUsuarios(await respuesta.json());
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    let cancelado = false;

    async function cargarUsuariosEfecto() {
      setCargando(true);
      try {
        const respuesta = await fetch("http://localhost:3000/usuarios", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (cancelado) return;

        if (!respuesta.ok) {
          setError("No se pudieron cargar los usuarios");
          return;
        }

        setUsuarios(await respuesta.json());
      } catch (err) {
        if (!cancelado) {
          console.error(err);
          setError("No se pudo conectar con el servidor");
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargarUsuariosEfecto();

    return () => {
      cancelado = true;
    };
  }, []);

  async function handleGuardarEdicion(rol: string, activo: boolean) {
    if (!usuarioEditando) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/usuarios/${usuarioEditando.idUsuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rol, activo })
      });

      if (!respuesta.ok) {
        const datos = await respuesta.json();
        alert(datos.error || "Error al actualizar el usuario");
        return;
      }

      setUsuarioEditando(null);
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  }

  async function handleEliminar(usuario: Usuario) {
    const confirmar = window.confirm(`¿Eliminar al usuario "${usuario.nombre}"? Esta acción no se puede deshacer.`);
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/usuarios/${usuario.idUsuario}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!respuesta.ok) {
        const datos = await respuesta.json();
        alert(datos.error || "Error al eliminar el usuario");
        return;
      }

      cargarUsuarios();
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    }
  }

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Layout>
      <div className="header-section">
        <h2>Gestión de Usuarios</h2>
      </div>

      <div className="crud-tools">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
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
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Creado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.idUsuario}>
                  <td>{usuario.idUsuario}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <span className={`badge-rol badge-${usuario.rol.toLowerCase()}`}>
                      {usuario.rol}
                    </span>
                  </td>
                  <td>
                    <span className={usuario.activo ? "badge-activo" : "badge-inactivo"}>
                      {usuario.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>{new Date(usuario.fechaCreado).toLocaleDateString("es-AR")}</td>
                  <td>
                    <button className="btn-action" onClick={() => setUsuarioEditando(usuario)}>
                      Editar
                    </button>
                    <button className="btn-action btn-delete" onClick={() => handleEliminar(usuario)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {usuariosFiltrados.length === 0 && (
            <p className="admin-mensaje">No se encontraron usuarios.</p>
          )}
        </div>
      )}

      {usuarioEditando && (
        <ModalEditarUsuario
          usuario={usuarioEditando}
          onCancelar={() => setUsuarioEditando(null)}
          onGuardar={handleGuardarEdicion}
        />
      )}
    </Layout>
  );
}

interface ModalEditarUsuarioProps {
  usuario: Usuario;
  onCancelar: () => void;
  onGuardar: (rol: string, activo: boolean) => void;
}

function ModalEditarUsuario({ usuario, onCancelar, onGuardar }: ModalEditarUsuarioProps) {
  const [rol, setRol] = useState(usuario.rol);
  const [activo, setActivo] = useState(usuario.activo);

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Editar usuario</h3>
        <p className="modal-subtitulo">{usuario.nombre} · {usuario.email}</p>

        <label>
          Rol
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>

        <label className="modal-checkbox">
          <input
            type="checkbox"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
          />
          Cuenta activa
        </label>

        <div className="modal-acciones">
          <button className="btn-secundario" onClick={onCancelar}>Cancelar</button>
          <button className="btn-primary" onClick={() => onGuardar(rol, activo)}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default AdminUsuarios;