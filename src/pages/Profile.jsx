import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const profile = () => {
  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p className="fs-4 mt-4">
        Usuario: <strong>usuario@ejemplo.com</strong>
      </p>
      <button className="btn btn-danger mt-4">Cerrar Sesión</button>
    </div>
  );
};
export default profile;
