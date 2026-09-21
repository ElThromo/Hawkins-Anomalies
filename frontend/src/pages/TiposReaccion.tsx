import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/useAuth";
import "../styles/TiposReaccion.css";

type TipoReaccion = { idTipoReaccion: number; nombre: string; emoji: string };
const API = "http://localhost:3000/tipos-reaccion";

export default function TiposReaccion() {
  const { usuario, token } = useAuth();
  const [tipos, setTipos] = useState<TipoReaccion[]>([]);
  const [nombre, setNombre] = useState("");
  const [emoji, setEmoji] = useState("");
  const [editando, setEditando] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [intento, setIntento] = useState(0);
  const nombreRef = useRef<HTMLInputElement>(null);
  const esAdmin = usuario?.rol === "ADMIN" && !!token;

  useEffect(() => {
    if (!esAdmin) return;
    const abort = new AbortController();
    async function cargar() {
      setCargando(true);
      setError("");
      try {
        const respuesta = await fetch(API, { signal: abort.signal });
        const datos = await respuesta.json();
        if (!respuesta.ok) throw new Error(datos.error || "No se pudo cargar el catálogo");
        setTipos(datos);
      } catch (err) {
        if (!abort.signal.aborted) setError(err instanceof Error ? err.message : "No se pudo conectar con el servidor");
      } finally {
        if (!abort.signal.aborted) setCargando(false);
      }
    }
    void cargar();
    return () => abort.abort();
  }, [esAdmin, intento]);

  function limpiar() {
    setEditando(null);
    setNombre("");
    setEmoji("");
  }

  async function guardar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (ocupado) return;
    setError("");
    setMensaje("");
    if (!nombre.trim() || !emoji.trim()) {
      setError("Completá el nombre y el emoji");
      return;
    }
    setOcupado(true);
    try {
      const respuesta = await fetch(editando === null ? API : `${API}/${editando}`, {
        method: editando === null ? "POST" : "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ nombre: nombre.trim(), emoji: emoji.trim() })
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error || "No se pudieron guardar los cambios");
      setTipos(anteriores => editando === null
        ? [...anteriores, datos.tipoReaccion]
        : anteriores.map(tipo => tipo.idTipoReaccion === editando ? datos.tipoReaccion : tipo));
      setMensaje(datos.mensaje);
      limpiar();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo conectar con el servidor");
    } finally { setOcupado(false); }
  }

  async function eliminar(tipo: TipoReaccion) {
    if (ocupado || !window.confirm(`¿Eliminar el tipo «${tipo.nombre}»?`)) return;
    setOcupado(true);
    setError("");
    setMensaje("");
    try {
      const respuesta = await fetch(`${API}/${tipo.idTipoReaccion}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` }
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error || "No se pudo eliminar el tipo");
      setTipos(anteriores => anteriores.filter(item => item.idTipoReaccion !== tipo.idTipoReaccion));
      if (editando === tipo.idTipoReaccion) limpiar();
      setMensaje(datos.mensaje);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo conectar con el servidor");
    } finally { setOcupado(false); }
  }

  if (!esAdmin) return <Layout><section className="tipos-admin">
    <h1>Tipos de reacción</h1>
    <p>Esta sección está disponible para administradores.</p>
    {!token && <Link to="/login">Iniciar sesión</Link>}
  </section></Layout>;

  return <Layout><section className="tipos-admin">
    <header><p>Administración</p><h1>Tipos de reacción</h1>
      <p>Elegí las reacciones disponibles para los reportes.</p></header>
    {error && <p className="tipos-error" role="alert">{error}</p>}
    {mensaje && <p className="tipos-exito" role="status">{mensaje}</p>}
    <form onSubmit={guardar} className="tipos-panel">
      <h2>{editando === null ? "Nuevo tipo" : "Editar tipo"}</h2>
      <fieldset disabled={ocupado || cargando}>
        <label>Nombre<input ref={nombreRef} required maxLength={191} value={nombre}
          onChange={e => setNombre(e.target.value)} placeholder="Ej.: Sorpresa" /></label>
        <label>Emoji<input required maxLength={191} value={emoji}
          onChange={e => setEmoji(e.target.value)} placeholder="😮" aria-describedby="emoji-ayuda" /></label>
        <p id="emoji-ayuda">Pegá un emoji o abrí el selector de Windows con Windows + punto.</p>
        <div className="tipos-acciones"><button type="submit">{ocupado ? "Procesando…" : editando === null ? "Crear tipo" : "Guardar cambios"}</button>
          {editando !== null && <button type="button" onClick={limpiar}>Cancelar</button>}</div>
      </fieldset>
    </form>
    <section className="tipos-panel" aria-busy={cargando}>
      <div className="tipos-cabecera"><h2>Catálogo</h2><button disabled={ocupado || cargando} onClick={() => setIntento(n => n + 1)}>Actualizar lista</button></div>
      <p>Los tipos que ya tienen reacciones se pueden editar, pero no eliminar.</p>
      {cargando ? <p role="status">Cargando tipos…</p> : tipos.length === 0 ? <p>No hay tipos de reacción cargados.</p> :
        <ul className="tipos-lista">{tipos.map(tipo => <li key={tipo.idTipoReaccion}>
          <div className="tipos-identidad"><span className="tipos-emoji" aria-hidden="true">{tipo.emoji}</span><strong>{tipo.nombre}</strong></div>
          <div className="tipos-acciones"><button disabled={ocupado} aria-label={`Editar ${tipo.nombre}`} onClick={() => {
            setEditando(tipo.idTipoReaccion); setNombre(tipo.nombre); setEmoji(tipo.emoji);
            setError(""); setMensaje(""); nombreRef.current?.focus();
          }}>Editar</button><button disabled={ocupado} aria-label={`Eliminar ${tipo.nombre}`} onClick={() => void eliminar(tipo)}>Eliminar</button></div>
        </li>)}</ul>}
    </section>
  </section></Layout>;
}
