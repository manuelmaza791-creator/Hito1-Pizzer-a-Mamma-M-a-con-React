import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([]); // Aquí se almacenarán los usuarios registrados, en un caso real esto vendría de una base de datos o un contexto global.
  const [formRegister, setformRegister] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  //creamos una funcion que se encargue de actualizar cualquier cambio que el usuario toque y la llamamos en cada input, para que cada vez que el usuario escriba algo, se actualice el estado del formulario.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setformRegister({
      ...formRegister, // 1. Hacemos una copia de todo lo que ya estaba
      [name]: value, // 2. Actualizamos el campo específico que el usuario modificó
    });
    setError(false); // Reiniciamos el estado de error cada vez que el usuario cambia algo
    setEmailError(false); // Reiniciamos el estado de error de email cada vez que el usuario cambia algo
  };

  // Ahora creamos la funcion para validar los datos, y en caso de que el email exista, mostrar un mensaje de error, y si todo esta correcto, agregar el nuevo usuario a la lista de usuarios y limpiar el formulario.

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistroExitoso(false); // Reiniciamos el estado de registro exitoso cada vez que se intenta enviar el formulario

    if (
      formRegister.email === "" ||
      formRegister.password === "" ||
      formRegister.confirmPassword === ""
    ) {
      setError(true);
      return;
    }

    // Validamos el formato del email utilizando una expresión regular simple
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(formRegister.email)) {
      setError(true);
      return;
    }

    // Validamos que las contraseñas coincidan y tengan al menos 6 caracteres
    if (formRegister.password !== formRegister.confirmPassword) {
      setError(true);
      return;
    }

    // Validamos que la contraseña tenga al menos 6 caracteres
    if (formRegister.password.length < 6) {
      setError(true);
      return;
    }

    // Validamos que el email no exista en la lista de usuarios registrados
    const emailExiste = usuariosRegistrados.some(
      (usuario) => usuario.email === formRegister.email,
    );
    if (emailExiste) {
      setEmailError(true);
      return;
    }

    const id = Date.now(); // Generamos un ID único para el nuevo usuario, en un caso real esto lo haría la base de datos.

    // Agregamos el nuevo usuario a la lista de usuarios registrados
    setUsuariosRegistrados((prev) => [...prev, { ...formRegister, id }]);
    setformRegister({
      email: "",
      password: "",
      confirmPassword: "",
    });

    setError(false);
    setEmailError(false);
    setRegistroExitoso(true);
  };

  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit} className="formulario" method="POST">
              {error && (
                <p className="error text-danger">
                  Todos los campos son obligatorios
                </p>
              )}
              {error && (
                <p className="error text-danger">El email no es válido</p>
              )}
              {emailError && (
                <p className="error text-danger">El email ya existe</p>
              )}
              {error &&
                formRegister.password !== formRegister.confirmPassword && (
                  <p className="error text-danger">
                    Las contraseñas no coinciden
                  </p>
                )}
              {error && formRegister.password.length < 6 && (
                <p className="error text-danger">
                  La contraseña debe tener al menos 6 caracteres
                </p>
              )}
              {registroExitoso ? (
                <p className="success text-success">Registro exitoso</p>
              ) : null}

              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Ingrese su email"
                  className="form-control text-center"
                  value={formRegister.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  className="form-control text-center"
                  value={formRegister.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Confirmar Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirme su contraseña"
                  className="form-control text-center"
                  value={formRegister.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
