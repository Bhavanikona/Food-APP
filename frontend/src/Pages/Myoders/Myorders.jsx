import React, {  useContext, useEffect, useState } from "react";
import '../Myoders/Myorders.css';
import { storeContext } from "../../Context/StoreContext";
import axios from "axios";
import {assets} from '../../assets/assets.js'

const Myorders = () => {
  const { url, token } = useContext(storeContext);
  const [data, setData] = useState([]);
  const fetchOrders = async () => {
    const response = await axios.post(
      url +"/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="myorders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
            return(
                <div key={index} className="myorders-order">
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item,index)=>{
                        if(index === order.items.length-1){
                            return item.name +"X"+item.quantity
                        }else{
                            return item.name +"X"+item.quantity+","
                        }
                        
                    })}
                    </p>
                    <p>${order.amount}.00</p>
                    <p>Items:{order.items.length}</p>
                    <p><span>&#x25cf;</span>{order.status}</p>
                    <button onClick={fetchOrders}>Track Order</button>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default Myorders;
