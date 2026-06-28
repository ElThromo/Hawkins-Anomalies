import "../App.css";

function Login() {
  return (
    <div className="container">

      <h1 className="title">
        Hawkins Anomalies
      </h1>

      <div className="login-box">

        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
        />

        <input
          type="password"
          placeholder="Contraseña"
        />

        <button>Ingresar</button>

        <p className="register">
          ¿No tienes cuenta?
          <a href="#"> Registrarse</a>
        </p>

      </div>

    </div>
  );
}

export default Login;