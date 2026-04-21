import React, { useState } from "react";
import { pizzaCart } from "../pizzas";
import Button from "react-bootstrap/Button";

const Cart = () => {
  // 1. funcion para agregar al carrito usando el arreglo pizzaCart
  const [cart, setCart] = useState(pizzaCart);

  // 2. funcion para calcular el total del carrito
  const total = cart.reduce(
    (acumulador, pizza) => acumulador + pizza.price * pizza.count,
    0,
  );

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
              />
              <h6 className="mb-0 fw-bold text-capitalize">{pizza.name}</h6>
            </div>
            {/* 15. En la seccion derecha mostramos el precio y los controles de
            cantidad, usando la varible pizza.count */}
            <div className="d-flex align-items-center">
              <h6 className="mb-0 fw-bold me-4">
                ${pizza.price * pizza.count}
              </h6>
              {/* 16. Aca agregamos los botones de cantidad, usando las funciones
              aumentarCantidad y disminuirCantidad, pasando el id de la pizza
              por parametro. */}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => aumentarCantidad(pizza.id)}
              >
                +
              </Button>
              <strong className="mx-3">{pizza.count}</strong>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => disminuirCantidad(pizza.id)}
              >
                -
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* 4. Aca mostramos el total del carrito usando la variable total */}
      <h3 className="mb-4">Total: ${total}</h3>
      {/* 5. Aca agregamos un boton para finalizar la compra, que por ahora solo
      muestra un mensaje de alerta al hacer click. */}
      <Button className="mb-4" variant="dark">
        Pagar 💳
      </Button>
    </div>
  );
};

export default Cart;
