import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/useAuth";
import "../styles/EditarPerfil.css";

function EditarPerfil() {
  const { usuario, token, actualizarUsuario } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState(usuario?.nombre ?? "");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [guardandoNombre, setGuardandoNombre] = useState(false);
  const [subiendoAvatar, setSubiendoAvatar] = useState(false);
  const inputArchivoRef = useRef<HTMLInputElement>(null);

  if (!usuario) {
    navigate("/login");
    return null;
  }

  async function handleGuardarNombre(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!nombre.trim()) {
      setError("El nombre no puede estar vacío");
      return;
    }

    setGuardandoNombre(true);
    try {
      const respuesta = await fetch("http://localhost:3000/usuarios/perfil/editar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: nombre.trim() })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error || "Error al actualizar el nombre");
        return;
      }

      actualizarUsuario(datos.usuario);
      setMensaje("Nombre actualizado correctamente");
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setGuardandoNombre(false);
    }
  }

  async function handleSeleccionarAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    setError("");
    setMensaje("");
    setSubiendoAvatar(true);

    try {
      const formData = new FormData();
      formData.append("avatar", archivo);

      const respuesta = await fetch("http://localhost:3000/usuarios/perfil/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error || "Error al subir la imagen");
        return;
      }

      actualizarUsuario(datos.usuario);
      setMensaje("Foto de perfil actualizada");
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setSubiendoAvatar(false);
      if (inputArchivoRef.current) inputArchivoRef.current.value = "";
    }
  }

  const avatarUrl = usuario.avatar
    ? `http://localhost:3000${usuario.avatar}`
    : null;

  return (
    <Layout>
      <header>
        <h1>Editar perfil</h1>
      </header>

      <div className="perfil-box">
        {mensaje && <p className="perfil-mensaje-exito">{mensaje}</p>}
        {error && <p className="perfil-mensaje-error">{error}</p>}

        <div className="perfil-avatar-seccion">
          <div className="perfil-avatar-preview">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" />
            ) : (
              <span className="perfil-avatar-inicial">{usuario.nombre.charAt(0).toUpperCase()}</span>
            )}
          </div>

          <div>
            <button
              type="button"
              className="btn-secundario"
              onClick={() => inputArchivoRef.current?.click()}
              disabled={subiendoAvatar}
            >
              {subiendoAvatar ? "Subiendo..." : "Cambiar foto"}
            </button>
            <input
              ref={inputArchivoRef}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleSeleccionarAvatar}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <form onSubmit={handleGuardarNombre} className="perfil-form">
          <label>
            Nombre de usuario
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>

          <button type="submit" className="btn-primary" disabled={guardandoNombre}>
            {guardandoNombre ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditarPerfil;