import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Importamos el CartProvider para envolver toda la app y que el carrito esté disponible en cualquier componente
import { CartProvider } from "./context/CartContext.jsx";

// Importamos el PizzaProvider para envolver toda la app y que las pizzas estén disponibles en cualquier componente
import { PizzaProvider } from "./context/PizzaContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/*Envolvemos la app con el CartProvider y pizzaProvider. Esto hace que el carrito esté disponible en toda la aplicación.*/}
      <PizzaProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </PizzaProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
