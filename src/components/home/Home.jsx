import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../header/Header";
import CardPizza from "../card/CardPizza";
import { pizzas } from "../../pizzas";

function Home() {
  return (
    <div>
      <Header />
      <div
        class="card-container"
        className="row justify-content-center mt-4 px-4"
      >
        <div className="row">
          {pizzas.map((pizza) => (
            <div
              className="col-12 col-md-4 mb-4 d-flex justify-content-center"
              key={pizza.id}
            >
              <CardPizza
                className="mx-2 mb-4 h-100"
                nombre={pizza.name}
                precio={pizza.price}
                descripcion={pizza.desc}
                ingredientes={pizza.ingredients}
                img={pizza.img}
              />
            </div>
          ))}
        </div>
        {/*}
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <CardPizza
            className="mx-2 mb-4 h-100"
            image="https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab"
            title="Pizza Española"
            ingredientes={[
              "mozzarella",
              "gorgonzola",
              "parmesano",
              "provolone",
            ]}
            price={6950}
            colorButton="outline-dark"
            textButton="ver más 👀"
            colorButton2="dark"
            textButton2="Añadir 🛒"
          />
        </div>
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
}

export default Home;
