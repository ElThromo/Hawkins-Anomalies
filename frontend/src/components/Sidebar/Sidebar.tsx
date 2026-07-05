import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <h1 className="logo">Hawkins Anomalies</h1>

      <nav>

        <Link to="/">Inicio</Link>

        <Link to="/reportes">Reportes</Link>

        <Link to="/mapa">Mapa</Link>

      </nav>

      <div className="sidebar-bottom">

        <p className="user">Usuario</p>

        <button>+ Crear reporte</button>

      </div>

    </aside>
  );
}

export default Sidebar;