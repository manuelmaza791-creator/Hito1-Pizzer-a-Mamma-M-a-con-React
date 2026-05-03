import Card from "react-bootstrap/Card";
import BotonCard from "../botonCard/BotonCard";

const CardPizza = ({
  id,
  img,
  nombre,
  descripcion,
  ingredientes,
  precio,
  colorButton,
  textButton,
  colorButton2,
  textButton2,
}) => {
  return (
    <div className="card shadow-sm h-100">
      {/* 2. Reemplazamos la URL estática por la variable img */}
      <img
        src={img}
        className="card-img-top"
        alt={`Pizza ${nombre}`}
        style={{ height: "280px", objectFit: "cover" }}
        // 5. Agregamos un manejador de errores si la url de la api falla, para mostrar una imagen de respaldo en la carpeta local
        onError={(e) => {
          e.currentTarget.onerror = null; // Apagamos el error para evitar un bucle infinito si la imagen de respaldo también falla
          e.currentTarget.src = `/public/img/${id}.jpg`; // Ruta de la imagen de respaldo local
        }}
      />

      <div className="card-body d-flex flex-column flex-grow-1">
        {/* 3. Reemplazamos el título estático por la variable nombre */}
        <h5 className="card-title text-capitalize fw-bold pb-2 border-bottom">
          {nombre}
        </h5>
        {/* 4. Mostramos la descripción */}
        <p
          className="card-text text-muted text-center"
          style={{ fontSize: "0.9rem" }}
        >
          {descripcion}
        </p>
        <p className="card-text text-center">Ingredientes:</p>
        <ul className="text-center list-unstyled">
          {ingredientes.map((ingredientes, index) => (
            <li key={index}>🍕 {ingredientes}</li>
          ))}
        </ul>

        <hr />
        <p className="h4 text-center fw-bold py-3 mb-2">
          Precio: ${precio}
          {/* Precio: ${price.toLocaleString()*/}
        </p>

        <hr />
        <div className="d-flex justify-content-between mt-auto px-5 mb-1">
          <BotonCard colorButton="outline-dark" textButton="ver más 👀" />
          <BotonCard colorButton="dark" textButton="Añadir 🛒" />
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
