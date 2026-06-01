import React, { useState } from "react";
import { pizzaCart } from "../pizzas";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const Cart = () => {
  // 1. cambiamos la funcion para agregar al carrito usando el arreglo pizzaCart: (  const [cart, setCart] = useState(pizzaCart)  ); se cambiaria por nuestro almacen global creado en CartContext y se agrega el total ya calculado en el CartContext.
  const { cart, increaseQuantity, decreaseQuantity, total } =
    useContext(CartContext); // Extraemos el carrito y las funciones de nuestro almacen global usando el hook useContext, para poder mostrar el carrito y modificarlo desde este componente Cart, que es el encargado de mostrar el detalle del pedido.

  const { token } = useContext(UserContext); // Extraemos el token de nuestro almacen global usando el hook useContext, para poder mostrar el carrito solo si el usuario está logueado, y si no lo está, mostrar un mensaje indicando que debe iniciar sesión para ver el carrito.

  // 2. funcion para calcular el total del carrito (igual que en el navbar) usando el metodo reduce, multiplicando el precio de cada pizza por su cantidad (count) y sumando al acumulador.
  // const total = cart.reduce((acumulador, pizza) => acumulador + pizza.price * pizza.count,0,);  ---> Ahora el total se calcula una sola vez de forma global en el CartContext.

  // 6. Funcion para aumentar la cantidad, buscando la pizza por su id
  const aumentarCantidad = (id) => {
    // 7. Aca usamos el metodo map para crear un nuevo arreglo de pizzas, donde si la pizza tiene el mismo id que el que se paso por parametro, se aumenta su cantidad en 1, sino se deja igual.
    const nuevoCart = cart.map((pizza) =>
      pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza,
    );

    // 8. Aca se actualiza el estado del carrito con el nuevo arreglo de pizzas usando la funcion setCart.
    setCart(nuevoCart);
  };

  // 9. Funcion para disminuir la cantidad, buncando la pizza por su id
  const disminuirCantidad = (id) => {
    // 10. Aca usamos el metodo map para crear un nuevo arreglo de pizzas ({ ...pizza, -----} ), donde si la pizza tiene el mismo id que el que se paso por parametro, se disminuye su cantidad en 1, sino se deja igual.
    const nuevoCart = cart.map((pizza) =>
      pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza,
    );

    // 11. Aca se actualiza el estado del carrito con el nuevo arreglo de pizzas que sera almacenado en la variable nuevoCart usando la funcion setCart.
    setCart(nuevoCart);

    // 12. Usando el metodo filter: Si al restar el count llega a 0, se elimina la pizza del carrito, dejando solo las pizzas con count mayor a 0.
    const cartFiltrado = nuevoCart.filter((pizza) => pizza.count > 0);
    setCart(cartFiltrado);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">detalles del pedido:</h2>
      {/* 3. Aca renderizamos el carrito usando el arreglo pizzaCart, mostrando
      nombre, cantidad, precio y otros.*/}
      <div className="list-group mb-4">
        {/* 13. Ahora volvemos al .map para completar dentro del return y mostrar
        cada pizza del carrito con su imagen, nombre, cantidad, precio y los
        controles para aumentar o disminuir la cantidad. */}
        {cart.map((pizza) => (
          <div
            key={pizza.id}
            className="list-group-item d-flex justify-content-between align-items-center border-0  border-bottom py-3"
          >
            {/* 14. En la seccion izquierda mostramos la imagen y el nombre
            usando la variable pizza.name y pizza.img */}
            <div className="d-flex align-items-center">
              <img
                src={pizza.img}
                alt={pizza.name}
                style={{
                  width: "50px",
                  borderRadius: "5px",
                  marginRight: "15px",
                }}
                onError={(e) => {
                  e.currentTarget.onError = null;
                  e.currentTarget.src = `/public/img/${pizza.id}.jpg`;
                }}
              />
              <h6 className="mb-0 fw-bold text-capitalize">{pizza.name}</h6>
            </div>
            {/* 15. En la seccion derecha mostramos el precio y los controles de
            cantidad, usando la varible pizza.count */}
            <div className="d-flex align-items-center">
              <h6 className="mb-0 fw-bold me-4">
                ${(pizza.price * pizza.count).toLocaleString()}
              </h6>
              {/* 16. Aca agregamos los botones de cantidad, usando las funciones
              aumentarCantidad y disminuirCantidad, pasando el id de la pizza
              por parametro. */}
              <button
                variant="outline-primary"
                size="sm"
                onClick={() => decreaseQuantity(pizza.id)}
              >
                -
              </button>
              <span className="mx-3">{pizza.count}</span>
              <button
                variant="outline-danger"
                size="sm"
                onClick={() => increaseQuantity(pizza.id)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* 4. Aca mostramos el total del carrito usando la variable total */}
      <h3 className="mb-4">Total: ${total.toLocaleString()}</h3>
      {/* 5. Aca agregamos un boton para finalizar la compra, que por ahora solo
      muestra un mensaje de alerta al hacer click. */}
      <button className="mb-4" variant="dark" disabled={!token}>
        Pagar 💳
      </button>
    </div>
  );
};

export default Cart;
