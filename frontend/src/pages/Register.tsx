import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (contrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, contrasena })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error || "Error al crear la cuenta");
        return;
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Hawkins Anomalies</h1>

      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>

        {error && <p style={{ color: "#e63946", textAlign: "center" }}>{error}</p>}

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

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

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmarContrasena}
          onChange={(e) => setConfirmarContrasena(e.target.value)}
        />

        <button type="submit">Crear cuenta</button>

        <p className="register">
          ¿Ya tienes cuenta?
          <Link to="/login"> Iniciar sesión</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;