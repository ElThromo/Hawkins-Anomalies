import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useSidebar } from "../../context/useSidebar";
import "./Navbar.css";

function Navbar() {
  const { usuario, logout } = useAuth();
  const { abierta, toggleSidebar } = useSidebar();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Cierra el menú de usuario si se hace click afuera
  useEffect(() => {
    function handleClickFuera(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  function handleLogout() {
    logout();
    setMenuAbierto(false);
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {abierta ? "✕" : "☰"}
        </button>

        {/* El logo solo aparece acá cuando la sidebar está cerrada */}
        {!abierta && <span className="navbar-logo">Hawkins Anomalies</span>}
      </div>

      <div className="navbar-right">
        {usuario ? (
          <>
            <Link to="/crear-reporte">
              <button className="navbar-crear">+ Crear reporte</button>
            </Link>

            <div className="navbar-user" ref={menuRef}>
              <button className="navbar-user-btn" onClick={() => setMenuAbierto(!menuAbierto)}>
                <span className="navbar-avatar" />
                <span className="navbar-username">{usuario.nombre}</span>
              </button>

              {menuAbierto && (
                <div className="navbar-menu">
                  <button onClick={() => setMenuAbierto(false)}>Editar perfil</button>
                  <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className="navbar-crear">Iniciar sesión</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;