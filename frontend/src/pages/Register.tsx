import "../App.css";

function Register() {
  return (
    <div className="container">
      <h1 className="title">
        Hawkins Anomalies
      </h1>

      <div className="login-box">
        <h2>Registrarse</h2>

        <input
          type="text"
          placeholder="Nombre de usuario"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
        />

        <input
          type="password"
          placeholder="Contraseña"
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
        />

        <button>Crear cuenta</button>

        <p className="register">
          ¿Ya tienes cuenta?
          <a href="#"> Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
}

export default Register;