import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header/Header";
import CardPizza from "../components/card/CardPizza";
// import { pizzas } from "../../pizzas";
import { useState, useEffect } from "react";

// Importamos useContext y nuextro nuevo PizzaContext para poder acceder a las pizzas desde el context y no tener que hacer el fetch en este componente, manteniendo asi el codigo mas limpio y organizado.
import { useContext } from "react";
import { PizzaContext } from "../context/PizzaContext";

const Home = () => {
  // 1. Creamos un estado pizzas para almacenar los datos traídos desde la API, y la función setPizzas para actualizar ese estado.
  // const [pizzas, setPizzas] = useState([]);

  // 2. Creamos una función obtenerPizzas que se encargará de hacer la petición a la API para obtener los datos de las pizzas.
  // const obtenerPizzas = async () => {
  //   const respuesta = await fetch("http://localhost:5000/api/pizzas");
  //   const datos = await respuesta.json();
  //   setPizzas(datos); // 3. Actualizamos el estado pizzas con los datos obtenidos de la API usando la función setPizzas.
  // };

  // 4. Usamos el hook useEffect para llamar a la función obtenerPizzas al momento de montar el componente, para que los datos se carguen automáticamente cuando se renderice el componente Home.
  // useEffect(() => {
  //  obtenerPizzas();
  // }, []);

  // Borramos el use state de pizzas  y el useEffect que hacian el fetch porque ahora esa logica esta centralizada en el context de las pizzas, y solo tenemos que usar el useContext para acceder a las pizzas desde el context, manteniendo asi el codigo mas limpio y organizado.
  // En su Lugar extaremos las pizzas del almacen global del context usando el hook useContext, para poder mostrar las pizzas en el home sin tener que hacer el fetch en este componente.

  const { pizzas } = useContext(PizzaContext);

  return (
    <div>
      <Header />
      <div className="container mt-5 px-4 justify-content-center ">
        <div className="row">
          {pizzas.map(
            (pizza) => (
              console.log("http://localhost:5000/api/pizzas", pizza.img),
              (
                <div
                  className="col-12 col-md-4 mb-4 d-flex justify-content-center"
                  key={pizza.id}
                >
                  <CardPizza
                    className="mx-2 mb-4 h-100"
                    id={pizza.id}
                    nombre={pizza.name}
                    precio={pizza.price}
                    descripcion={pizza.desc}
                    ingredientes={pizza.ingredients}
                    img={pizza.img}
                  />
                </div>
              )
            ),
          )}
        </div>

        {/*
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <CardPizza
            className="mx-2 mb-4 h-100"
            image="https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_com.jpg?alt=media&token=e7cde87a-08d5-4040-ac54-90f6c31eb3e3"
            title="Pizza Pepperoni"
            ingredientes={["mozzarella", "pepperoni", "orégano"]}
            price={7950}
            colorButton="outline-dark"
            textButton="ver más 👀"
            colorButton2="dark"
            textButton2="Añadir 🛒"
          />
        </div>
        */}
      </div>
    </div>
  );
};

export default Home;
