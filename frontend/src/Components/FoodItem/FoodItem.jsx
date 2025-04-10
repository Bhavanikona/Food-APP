/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import "../FoodItem/Fooditem.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItem,addToCart,removeCart,url}=useContext(storeContext);
  return (
    <div className="fooditem">
      <div className="fooditem-img-container">
        <img className="fooditem-img" src={url+"/images/"+image} alt={name} />
        {/* <img className="fooditem-img" src={`${url}/images/${image}`} alt={name} /> */}

        {!cartItem[id] ? (
          <img
            className="add"
            onClick={()=>addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="itemcount">
            <img
              onClick={() => removeCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p className="mb-1">{cartItem[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}

      </div>
      <div className="fooditem-info">
        <div className="fooditem-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
         <p className="fooditem-description">{description}</p>
        <p className="fooditem-price">${price}</p>
      </div>
     
    </div>
  );
};

export default FoodItem;
