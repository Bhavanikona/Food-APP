import React from "react";
import "../ExploreMenu/Exploremenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className="exploremenu" id="exploremenu">
      <h1>Explore Our Menu</h1>
      <p className="exploremenu-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis fuga
        blanditiis eos, doloremque ex nemo sed. Ab neque facilis laboriosam ex,
        laborum optio odio similique quisquam eum illum voluptate fugit.
      </p>
      <div className="exploremenu-list">
        {menu_list.map((item,index)=>{
          return(
            <div  onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="exploremenu-item">
              <img className={category===item.menu_name?"active":" "} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr></hr>
    </div>
  );
};

export default ExploreMenu;
