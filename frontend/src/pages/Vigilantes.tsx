import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";

// Tipos de datos
interface Vigilante {
  idVigilante?: number;
  nombre: string;
  idZona?: number | string;
}

interface Zona {
  idZona: number;
  nombre: string;
}

export const Vigilantes = () => {
  const API_URL = "http://localhost:3000/vigilantes";
  const ZONAS_URL = "http://localhost:3000/zonas";

  const [vigilantes, setVigilantes] = useState<Vigilante[]>([]);
  const [zonas, setZonas] = useState<Zona[]>([]); // <--- Zonas reales de la BD
  const [busqueda, setBusqueda] = useState("");
  const [zonaFiltro, setZonaFiltro] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [vigilanteEditando, setVigilanteEditando] = useState<Vigilante | null>(null);

  const [nombre, setNombre] = useState("");
  const [idZona, setIdZona] = useState<number | string>("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // 1. CARGAR ZONAS DESDE LA BASE DE DATOS
  const cargarZonas = async () => {
    try {
      const response = await fetch(ZONAS_URL, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setZonas(data);
      } else {
        console.error("Error al obtener las zonas:", response.statusText);
      }
    } catch (error) {
      console.error("Error de conexión al cargar zonas:", error);
    }
  };

  // 2. CARGAR VIGILANTES DESDE LA BASE DE DATOS
  const cargarVigilantes = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setVigilantes(data);
      } else {
        console.error("Error al obtener vigilantes:", response.statusText);
      }
    } catch (error) {
      console.error("Error de conexión al cargar vigilantes:", error);
    }
  };

  useEffect(() => {
    cargarZonas();
    cargarVigilantes();
  }, []);

  // 3. CREAR O EDITAR VIGILANTE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nombre,
      idZona: Number(idZona),
    };

    try {
      if (vigilanteEditando && vigilanteEditando.idVigilante) {
        await fetch(`${API_URL}/${vigilanteEditando.idVigilante}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
      }

      setModalAbierto(false);
      cargarVigilantes();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // 4. ELIMINAR VIGILANTE
  const handleEliminar = async (id?: number) => {
    if (!id) return;
    if (window.confirm("¿Estás seguro de eliminar este vigilante?")) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });
        cargarVigilantes();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const handleNuevoVigilante = () => {
    setVigilanteEditando(null);
    setNombre("");
    setIdZona("");
    setModalAbierto(true);
  };

  const handleEditar = (v: Vigilante) => {
    setVigilanteEditando(v);
    setNombre(v.nombre);
    setIdZona(v.idZona !== undefined && v.idZona !== null ? String(v.idZona) : "");
    setModalAbierto(true);
  };

  // Obtener el nombre de la zona a partir de su ID
  const obtenerNombreZona = (idZona?: number | string) => {
    if (!idZona) return "Sin asignar";
    const zonaEncontrada = zonas.find((z) => String(z.idZona) === String(idZona));
    return zonaEncontrada ? zonaEncontrada.nombre : `Zona ID ${idZona}`;
  };

  // Filtrado de la tabla
  const vigilantesFiltrados = vigilantes.filter((v) => {
    const coincideTexto = (v.nombre || "").toLowerCase().includes(busqueda.toLowerCase());
    const coincideZona = zonaFiltro === "" || String(v.idZona) === zonaFiltro;
    return coincideTexto && coincideZona;
  });

  return (
    <Layout>
      <div className="header-section">
        <h2>Gestión de Vigilantes</h2>
        <button className="btn-primary" onClick={handleNuevoVigilante}>
          + Nuevo Vigilante
        </button>
      </div>

      <div className="crud-tools">
        <input
          type="text"
          placeholder="Buscar vigilante..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        {/* Filtro dinámico de Zonas */}
        <select value={zonaFiltro} onChange={(e) => setZonaFiltro(e.target.value)}>
          <option value="">Todas las zonas</option>
          {zonas.map((z) => (
            <option key={z.idZona} value={String(z.idZona)}>
              {z.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Zona Asignada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vigilantesFiltrados.length > 0 ? (
              vigilantesFiltrados.map((v) => (
                <tr key={v.idVigilante}>
                  <td>{v.idVigilante}</td>
                  <td>{v.nombre}</td>
                  <td>{obtenerNombreZona(v.idZona)}</td>
                  <td>
                    <button className="btn-action" onClick={() => handleEditar(v)}>
                      Editar
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleEliminar(v.idVigilante)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                  No se encontraron vigilantes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal interactivo con opciones dinámicas de MySQL */}
      {modalAbierto && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            <h3>{vigilanteEditando ? "Editar Vigilante" : "Nuevo Vigilante"}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>Nombre:</label>
                <input
                  type="text"
                  required
                  style={{ width: "100%", padding: "8px" }}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>Zona Asignada:</label>
                <select
                  required
                  style={{ width: "100%", padding: "8px" }}
                  value={String(idZona)}
                  onChange={(e) => setIdZona(e.target.value)}
                >
                  <option value="">Selecciona una zona</option>
                  {zonas.map((z) => (
                    <option key={z.idZona} value={String(z.idZona)}>
                      {z.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="btn-action"
                  onClick={() => setModalAbierto(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

const modalStyles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  content: {
    background: "#1e1e2e",
    padding: "24px",
    borderRadius: "8px",
    width: "380px",
    color: "#fff",
  },
};

export default Vigilantes;