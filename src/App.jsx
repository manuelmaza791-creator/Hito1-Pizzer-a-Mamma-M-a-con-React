import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Navegacion from "./components/navbar/Navegacion";

function App() {
  return (
    <>
      <Navegacion />
      <Home />
      <Footer />
    </>
  );
}

export default App;
