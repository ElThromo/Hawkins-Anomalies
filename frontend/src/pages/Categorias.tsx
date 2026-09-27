import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";

interface Categoria {
  idCategoria?: number;
  nombre: string;
  descripcion: string;
}

export const Categorias = () => {
  const API_URL = "http://localhost:3000/categorias";

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Función auxiliar para obtener los headers con el Token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // Asegúrate de usar la clave con la que guardaste el token en tu login
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // 1. CARGAR CATEGORÍAS
  const cargarCategorias = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      } else {
        console.error("Error al obtener las categorías:", response.statusText);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // 2. CREAR O EDITAR CATEGORÍA
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (categoriaEditando && categoriaEditando.idCategoria) {
        // ACTUALIZAR (PUT)
        await fetch(`${API_URL}/${categoriaEditando.idCategoria}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({ nombre, descripcion }),
        });
      } else {
        // CREAR (POST)
        await fetch(API_URL, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({ nombre, descripcion }),
        });
      }

      setModalAbierto(false);
      cargarCategorias();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // 3. ELIMINAR CATEGORÍA
  const handleEliminar = async (id?: number) => {
    if (!id) return;
    if (window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });
        cargarCategorias();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const handleNuevaCategoria = () => {
    setCategoriaEditando(null);
    setNombre("");
    setDescripcion("");
    setModalAbierto(true);
  };

  const handleEditar = (cat: Categoria) => {
    setCategoriaEditando(cat);
    setNombre(cat.nombre);
    setDescripcion(cat.descripcion);
    setModalAbierto(true);
  };

  const categoriasFiltradas = categorias.filter(
    (cat) =>
      cat.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cat.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Layout>
      <div className="header-section">
        <h2>Gestión de Categorías</h2>
        <button className="btn-primary" onClick={handleNuevaCategoria}>
          + Nueva Categoría
        </button>
      </div>

      <div className="crud-tools">
        <input
          type="text"
          placeholder="Buscar categoría..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categoriasFiltradas.length > 0 ? (
              categoriasFiltradas.map((cat) => (
                <tr key={cat.idCategoria}>
                  <td>{cat.idCategoria}</td>
                  <td>{cat.nombre}</td>
                  <td>{cat.descripcion}</td>
                  <td>
                    <button className="btn-action" onClick={() => handleEditar(cat)}>
                      Editar
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleEliminar(cat.idCategoria)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                  No se encontraron categorías.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalAbierto && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            <h3>{categoriaEditando ? "Editar Categoría" : "Nueva Categoría"}</h3>
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
                <label style={{ display: "block", marginBottom: "4px" }}>Descripción:</label>
                <textarea
                  required
                  rows={3}
                  style={{ width: "100%", padding: "8px" }}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
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
    width: "400px",
    color: "#fff",
  },
};

export default Categorias;