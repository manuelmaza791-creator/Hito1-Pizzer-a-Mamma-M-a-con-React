import { createContext, useState, useEffect } from "react";

// Creamos el context de las pizzas (almacen vacío)  donde ira la informacion de las pizzas y las funciones para modificarlo
export const PizzaContext = createContext();

// Creamos el provider (el administrador del almacen) que va a envolver a toda la app para que cualquier componente pueda acceder a las pizzas y modificarlo
export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);

  // Usamos la url de la API, que ya esta en el home,  para obtener los datos de las pizzas
  const url = "http://localhost:5000/api/pizzas";

  // Logica del fetch centralizada en el context para no tener que repetirla en cada componente que necesite las pizzas, y asi mantener el codigo mas limpio y organizado. Esta funcion se encarga de hacer la peticion a la API para obtener los datos de las pizzas, y actualizar el estado pizzas con esos datos.
  const getPizzas = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPizzas(data); // Guardamos las pizzas globalmente . Actualizamos el estado pizzas con los datos obtenidos de la API usando la función setPizzas.
    } catch (error) {
      console.error("Error al cargar las pizzas de la Api:", error);
    }
  };

  // Se ejecuta una sola vez cuando se monta la aplicacion y se encarga de llamar a la funcion getPizzas para cargar los datos de las pizzas desde la API y guardarlos en el estado pizzas, para que esten disponibles globalmente en toda la app. De esta manera, cuando se renderice la app, las pizzas ya estaran cargadas y listas para ser usadas por cualquier componente que las necesite.
  useEffect(() => {
    getPizzas(); // Llamamos a la función getPizzas al momento de montar el provider, para que los datos se carguen automáticamente cuando se renderice la app.
  }, []);

  return (
    // Compartimos el arreglo de pizzas con toda la app.
    <PizzaContext.Provider value={{ pizzas }}>{children}</PizzaContext.Provider>
  );
};
