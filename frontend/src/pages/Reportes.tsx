import Layout from "../components/Layout/Layout";

import "../App.css";

function Reportes(){
    return (
        <>
            <Layout>

                <header>
                    <h1>Reportes</h1>
                    <h2>Consulta y administra todos los reportes registrados.</h2>
                </header>

                <section className="cards">

                    <div className="card">
                        <h2>Reportes recientes</h2>
                        <p>Próximamente se mostrarán aquí los últimos reportes.</p>
                    </div>

                    <div className="card">
                        <h2>Filtros</h2>
                        <p>Filtrar por ubicación, nivel de peligro o fecha.</p>
                    </div>

                </section>

            </Layout>
        </>
    );
}

export default Reportes;