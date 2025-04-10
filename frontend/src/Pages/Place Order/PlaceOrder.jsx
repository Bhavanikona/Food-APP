/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "../Place Order/PlaceOrder.css";
import { storeContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalamount, token, food_list, cartItem, url } =
    useContext(storeContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();

  const placeOrder = async (event) => {
    event.preventDefault();

    // Build order items array without mixing in any JSX code
    const orderItems = food_list.reduce((acc, item) => {
      const quantity = cartItem[item._id];
      if (quantity > 0) {
        acc.push({ ...item, quantity });
      }
      return acc;
    }, []);

    if (orderItems.length === 0) {
      console.error("No items in cart.");
      return;
    }

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalamount() + 2, // include delivery fee
      userId: localStorage.getItem("userId"), 
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });
      console.log("Stripe session URL:", response.data.session_url);

      if (response.data.success && response.data.session_url) {
        window.location.replace(response.data.session_url);
      } else {
        console.error("Order placement failed:", response.data.message);
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  useEffect(() => {
    // If the user isn't logged in or cart is empty, redirect to cart
    if (!token || getTotalamount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="placeorder">
      <div className="placeorder-left">
        <p className="title">Delivery Information</p>
        <div className="multiple-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multiple-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multiple-fields">
          <input
            required
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            placeholder="Pin Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="placeorder-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalamount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalamount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalamount() === 0 ? 0 : getTotalamount() + 2}</b>
            </div>
          </div>
          <button type="submit">Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
