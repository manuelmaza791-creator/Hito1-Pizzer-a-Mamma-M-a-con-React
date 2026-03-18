import React from "react";
import Boton from "./../boton/Boton";

function Navegacion() {
  const Total = 25000;
  const token = false; // Simulamos que el usuario NO está logueado (cambia a true para simular que sí lo está)
  return (
    <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between">
      <div className="d-flex align-items-center gap-2">
        <span className="navbar-brand mb-0 h1 text-white">
          🍕 Pizzería Mamma Mía!
        </span>

        <Boton icono="🏠" texto="Home" claseColor="btn-outline-light" />
        {/* Aquí abrimos las llaves de JavaScript para indicar el código condicional del token */}
        {token ? (
          // SI ES VERDADERO (Está logueado): Mostramos Profile y Logout
          <>
            <Boton icono="🔓" texto="Profile" claseColor="btn-outline-light" />
            <Boton icono="🔓" texto="Logout" claseColor="btn-outline-light" />
          </>
        ) : (
          // SI ES FALSO (No está logueado): Mostramos Login y Register
          <>
            <Boton icono="🔐" texto="Login" claseColor="btn-outline-light" />
            <Boton icono="🔏" texto="Register" claseColor="btn-outline-light" />
          </>
        )}
      </div>

      <div>
        <Boton
          icono="🛒"
          texto={`Total: $${Total.toLocaleString()}`}
          claseColor="btn-info text-white border-info"
        />
      </div>
    </nav>
  );
}

export default Navegacion;
