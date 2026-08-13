import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const respuesta = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error || "Error al iniciar sesión");
        return;
      }

      login(datos.usuario, datos.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Hawkins Anomalies</h1>

      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        {error && <p style={{ color: "#e63946", textAlign: "center" }}>{error}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />

        <button type="submit">Ingresar</button>

        <p className="register">
          ¿No tienes cuenta?
          <Link to="/register"> Registrarse</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;