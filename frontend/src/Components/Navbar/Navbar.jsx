import React, { useContext, useState } from "react";
import "../Navbar/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { storeContext } from "../../Context/StoreContext";

const Navbar = ({ setLogin }) => {
  const [menu, setmenu] = useState("Menu");
  const {getTotalamount,token,setToken} =useContext(storeContext);
  const navigate=useNavigate()
  const logOut=()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
  }
  return (
    <div className="navbar">
     <Link to="/" className="head"><h2>Foodie</h2></Link>
      <ul className="navbarmenu">
        <Link
          to="/"
          onClick={() => setmenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#exploremenu"
          onClick={() => setmenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setmenu("Mobile-App")}
          className={menu === "Mobile-App" ? "active" : ""}
        >
          Mobile-App
        </a>
        <a
          href="#footer"
          onClick={() => setmenu("Contact Us")}
          className={menu === "Contact Us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <div>
          <span className="bi bi-search"></span>
        </div>
        <div className="navbarsearchicon">
         <Link to="/cart">
         <span className="bi bi-cart">
            <span className={getTotalamount()===0 ?"":"dot"}></span>
          </span></Link>
        </div>
        {!token?<div className="Signin">
          <button onClick={() => setLogin(true)}>Sign In</button>
        </div>:<div className="navbar-profile">
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr></hr>
            <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
          </ul>
          </div>}
        
      </div>
    </div>
  );
};

export default Navbar;
