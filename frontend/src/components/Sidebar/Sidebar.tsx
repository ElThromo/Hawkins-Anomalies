import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Sidebar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <h1 className="logo">Hawkins Anomalies</h1>

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/reportes">Reportes</Link>
        <Link to="/mapa">Mapa</Link>
      </nav>

      <div className="sidebar-bottom">
        {usuario ? (
          <>
            <p className="user">{usuario.nombre}</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <p className="user">Invitado</p>
            <Link to="/login">
              <button>Iniciar sesión</button>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;