import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../header/Header";
import CardPizza from "../card/CardPizza";
// import { pizzas } from "../../pizzas";
import { useState, useEffect } from "react";

const Home = () => {
  // 1. Creamos un estado pizzas para almacenar los datos traídos desde la API, y la función setPizzas para actualizar ese estado.
  const [pizzas, setPizzas] = useState([]);

  // 2. Creamos una función obtenerPizzas que se encargará de hacer la petición a la API para obtener los datos de las pizzas.
  const obtenerPizzas = async () => {
    const respuesta = await fetch("http://localhost:5000/api/pizzas");
    const datos = await respuesta.json();
    setPizzas(datos); // 3. Actualizamos el estado pizzas con los datos obtenidos de la API usando la función setPizzas.
  };

  // 4. Usamos el hook useEffect para llamar a la función obtenerPizzas al momento de montar el componente, para que los datos se carguen automáticamente cuando se renderice el componente Home.
  useEffect(() => {
    obtenerPizzas();
  }, []);

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
