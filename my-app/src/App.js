import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";

import Store from "./store/Store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Cart from "./screens/Cart.js";
import Nav from "./components/Nav.js";
import Orders from "./screens/Orders.js";
export default function App() {
  return (
    <Store>
      <Router>
        <Nav />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />}></Route>
          </Routes>
        </div>
      </Router>
    </Store>
  );
}
