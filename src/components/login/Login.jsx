import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  // Creamos un arreglo de usuarios registrados para validar el login.
  const listadoUsuarios = [
    { email: "manuel@gmail.com", password: "123456" },
    { email: "maria@gmail.com", password: "abcdef" },
  ];

  // Creamos el estado para el formulario de login, que tendrá los campos de email y password, y el estado para el error y el login exitoso.
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginExitoso, setLoginExitoso] = useState(false);

  // 1 creamos una funcion que se encargue de actualizar cualquier cambio que el usuario toque y la llamamos en cada input, para que cada vez que el usuario escriba algo, se actualice el estado del formulario.
  const handleChange = (e) => {
    const { name, value } = e.target; // Desestructuramos el evento para obtener el nombre del campo y su valor

    setFormLogin({
      ...formLogin,
      [name]: value,
    });
    setError(false);
    return;
  };

  // 2. Creamos la funcion para validar los datos, y en caso de que el email no exista, mostrar un mensaje de error, y si todo esta correcto, mostrar un mensaje de bienvenida.
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginExitoso(false); // Reiniciamos el estado de login exitoso cada vez que se intenta enviar el formulario

    // 2.1 Validamos que los campos no estén vacíos
    if (formLogin.email === "" || formLogin.password === "") {
      setError(true);
      return;
    }

    //2.2 Buscamos el usario en el listado de usuarios registrados con .find(), y si no lo encontramos, mostramos un mensaje de error, y si lo encontramos, mostramos un mensaje de bienvenida.

    const emailEncontrado = listadoUsuarios.find(
      (usuario) => usuario.email === formLogin.email,
    );
    // 2.3 si no lo encuentra (sera falso), mostramos un mensaje de error, y si lo encuentra, mostramos un mensaje de bienvenida.
    if (!emailEncontrado) {
      setEmailError(true);
      return;
    }

    // 2.4 Comprobamos la contraseña, si no coincide, mostramos un mensaje de error, y si coincide, mostramos un mensaje de bienvenida.
    if (emailEncontrado.password !== formLogin.password) {
      setError(true);
      return;
    }

    if (emailEncontrado.password === formLogin.password) {
      setLoginExitoso(true);
    }

    setFormLogin({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit}>
              {error && (
                <p className="error text-danger">llenar todos los campos</p>
              )}
              {emailError && (
                <p className="error text-danger">Email no existe</p>
              )}
              {error && (
                <p className="error text-danger">Contaseña incorrecta</p>
              )}
              {loginExitoso && (
                <p className="text-success">Ingreso exitoso, Bienvenid@</p>
              )}
              <div className="form-group text-center">
                <label>Email</label>
                <input
                  text
                  align="center"
                  type="text"
                  name="email"
                  className="form-control text-center"
                  placeholder="Ingrese su Email"
                  value={formLogin.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group text-center">
                <label>Password</label>
                <input
                  text
                  align="center"
                  type="password"
                  name="password"
                  className="form-control text-center"
                  placeholder="Ingrese su contraseña"
                  value={formLogin.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-3 text-center"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
