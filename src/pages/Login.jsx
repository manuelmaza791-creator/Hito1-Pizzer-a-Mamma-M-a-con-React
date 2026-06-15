import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  // 1. Traemos la funcion de conexion al backend para validar el login desde el contexto.
  const { login } = useContext(UserContext);

  // Creamos un arreglo de usuarios registrados para validar el login.
  //const listadoUsuarios = [
  // { email: "manuel@gmail.com", password: "123456" },
  //  { email: "maria@gmail.com", password: "abcdef" },
  // ];  No es necesario este arreglo, ya que ahora validaremos el login con el backend, pero lo dejamos comentado por si queremos hacer pruebas sin el backend.

  // 2. Creamos el estado para el formulario de login, que tendrá los campos de email y password, y el estado para el error y el login exitoso.
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  // 3. Estados visuales (UX) para mostrar mensajes de error o éxito al usuario.
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginExitoso, setLoginExitoso] = useState(false);

  // 4. creamos una funcion que se encargue de actualizar cualquier cambio que el usuario toque y la llamamos en cada input, para que cada vez que el usuario escriba algo, se actualice el estado del formulario.
  const handleChange = (e) => {
    const { name, value } = e.target; // Desestructuramos el evento para obtener el nombre del campo y su valor
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
    // Limpiamos el mensaje de error si el usuario empieza a corregir los campos.
    setError(false);
    setEmailError(false);
    return;
  };

  // 5. Creamos la funcion para validare  el envio del formulario de los datos, y en caso de que el email no exista, mostrar un mensaje de error, y si todo esta correcto, mostrar un mensaje de bienvenida.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginExitoso(false); // Reiniciamos el estado de login exitoso cada vez que se intenta enviar el formulario

    const { email, password } = formLogin;

    // 5.1 Validamos que los campos no estén vacíos
    if (formLogin.email === "" || formLogin.password === "") {
      setError(true);
      return; // Validar la direncia la diferencia al escribir formLogin.email y solo email === "" es que formLogin.email hace referencia al estado del formulario, mientras que email hace referencia a la variable que desestructuramos del estado del formulario, ambos son correctos, pero es mejor usar formLogin.email para mantener la consistencia y claridad en el código, ya que estamos trabajando con el estado del formulario.
    }

    // Le pasamos los datos al Contexto. El backend se encargará de ver si la clave es correcta o si el email existe.
    await login(email, password); // Llamamos a la función de login del contexto para validar el login con el backend, esta función se encarga de hacer la petición al backend y manejar la respuesta, si el login es exitoso, se guarda el token en el localStorage y se actualiza el estado del usuario en el contexto, si el login es fallido, se muestra un mensaje de error.

    // if (!email || !password) {
    // alert("Todos los campos son obligatorios");
    // return;}  ---> Este bloque es el mismo de arriba, es mejor usar el bloque de arriba, mas profesional y entendible, no bloquea la pagina con una ventana emergente.

    //2.2 Buscamos el usario en el listado de usuarios registrados con .find(), y si no lo encontramos, mostramos un mensaje de error, y si lo encontramos, mostramos un mensaje de bienvenida.
    // const emailEncontrado = listadoUsuarios.find(
    //  (usuario) => usuario.email === formLogin.email,
    //  );  // Ya noes necesario este bloque de codigo porque ahora validaremos el Login con el backend, pero lo dejamos comentado por si queremos hacer pruebas sin el backend.

    // 2.3 si no lo encuentra (sera falso), mostramos un mensaje de error, y si lo encuentra, mostramos un mensaje de bienvenida.
    // if (!emailEncontrado) {
    //  setEmailError(true);
    //  return;
    // }  ---> ( Este bloque y los siguiente que estan comentados ya no son necesarios porque ahora validaremos el Login con el backend. )

    // 2.4 Comprobamos la contraseña, si no coincide, mostramos un mensaje de error, y si coincide, mostramos un mensaje de bienvenida.
    // if (emailEncontrado.password !== formLogin.password) {
    //  setError(true);
    //  return;
    // }

    // if (emailEncontrado.password === formLogin.password) {
    //  setLoginExitoso(true);
    // }

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
              {/* {emailError && (
                <p className="error text-danger">Email no existe</p>
              )} */}
              {/*{error && (
                <p className="error text-danger">Contaseña incorrecta</p>
              )} */}
              {loginExitoso && (
                <p className="text-success">Ingreso exitoso, Bienvenid@</p>
              )}
              <div className="form-group text-center">
                <label>Email</label>
                <input
                  text-align="center"
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
                  text-align="center"
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
