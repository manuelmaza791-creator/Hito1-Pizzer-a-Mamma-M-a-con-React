import Card from "react-bootstrap/Card";
import BotonCard from "../botonCard/BotonCard";

const CardPizza = ({
  image,
  title,
  ingredientes,
  price,
  colorButton,
  textButton,
  colorButton2,
  textButton2,
}) => {
  return (
    <>
      <Card className="mx-2 mb-4">
        <Card.Img variant="top" src={image} />

        <Card.Body>
          <>
            <Card.Title className="fw-bold pb-2 border-bottom">
              {title}
            </Card.Title>
            <div className="text-center py-2 border-bottom">
              <p className="text-muted mb-1 fw-bold"> Ingredientes:</p>
              <p className="fs-6 mb-0">🍕 {ingredientes.join(", ")}</p>
            </div>
            <Card.Text className="text-center py-3 mb-2">
              Precio: ${price.toLocaleString()}
            </Card.Text>
            <BotonCard
              colorButton={colorButton}
              textButton={textButton}
              colorButton2={colorButton2}
              textButton2={textButton2}
            />
          </>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardPizza;
