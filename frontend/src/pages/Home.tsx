import Layout from "../components/Layout/Layout";
import "../styles/Home.css";

function Home() {
  return (
    <Layout>
      <header>
        <h1>Inicio</h1>
      </header>

      <section className="cards">
        <div className="card">
          <h2>Reportes recientes</h2>
          <p>No hay reportes.</p>
        </div>

        <div className="card">
          <h2>Reportes peligrosos</h2>
          <p>Sin actividad.</p>
        </div>
      </section>
    </Layout>
  );
}

export default Home;