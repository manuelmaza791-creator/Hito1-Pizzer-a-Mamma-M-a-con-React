import React from "react";

function Boton({ texto, claseColor, icono }) {
  return (
    <button
      className={`btn ${claseColor} btn-sm m-1 d-flex align-items-center gap-2`}
    >
      <span>{icono}</span>
      <span>{texto}</span>
    </button>
  );
}

export default Boton;
