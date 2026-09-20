import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SidebarProvider } from "./context/SidebarProvider";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Reportes from "./pages/Reportes";
import Mapa from "./pages/Mapa";
import Register from "./pages/Register";
import Zonas from "./pages/Zonas";
import CrearReporte from "./pages/CrearReporte";
import DetalleReporte from "./pages/DetalleReportes";

import TiposReaccion from "./pages/TiposReaccion";

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/tipos-reaccion" element={<TiposReaccion />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/register" element={<Register />} />
            <Route path="/zonas" element={<Zonas />} />
            <Route path="/crear-reporte" element={<CrearReporte />} />
            <Route path="/reporte/:id" element={<DetalleReporte />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
