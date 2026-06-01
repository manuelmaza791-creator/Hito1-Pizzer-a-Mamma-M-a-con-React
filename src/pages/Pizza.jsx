import { useState, useEffect } from "react";
import { useContext } from "react";

// importamos useParams para extraer el id de la pizza de los parametros de la url.
import { useParams } from "react-router-dom";
import { PizzaContext } from "../context/PizzaContext";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);

  // 3 pizza guardará los valores traídos desde la API
  // const [pizza, setPizza] = useState({});    al usar el context de las pizzas ya no necesitamos este estado local, porque ahora la pizza actual se obtiene del almacen global del context, y no de un estado local en este componente. Esto hace que el codigo sea mas limpio y organizado, y evita la duplicación de estados innecesarios.|

  // 2 Llamamos a la función consultarApi de pizza, al momento de montar el componente
  // useEffect(() => {
  //   consultarApi();
  // }, []);  Tampoco necesitamos este useEffect porque la logica del fetch ya esta centralizada en el context de las pizzas, y se llama automaticamente al montar el provider, por lo que los datos de las pizzas ya estan disponibles en el almacen global del context cuando se renderiza este componente.

  // 1 Creamos una funcion que consulte  la api de pizzas
  // const consultarApi = async () => {
  //  const url = "http://localhost:5000/api/pizzas/p001";
  // const response = await fetch(url);
  //  const dataPizza = await response.json();
  //  setPizza(dataPizza); // con setPizza se actualiza el estado
  // };  // tampoco necesitamos esta función consultarApi porque la logica del fetch ya esta centralizada en el context de las pizzas, y se llama automaticamente al montar el provider, por lo que los datos de las pizzas ya estan disponibles en el almacen global del context cuando se renderiza este componente.|

  // Extraemos las pizzas del almacen global del context de las pizzas usando el hook useContext, para poder buscar la pizza correspondiente al id que obtuvimos de los parametros de la url.
  // const { pizzas } = useContext(PizzaContext);

  // Extraemos el id de la pizza de los parametros de la url usando el hook useParams de react-router-dom, para poder mostrar la pizza correspondiente a ese id.
  const { id } = useParams();

  // Hacemos el fetch usando el ID especifico
  const getPizza = async () => {
    try {
      // Concatenamos el ID a la url de la API, para obtener los datos de la pizza correspondiente a ese ID.
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
      const data = await response.json();
      setPizza(data);
    } catch (error) {
      console.error("Error al obtener la pizza:", error);
    }
  };

  useEffect(() => {
    getPizza();
  }, [id]); // Colocamos el ID como dependencia del useEffect, para que cada vez que el ID cambie (cuando el usuario navegue a una pizza diferente), se vuelva a ejecutar la función getPizza y se actualice la pizza mostrada en pantalla.

  // Buscamos la pizza que coincida con el ID dentro del alamcen global del context de las pizzas, usando el metodo find, y guardamos esa pizza en la variable pizzaSeleccionada.
  // const pizzaSeleccionada = pizzas.find((p) => p.id === id);

  // Si no se encuentra la pizza, mostramos un mensaje de carga o error.

  if (!pizza) {
    return (
      <div>
        <h2>Cargando la pizza... 🍕⏳ </h2>
      </div>
    );
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-sm" style={{ width: "25rem" }}>
        <img
          src={pizza.img}
          className="card-img-top"
          alt={pizza.name}
          style={{ height: "250px", objectFit: "cover" }}
          // Agregamos un manejador de errores si la api no carga la imagen y usamos una imagen local de respaldo
          onError={(e) => {
            e.currentTarget.onerror = null; // Apagamos el error para evitar un bucle infinito si la imagen de respaldo también falla
            e.currentTarget.src = `/public/img/${pizza.id}.jpg`; // Ruta de la imagen de respaldo local
          }}
        />

        <div className="card-body">
          <h3 className="card-title text-capitalize fw-bold pb-2 border-bottom">
            {pizza.name}
          </h3>
          <p className="card-text text-muted">{pizza.desc}</p>

          <h5 className="fw-bold mt-4">Ingredientes:</h5>
          <ul className="list-unstyled">
            {pizza.ingredients?.map((ingrediente, index) => (
              <li key={index} className="text-capitalize">
                🍕 {ingrediente}
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className=" fw-bold text-dark mb-0">Precio: ${pizza.price}</h4>
            <button className="btn btn-dark">Añadir 🛒</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pizza;
