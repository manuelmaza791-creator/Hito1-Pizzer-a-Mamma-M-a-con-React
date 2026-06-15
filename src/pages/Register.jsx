import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  // 1. Traemos la funcion de conexion al backend para validar el registro desde el contexto.
  const { register } = useContext(UserContext); // Nuevo:  Extraemos la función de register del contexto para conectarnos con el backend y registrar al usuario.

  // 2. Estado ordenado en un solo objeto para el formulario.

  // const [usuariosRegistrados, setUsuariosRegistrados] = useState([]); // Aquí se almacenarán los usuarios registrados, en un caso real esto vendría de una base de datos o un contexto global. Ya no es necesario para este ejemplo ya que el registro se maneja con el backend, pero lo dejamos aquí para mostrar cómo se podría manejar una lista de usuarios registrados en memoria.
  const [formRegister, setformRegister] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 3. Estados para manejar los errores visuales (UX) y el registro exitoso.
  const [errorVacio, setErrorVacio] = useState(false);
  const [errorFormato, setErrorFormato] = useState(false);
  const [errorCoincidencia, setErrorCoincidencia] = useState(false);
  const [errorLongitud, setErrorLongitud] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  // 4. creamos una funcion que se encargue de actualizar cualquier cambio que el usuario toque y la llamamos en cada input, para que cada vez que el usuario escriba algo, se actualice el estado del formulario.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformRegister({
      ...formRegister, // 1. Hacemos una copia de todo lo que ya estaba
      [name]: value, // 2. Actualizamos el campo específico que el usuario modificó
    });
    // Limpiamos errores mientras el usuario escribe.
    setErrorVacio(false); // Reiniciamos el estado de error de campos vacíos cada vez que el usuario cambia algo
    setErrorFormato(false); // Reiniciamos el estado de error de formato de email cada vez que el usuario cambia algo
    setErrorCoincidencia(false); // Reiniciamos el estado de error de coincidencia de contraseña cada vez que el usuario cambia algo
    setErrorLongitud(false); // Reiniciamos el estado de error de longitud de contraseña cada vez que el usuario cambia algo
    setRegistroExitoso(false); // Reiniciamos el estado de registro exitoso cada vez que el usuario cambia algo
  };

  // 5. Fnucion para enviar los datos al backend.
  // Ahora creamos la funcion para validar los datos, y en caso de que el email exista, mostrar un mensaje de error, y si todo esta correcto, agregar el nuevo usuario a la lista de usuarios y limpiar el formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiamos mensajes previos cada vez que se intenta enviar el formulario.
    setRegistroExitoso(false); // Reiniciamos el estado de registro exitoso cada vez que se intenta enviar el formulario
    setErrorVacio(false);
    setErrorFormato(false);
    setErrorCoincidencia(false);
    setErrorLongitud(false);

    // Desestructuramos el estado del formulario para obtener los valores de email, password y confirmPassword, esto nos facilita la lectura y el manejo de los datos.
    const { email, password, confirmPassword } = formRegister;

    // Validamos que los campos no estén vacíos
    if (
      formRegister.email === "" ||
      formRegister.password === "" ||
      formRegister.confirmPassword === ""
    ) {
      setErrorVacio(true);
      return;
    }

    // Validamos el formato del email utilizando una expresión regular simple
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(formRegister.email)) {
      setErrorFormato(true);
      return;
    }

    // Validamos que las contraseñas coincidan
    if (formRegister.password !== formRegister.confirmPassword) {
      setErrorCoincidencia(true);
      return;
    }

    // Validamos que la contraseña tenga al menos 6 caracteres
    if (formRegister.password.length < 6) {
      setErrorLongitud(true);
      return;
    }

    // <---- Todo este bloque de codigo no es necesario para el ejemplo actual, ya que el registro se maneja con el backend, pero lo dejamos aquí para mostrar cómo se podría manejar la validación y el almacenamiento de usuarios registrados en memoria, sin necesidad de un backend, aunque esto no es recomendable para una aplicación real, ya que los datos no se persistirían y se perderían al recargar la página.  ----->

    // Validamos que el email no exista en la lista de usuarios registrados
    // const emailExiste = usuariosRegistrados.some(
    //  (usuario) => usuario.email === formRegister.email,
    //);
    // if (emailExiste) {
    //  setEmailError(true);
    //  return;
    //}

    //const id = Date.now(); // Generamos un ID único para el nuevo usuario, en un caso real esto lo haría la base de datos.

    // Agregamos el nuevo usuario a la lista de usuarios registrados
    // setUsuariosRegistrados((prev) => [...prev, { ...formRegister, id }]);
    // setformRegister({
    //  email: "",
    //  password: "",
    //  confirmPassword: "",
    //});

    // setError(false);
    // setEmailError(false);
    // setRegistroExitoso(true);

    // 👇 AQUÍ OCURRE LO IMPORTANTE : Enviamos los datos reales al backend
    await register(email, password); // Nuevo :  Llamamos a la función de register del contexto para validar el registro con el backend, esta función se encarga de hacer la petición al backend y manejar la respuesta, si el registro es exitoso, se guarda el token en el localStorage y se actualiza el estado del usuario en el contexto, si el registro es fallido, se muestra un mensaje de error.

    setRegistroExitoso(true); // Si el registro es exitoso, mostramos el mensaje de registro exitoso.
    setformRegister({
      // Limpiamos el formulario después de un registro exitoso.
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit} className="formulario" method="POST">
              {errorVacio && (
                <p className="error text-danger">
                  Todos los campos son obligatorios
                </p>
              )}
              {errorFormato && (
                <p className="error text-danger">El email no es válido</p>
              )}
              {errorCoincidencia && (
                <p className="error text-danger">
                  Las contraseñas no coinciden
                </p>
              )}
              {errorLongitud && (
                <p className="error text-danger">
                  La contraseña debe tener al menos 6 caracteres
                </p>
              )}
              {registroExitoso && (
                <p className="success text-success">Registro exitoso</p>
              )}

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
