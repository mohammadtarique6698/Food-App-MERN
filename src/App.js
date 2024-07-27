import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./mainscreen/Home";
import Login from "./mainscreen/Login";
import Signup from "./mainscreen/Signup.jsx";
import Cart from "./mainscreen/Cart.jsx";
import Order from "./mainscreen/Order.jsx";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import { CartProvider } from "./components/Reducer.jsx";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/createUser" element={<Signup />}></Route>
          <Route exact path="/mycart" element={<Cart />}></Route>
          <Route exact path="/myOrders" element={<Order />}></Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
