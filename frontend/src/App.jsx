import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import Home from "./Pages/Home/Home.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import PlaceOrder from "./Pages/Place Order/PlaceOrder.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import LoginPopup from "./Components/Login-popup/LoginPopup.jsx";
import Verify from "./Pages/Verify/Verify.jsx";
import Myorders from "./Pages/Myoders/Myorders.jsx";

const App = () => {
  const [login,setLogin]=useState(false);
  return (
    <>
    {
      login?<LoginPopup setLogin={setLogin}/>:<></>
    }
      <div className="app">
        <Navbar setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />}/>
          <Route path="/myorders" element={<Myorders />}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
