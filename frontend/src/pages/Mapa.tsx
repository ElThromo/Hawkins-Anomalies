import Layout from "../components/Layout/Layout";
import "../styles/Home.css";

function Mapa() {
    return (
        <>
            <Layout>

                <header>
                    <h1>Mapa</h1>
                    <p>Visualización de anomalías detectadas en Hawkins.</p>
                </header>

                <section className="cards">

                    <div
                        className="card"
                        style={{
                            height: "500px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "1.2rem"
                        }}
                    >
                        🗺️ Aquí aparecerá el mapa interactivo de Hawkins.
                    </div>

                </section>

            </Layout>
        </>
    );
}

export default Mapa;