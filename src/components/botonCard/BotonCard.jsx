import Button from "react-bootstrap/Button";

const BotonCard = ({ colorButton, textButton, colorButton2, textButton2 }) => {
  return (
    <div className="BotonCard">
      <Button size="sm" variant={colorButton}>
        {textButton}
      </Button>
      <Button size="sm" variant={colorButton2}>
        {textButton2}
      </Button>
    </div>
  );
};
export default BotonCard;
