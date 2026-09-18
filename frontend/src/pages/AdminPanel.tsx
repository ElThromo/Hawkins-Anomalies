import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "../styles/AdminPanel.css";

interface SeccionAdmin {
  nombre: string;
  ruta: string;
  icono: string;
}

const secciones: SeccionAdmin[] = [
  { nombre: "Usuarios", ruta: "/admin/usuarios", icono: "../src/assets/usuarios.png" },
  { nombre: "Zonas", ruta: "/admin/zonas", icono: "../src/assets/zonas.png" },
  { nombre: "Categorías", ruta: "/admin/categorias", icono: "../src/assets/categorias.png" },
  { nombre: "Vigilantes", ruta: "/admin/vigilantes", icono: "../src/assets/vigilantes.png" },
  { nombre: "Reportes", ruta: "/admin/reportes", icono: "../src/assets/reporte.png" },
  { nombre: "Reacciones", ruta: "/admin/reacciones", icono: "../src/assets/reacciones.png" }
];

function AdminPanel() {
  return (
    <Layout>
      <h1 className="admin-titulo">Panel de admin</h1>

      <div className="admin-grid">
        {secciones.map((seccion) => (
          <Link key={seccion.ruta} to={seccion.ruta} className="admin-card">
            <img src={seccion.icono} alt="" className="admin-icono" />
            <span>{seccion.nombre}</span>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default AdminPanel;