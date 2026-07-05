import Sidebar from "../components/Sidebar/Sidebar";

import "../App.css";

function Reportes(){
    return (
        <>
            <Sidebar />

            <main className="home">

                <header>
                    <h1>Reportes</h1>
                    <p>Consulta y administra todos los reportes registrados.</p>
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

            </main>
        </>
    );
}

export default Reportes;