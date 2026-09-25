import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "../styles/Home.css";

interface Reporte {
  idReporte: number;
  titulo: string;
  fechaHora: string;
  estado: string;
  zona: { nombre: string; nivelPeligro: string };
  categoria: { nombre: string };
}

function Home() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarReportes() {
      try {
        const respuesta = await fetch("http://localhost:3000/reportes");

        if (!respuesta.ok) {
          setError("No se pudieron cargar los reportes");
          return;
        }

        const datos = await respuesta.json();
        setReportes(datos);
      } catch (err) {
        console.error(err);
        setError("No se pudo conectar con el servidor");
      } finally {
        setCargando(false);
      }
    }

    cargarReportes();
  }, []);


  const recientes = reportes.slice(0, 5);

  const peligrosos = reportes
    .filter((r) => r.zona.nivelPeligro === "CRITICO")
    .slice(0, 5);

  return (
    <Layout>
      <header>
        <h1>Inicio</h1>
      </header>

      <section className="cards">
        <div className="card">
          <h2>Reportes recientes</h2>

          {cargando && <p>Cargando...</p>}
          {error && <p className="card-error">{error}</p>}

          {!cargando && !error && recientes.length === 0 && (
            <p>No hay reportes.</p>
          )}

          {!cargando && !error && recientes.length > 0 && (
            <ul className="lista-reportes">
              {recientes.map((reporte) => (
                <li key={reporte.idReporte}>
                  <Link to={`/reporte/${reporte.idReporte}`}>
                    <span className="reporte-titulo">{reporte.titulo}</span>
                    <span className="reporte-sub">{reporte.zona.nombre} · {reporte.categoria.nombre}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2>Reportes peligrosos</h2>

          {cargando && <p>Cargando...</p>}
          {error && <p className="card-error">{error}</p>}

          {!cargando && !error && peligrosos.length === 0 && (
            <p>Sin actividad.</p>
          )}

          {!cargando && !error && peligrosos.length > 0 && (
            <ul className="lista-reportes">
              {peligrosos.map((reporte) => (
                <li key={reporte.idReporte}>
                  <Link to={`/reporte/${reporte.idReporte}`}>
                    <span className="reporte-titulo">{reporte.titulo}</span>
                    <span className="reporte-sub">{reporte.zona.nombre} · Crítico</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Home;