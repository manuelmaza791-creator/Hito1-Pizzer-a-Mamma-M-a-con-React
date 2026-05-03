import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Navegacion from "./components/navbar/Navegacion";
// import Register from "./components/register/Register";
// import Login from "./components/login/Login";
// import Cart from "./components/Cart";
// import Pizza from "./components/Pizza";

function App() {
  return (
    <>
      <Navegacion />
      <Home />
      {/*<Register />*/}
      {/*<Login />*/}
      {/*<Cart />*/}
      {/*<Pizza />*/}
      <Footer />
    </>
  );
}

export default App;
