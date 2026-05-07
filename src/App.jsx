import { Routes, Route, Navigate } from "react-router-dom";
// // Importamos el Navbar y Footer ( estan en una carpeta 'components')
import Navegacion from "./components/navbar/Navegacion";
import Footer from "./components/footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  const token = false; // Simulamos que el usuario NO está logueado (cambia a true para simular que sí lo está)
  return (
    <>
      <Navegacion token={token} />
      <Routes>
        {/* Bloque de rutas dinámicas */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza" element={<Pizza />} />

        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />

        {/* Requerimiento 4: El comodín "*" atrapa cualquier ruta que no exista () */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
