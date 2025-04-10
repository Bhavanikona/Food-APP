/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "../Cart/Cart.css";
import { storeContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, food_list, removeCart, getTotalamount,url } = useContext(storeContext);
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div>
                <div
                  key={item._id}
                  className="cart-items-title cart-items-item"
                >
                  <p>
                    <img
                      src={url+"/images/"+item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />
                  </p>
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <p onClick={() => removeCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr></hr>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalamount()}</p>
            </div>
            <hr></hr>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalamount()===0?0:2}</p>
            </div>
            <hr></hr>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalamount()===0?0:getTotalamount()+2}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            Proceed to Check Out
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p> If you have Promo code, Enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


