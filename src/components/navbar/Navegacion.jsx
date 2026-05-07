import React from "react";
import Boton from "./../boton/Boton";
import { Link } from "react-router-dom";

const Navegacion = ({ token }) => {
  const Total = 25000;

  return (
    <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between">
      <div className=" container d-flex align-items-center gap-2">
        {/* El logo o título ahora es un Link al Home */}
        <Link to="/" className="navbar-brand mb-0 h1 text-white">
          🍕 Pizzería Mamma Mía!
        </Link>

        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-light">
            🏠 Home
          </Link>

          {/* EL BLOQUE CONDICIONAL DEL DESAFÍO ANTERIOR (Actualizado con Link) */}
          {/* Aquí abrimos las llaves de JavaScript para indicar el código condicional del token */}
          {token ? (
            // SI ES VERDADERO (Está logueado): Mostramos Profile y Logout
            <>
              <Link to="/profile" className="btn btn-outline-light">
                👤 Profile
              </Link>

              <Button className="btn btn-outline-light">🔓 Logout</Button>
            </>
          ) : (
            // SI ES FALSO (No está logueado): Mostramos Login y Register
            <>
              <Link to="/login" className="btn btn-outline-light">
                🔐 Login
              </Link>

              <Link to="/register" className="btn btn-outline-light">
                📝 Register
              </Link>
            </>
          )}
        </div>

        {/* El carrito siempre se muestra, pero el total es dinámico */}
        <Link to="/cart" className="btn btn-info text-white border-info">
          🛒 Total: ${Total.toLocaleString()}
        </Link>
      </div>
    </nav>
  );
};

export default Navegacion;
