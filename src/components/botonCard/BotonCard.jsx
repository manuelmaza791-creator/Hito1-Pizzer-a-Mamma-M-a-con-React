import Button from "react-bootstrap/Button";

const BotonCard = ({ colorButton, textButton }) => {
  return (
    <Button size="sm" variant={colorButton}>
      {textButton}
    </Button>
  );
};
export default BotonCard;
