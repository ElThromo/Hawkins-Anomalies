import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";


import Login from "./pages/Login";
import Home from "./pages/Home";
import Reportes from "./pages/Reportes";
import Mapa from "./pages/Mapa";
import Register from "./pages/Register";
import Zonas from "./pages/Zonas";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/register" element={<Register />} />
          <Route path="/zonas" element={<Zonas />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
