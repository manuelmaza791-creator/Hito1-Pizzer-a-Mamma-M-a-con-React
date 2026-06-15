import { createContext, useState } from "react";

// Creamos el contexto
export const UserContext = createContext();

// Creamos el provider
export const UserProvider = ({ children }) => {
  // creamos un estado que almacene el token, por defecto estará en true para simular que el usuario está logueado, y se puede cambiar a false para simular que el usuario no está logueado.
  //1. Actualizamos el token para que inicie vacio (null) y agregamos el estado para el email del usuario, también iniciando vacío (null).
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  // 2. Metodo para iniciar sesion (Login)
  const login = async (userEmail, userPassword) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      const data = await response.json();

      // Si el backend nos devuelve un token lo guardamos junto con el email del usuario en el estado, para simular que el usuario se ha logueado correctamente.
      if (data?.token) {
        setToken(data.token);
        setEmail(data.email);
      } else {
        // Si las credenciales son incorrectas mostramos el error que nos devuelve el backend.
        alert(data?.error || "Error al iniciar sesion");
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  // Metodo para registrarse (Register)
  const register = async (userEmail, userPassword) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      const data = await response.json();

      // Al registrarse exitosamente, el backend tambien devuelve un token y lo guardamos.
      if (data?.token) {
        setToken(data.token);
        setEmail(data.email);
      } else {
        alert(data?.error || "Error al registrarse");
      }
    } catch (error) {
      console.error("Error en register:", error);
    }
  };

  // 3. Método para obtener el perfil de usuario (Profile)
  const getProfile = async () => {
    // Si no hay token guardado en el estado, no intentemos ir al backend
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data; // Devolvemos la informacion del perfil(email, id , etc) para que pueda ser usada en cualquier componente que lo necesite.
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

  // Método logout que cambie el estado del token a false, para simular que el usuario se ha deslogueado.
  // Método logout que limpie el token o limpiar la sesion, para simular que el usuario se ha deslogueado.
  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  return (
    // Compartimos los nuevos estados y metodos con toda la aplicacion.
    <UserContext.Provider
      value={{ token, email, login, register, logout, getProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};
