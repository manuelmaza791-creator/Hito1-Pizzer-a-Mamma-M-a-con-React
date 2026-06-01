import { createContext, useState } from "react";

// Creamos el contexto
export const UserContext = createContext();

// Creamos el provider
export const UserProvider = ({ children }) => {
  // creamos un estado que almacene el token, por defecto estará en true para simular que el usuario está logueado, y se puede cambiar a false para simular que el usuario no está logueado.
  const [token, setToken] = useState(true);

  // Metodo logout que cambie el estado del token a false, para simular que el usuario se ha deslogueado.
  const logout = () => {
    setToken(false);
  };

  return (
    // Compartimos el token y la funcion logout con el resto de la app.
    <UserContext.Provider value={{ token, logout }}>
      {children}
    </UserContext.Provider>
  );
};
