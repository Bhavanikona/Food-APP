/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setcartItem] = useState({});
  const url="https://food-app-backend-m3b5.onrender.com";
  const [token,setToken]=useState("");
  const [food_list,setFoodList]=useState([]);

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setcartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url +"/api/cart/add",{itemId},{headers:{token}})
    }
  };


  const removeCart = async (itemId) => {
    setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  const getTotalamount = () => {
    let totalamount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let iteminfo = food_list.find((product) => product._id === item);
        totalamount += iteminfo.price * cartItem[item];
      }
    }
    return totalamount;
  };

  const fetchFoodlist =async ()=>{
    const response =await axios.get(url +"/api/food/list");
    setFoodList(response.data.data)
  }

const loadCartData = async (token)=>{
    const response =await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setcartItem(response.data.cartData)
}

useEffect(() => {
  async function loadData() {
    await fetchFoodlist();
  }
  async function init() {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      await loadCartData(token);
    }
    await loadData();
  }

  init();
}, []);


useEffect(() => {
  const init = async () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    await fetchFoodlist();
  };
  init();
}, []);

useEffect(() => {
  if (token) {
    console.log("Token updated:", token);
    
  }
}, [token]);
  
  const contextValue = {
    food_list,
    cartItem,
    setcartItem,
    addToCart,
    removeCart,
    getTotalamount,
    url,
    token,
    setToken
  };
  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};
export default StoreContextProvider;
