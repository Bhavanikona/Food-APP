import React, {  useContext, useState } from "react";
import "../Login-popup/LoginPopup.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../Context/StoreContext";
import axios from 'axios';

const LoginPopup = ({ setLogin }) => {
  const {url,setToken}=useContext(storeContext)
  const [currenstate, setCurrentState] = useState("sign up");
  const[data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandler=(event)=>{
    const name =event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = currenstate === "login" ? `${url}/api/user/login` : `${url}/api/user/register`;
  
    try {
      const response = await axios.post(newUrl, data);
      console.log("Server Response:", response.data);
  
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token)
        setLogin(false)
      }
      
    } catch (err) {
      console.error("Login/Register error:", err);
      alert(err.response?.data?.message || "An unexpected error occurred.");
    }
  };
    
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currenstate}</h2>
          <img
            onClick={(e) => {
              e.stopPropagation();
              setLogin(false);
            }}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <div className="login-popup-input">
          {currenstate === "login" ? (
            <>
              <input  name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required />
              <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Your Password" required />
            </>
          ) : (
            <>
              <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />
              <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required />
              <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Your Password" required />
            </>
          )}
        </div>

        <button type="submit">
          {currenstate === "sign up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required></input>
          <p>By Continuing I agree to the terms & conditions</p>
        </div>
        {currenstate === "login" ? (
          <p>
            Create a new Accoun ?{" "}
            <span onClick={() => setCurrentState("sign up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <span onClick={() => setCurrentState("login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
