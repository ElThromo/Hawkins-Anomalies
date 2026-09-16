import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useSidebar } from "../../context/useSidebar";

function Sidebar() {
  const { usuario, logout } = useAuth();
  const { abierta, toggleSidebar, cerrarSidebar } = useSidebar();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
    cerrarSidebarSiEsMobile();
  }

  function cerrarSidebarSiEsMobile() {
    if (window.innerWidth < 768) {
      cerrarSidebar();
    }
  }

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {abierta ? "✕" : "☰"}
      </button>

      <div className={`sidebar-overlay ${abierta ? "overlay-visible" : ""}`} onClick={cerrarSidebar} />

      <aside className={`sidebar ${abierta ? "sidebar-abierta" : "sidebar-cerrada"}`}>
        <h1 className="logo">Hawkins Anomalies</h1>

        <nav>
          <Link to="/" onClick={cerrarSidebarSiEsMobile}>Inicio</Link>
          <Link to="/reportes" onClick={cerrarSidebarSiEsMobile}>Reportes</Link>
          <Link to="/mapa" onClick={cerrarSidebarSiEsMobile}>Mapa</Link>
        </nav>

        <div className="sidebar-bottom">
          {usuario ? (
            <>
              <p className="user">{usuario.nombre}</p>
              <Link to="/crear-reporte" onClick={cerrarSidebarSiEsMobile}>
                <button>+ Crear reporte</button>
              </Link>
              <button onClick={handleLogout} style={{ marginTop: "10px" }}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <p className="user">Invitado</p>
              <Link to="/login" onClick={cerrarSidebarSiEsMobile}>
                <button>Iniciar sesión</button>
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;