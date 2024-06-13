import "./App.css";
import AllProducts from "./components/products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Singleproduct from "./components/Singleproduct";
import Login from "./components/Login";
import User from "./components/Account";
import Cart from "./components/Carts";
import Navigate from "./components/navigations";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigate />
        <Routes>
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<Singleproduct />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/carts/users/:id" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
