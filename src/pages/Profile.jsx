import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  // 1. Extraemos la informacion del usuario y la funcion de cierre de sesion desde el contexto.
  const { email, logout } = useContext(UserContext);

  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm p-5">
            <h2>Mi Perfil</h2>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Avatar de usuario"
              className="mx-auto mb-3"
              style={{ width: "100px" }}
            />

            {/* Mostramos el email del usuario autenticado */}
            <p className="fs-5 mt-4">
              <strong>Usuario:</strong> {email || "cargando email..."}
            </p>

            {/* Boton para cerrar sesion */}
            <button className="btn btn-danger mt-4 px-5" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
