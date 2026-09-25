import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SidebarProvider } from "./context/SidebarProvider";

import AdminPanel from "./pages/AdminPanel";
import RutaAdmin from "./components/RutaAdmin";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminReportes from "./pages/AdminReportes";
import Categorias from './pages/Categorias';
import Vigilantes from './pages/Vigilantes';

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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/zonas" element={<Zonas />} />
            <Route path="/crear-reporte" element={<CrearReporte />} />
            <Route path="/reporte/:id" element={<DetalleReporte />} />            
            
            /* links protegidos, solo pueden verlos un admin y los usuarios son redirigidos a la home */

            <Route path="/admin/categorias" element={
              <RutaAdmin>
                <Categorias />
              </RutaAdmin>
              } />
            <Route path="/admin/vigilantes" element={
              <RutaAdmin>
                <Vigilantes />
              </RutaAdmin>
              } />
            <Route path="/admin/tipos-reaccion" element={
              <RutaAdmin>
                <TiposReaccion />
              </RutaAdmin>
              } />

            <Route path="/admin" element={
              <RutaAdmin>
                <AdminPanel />
              </RutaAdmin>
              }
            />
            <Route path="/admin/usuarios" element={
              <RutaAdmin>
                <AdminUsuarios />
              </RutaAdmin>
              }
            />
            <Route path="/admin/reportes" element={
              <RutaAdmin>
                <AdminReportes />
              </RutaAdmin>
              }
            />
            </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
