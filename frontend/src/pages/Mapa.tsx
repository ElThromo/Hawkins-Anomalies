import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/Home.css";

function Mapa() {
    return (
        <>
            <Sidebar />

            <main className="home">

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

            </main>
        </>
    );
}

export default Mapa;