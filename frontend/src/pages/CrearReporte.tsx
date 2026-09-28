import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "../styles/Home.css";
import "../styles/CrearReporte.css";
import Layout from "../components/Layout/Layout";

interface Zona {
  idZona: number;
  nombre: string;
}

interface Categoria {
  idCategoria: number;
  nombre: string;
}

function CrearReporte() {
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [idZona, setIdZona] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [imagenes, setImagenes] = useState<FileList | null>(null);

  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [resZonas, resCategorias] = await Promise.all([
          fetch("http://localhost:3000/zonas"),
          fetch("http://localhost:3000/categorias")
        ]);

        setZonas(await resZonas.json());
        setCategorias(await resCategorias.json());
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar zonas y categorías");
      }
    }

    cargarDatos();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!titulo || !cuerpo || !idZona || !idCategoria) {
      setError("Completá todos los campos");
      return;
    }

    setEnviando(true);

    try {
      const respuesta = await fetch("http://localhost:3000/reportes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo,
          cuerpo,
          idZona: Number(idZona),
          idCategoria: Number(idCategoria)
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error || "Error al crear el reporte");
        setEnviando(false);
        return;
      }

      const idReporteCreado = datos.reporte.idReporte;

      if (imagenes && imagenes.length > 0) {
        const formData = new FormData();
        Array.from(imagenes).forEach((archivo) => {
          formData.append("imagenes", archivo);
        });

        const respuestaImagenes = await fetch(`http://localhost:3000/reportes/${idReporteCreado}/imagenes`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: formData
        });

        if (!respuestaImagenes.ok) {
          console.error("El reporte se creó pero hubo un error al subir las imágenes");
        }
      }

      navigate(`/reporte/${idReporteCreado}`);
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
      setEnviando(false);
    }
  }

  function handleImagenesChange(e: React.ChangeEvent<HTMLInputElement>) {
  setImagenes(e.target.files);
  }

  return (
    <>
      <Layout>
        <header>
          <h1>Crear reporte</h1>
        </header>

        <form className="reporte-box" onSubmit={handleSubmit}>
          {error && <p className="reporte-error">{error}</p>}

          <label>
            Título
            <input
              type="text"
              placeholder="Ej: Luces extrañas en el bosque"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </label>

          <label>
            Descripción
            <textarea
              placeholder="Describí lo que viste con el mayor detalle posible..."
              rows={6}
              value={cuerpo}
              onChange={(e) => setCuerpo(e.target.value)}
            />
          </label>

          <div className="reporte-selects">
            <label>
              Zona
              <select value={idZona} onChange={(e) => setIdZona(e.target.value)}>
                <option value="">Seleccioná una zona</option>
                {zonas.map((zona) => (
                  <option key={zona.idZona} value={zona.idZona}>
                    {zona.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Categoría
              <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                <option value="">Seleccioná una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.idCategoria} value={categoria.idCategoria}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Imágenes (opcional, máximo 5)
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              multiple
              onChange={handleImagenesChange}
            />
          </label>

          <button type="submit" disabled={enviando}>
            {enviando ? "Enviando..." : "Publicar reporte"}
          </button>
        </form>
      </Layout>
    </>
  );
}

export default CrearReporte;