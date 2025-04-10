
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import '../Orders/Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js';

const Order = ({ url }) => {
  const [Orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error?.response?.data || error.message);
      toast.error("Error fetching orders. Please try again.");
    }
  };
  
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error("Error updating status:", error?.response?.data || error.message);
      toast.error("Error updating order status. Please try again.");
    }
  };
  
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {Orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) => {
                  const itemText = `${item.name} x ${item.quantity}`;
                  return idx === order.items.length - 1 ? itemText : `${itemText}, `;
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipCode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
