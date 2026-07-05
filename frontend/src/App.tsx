import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Reportes from "./pages/Reportes";
import Mapa from "./pages/Mapa";
import Register from "./pages/Register";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path= "/reportes" element ={<Reportes />} />

        <Route path="/mapa" element={<Mapa />} />

        <Route path="/register" element={<Register />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;