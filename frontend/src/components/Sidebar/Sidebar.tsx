import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useSidebar } from "../../context/useSidebar";

import iconoInicio from "../../assets/home.png";
import iconoMapa from "../../assets/mapa.png";
import iconoReporte from "../../assets/reporte.png";

import { useAuth } from "../../context/useAuth";

function Sidebar() {
  const { usuario } = useAuth();

  const { abierta, cerrarSidebar } = useSidebar();

  function cerrarSidebarSiEsMobile() {
    if (window.innerWidth < 768) {
      cerrarSidebar();
    }
  }

  return (
    <>
      <div className={`sidebar-overlay ${abierta ? "overlay-visible" : ""}`} onClick={cerrarSidebar} />

      <aside className={`sidebar ${abierta ? "sidebar-abierta" : "sidebar-cerrada"}`}>
        <h1 className="logo">Hawkins Anomalies</h1>

        <nav>
          <Link to="/" onClick={cerrarSidebarSiEsMobile}>
            <img src={iconoInicio} alt="" className="nav-icon" />
            Inicio
          </Link>
          <Link to="/reportes" onClick={cerrarSidebarSiEsMobile}>
            <img src={iconoReporte} alt="" className="nav-icon" />
            Reporte
          </Link>
          <Link to="/mapa" onClick={cerrarSidebarSiEsMobile}>
            <img src={iconoMapa} alt="" className="nav-icon" />
            Mapa
          </Link>
        {usuario?.rol === "ADMIN" && <Link to="/admin/tipos-reaccion" onClick={cerrarSidebarSiEsMobile}>Tipos de reacción</Link>}
        </nav>

        <div className="sidebar-bottom">
        
        </div>
      </aside>
    </>
  );
}

export default Sidebar;