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

import { useContext } from "react";
import { UserContext } from "./context/UserContext"; // Importamos el UserContext para poder acceder al token y mostrar el perfil solo si el usuario está logueado, y si no lo está, redirigir al login.

function App() {
  // *const token = false; // Simulamos que el usuario NO está logueado (cambia a true para simular que sí lo está) */

  const { token } = useContext(UserContext); // Extraemos el token de nuestro almacen global usando el hook useContext, para poder mostrar el perfil solo si el usuario está logueado, y si no lo está, redirigir al login.

  return (
    <>
      {/* <Navegacion token={token} /> */}{" "}
      {/* Ahora el token se obtiene desde el contexto global, no se pasa como prop, por lo tanto se cambia o se borra*/}
      <Navegacion />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<Pizza />} />

        {/* 👇 BLOQUE DE RUTAS PROTEGIDAS 👇 */}
        {/* Si hay token, lo mandamos al inicio. Si no, mostramos el Login */}

        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />

        {/* Si hay token, lo mandamos al inicio. Si no, mostramos el Registro */}
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <Register />}
        />

        {/* Si hay token, mostramos el Perfil. Si no, lo mandamos al Login */}
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
