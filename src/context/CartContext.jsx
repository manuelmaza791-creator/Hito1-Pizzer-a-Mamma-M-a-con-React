import { createContext, useState } from "react";

// Creamos el context del carrito (almacen vacío)  donde ira la informacion del carrito y las funciones para modificarlo
export const CartContext = createContext();

// Creamos el provider (el administrador del almacen) que va a envolver a toda la app para que cualquier componente pueda acceder al carrito y modificarlo
export const CartProvider = ({ children }) => {
  // Aqui guardamos las pizzass inicia con un arreglo vacio porque el carrito esta vacio al inicio
  const [cart, setCart] = useState([]); // Estado para almacenar los productos en el carrito

  // Creamos la funcion para agregar al carrito
  const addToCart = (pizza) => {
    // Buscamos si la pizza ya existe en el carrito
    const pizzaIndex = cart.findIndex((item) => item.id === pizza.id);

    if (pizzaIndex >= 0) {
      // Si la pizza ya existe, copiamos el carrito y le sumamos 1 a la cantidad de esa pizza
      const newCart = [...cart];
      newCart[pizzaIndex].count += 1;
      setCart(newCart);
    } else {
      // Si no existe, le agregamos al final del arreglo con la propiedad count en 1 (porque es la primera vez que se agrega)
      setCart([...cart, { ...pizza, count: 1 }]);
    }
  };

  // Funcion para aumentar la cantidad de una pizza en el carrito, buscando la pizza por su id
  const increaseQuantity = (id) => {
    const newCart = cart.map((pizza) =>
      pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza,
    );
    setCart(newCart);
  };

  // Funcion para disminuir la cantidad de una pizza en el carrito, buscando la pizza por su id
  const decreaseQuantity = (id) => {
    const newCart = cart
      .map((pizza) =>
        pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza,
      )
      .filter((pizza) => pizza.count > 0); // Este metodo permite  Si la cantidad llega a 0, se elimina del carrito
    setCart(newCart);
  };

  // Fauncion donde calculamos el total una sola vez de forma global, para no tener que calcularlo en cada componente que lo necesite (como el navbar y el carrito), usando el metodo reduce, multiplicando el precio de cada pizza por su cantidad (count) y sumando al acumulador.
  const total = cart.reduce(
    (acumulador, pizza) => acumulador + pizza.price * pizza.count,
    0,
  );

  return (
    // Todo lo que coloquemos en el value del provider va a ser accesible para cualquier componente que consuma este context en la app.
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
