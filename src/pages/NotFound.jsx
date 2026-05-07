import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>404</h1>
      <p>La pagina que buscas no existe o fue movida.</p>

      {/* El enlace obligatorio que se pide el requerimiento 4 */}
      <Link to="/" className="btn btn-dark mt-4">
        Volver al Inicio 🍕
      </Link>
    </div>
  );
};
export default NotFound;
