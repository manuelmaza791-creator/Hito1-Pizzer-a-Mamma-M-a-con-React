import { useState, useEffect } from "react";

const Pizza = () => {
  // 3 pizza guardará los valores traídos desde la API
  const [pizza, setPizza] = useState({});

  // 2 Llamamos a la función consultarApi de pizza, al momento de montar el componente
  useEffect(() => {
    consultarApi();
  }, []);

  // 1 Creamos una funcion que consulte  la api de pizzas
  const consultarApi = async () => {
    const url = "http://localhost:5000/api/pizzas/p001";
    const response = await fetch(url);
    const dataPizza = await response.json();
    setPizza(dataPizza); // con setPizza se actualiza el estado
  };

  console.log("Datos de la pizza actual:", pizza);
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
