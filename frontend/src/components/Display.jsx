import React, { useContext, useEffect, useState } from "react";
import "./Display.css";
import { StoreContext } from "../context/StoreContext";
import heartnocolor from '../assets/nocolorheart.jpg'
import heartred from '../assets/redheart.jpg'
import {MdShoppingCart} from "react-icons/md"

const Display = ({ category }) => {
  const { allproduct, cartItems, AddToCart, RemoveFromCart, favorite, WishList, token, ItemCount } = useContext(StoreContext);
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(()=>{
    const handleScroll = () =>{
      if(window.scrollY > 100){
        setIsScrolled(true)
      }else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })

  return (
    <div className="display">
      {allproduct.map((item) => {
        if (category === "All" || category === item.category) {
          return (
            <div key={item._id} className="item_display">
              <div className="image_container">
                <img
                  src={`http://localhost:4000/uploads/${item.image}`}
                  alt={item.name}
                  className="product_img"
                />
                <button 
                  onClick={() => { token ? WishList(item._id) : window.location.replace("/login") }} 
                  className="heart"
                >
                  <img 
                    src={favorite[item._id] ? heartred : heartnocolor} 
                    alt="wishlist icon"
                    className={favorite[item._id] ? "heart_active" : ""}
                  />
                </button>
              </div>
              <p className="product_name">{item.name}</p>
              <p className="product_weight">{item.weight} {item.measurement}</p>
              <p className="product_price">₹{item.price}</p>
              <div className="display_button">
                <button 
                  onClick={() => { token ? RemoveFromCart(item._id) : window.location.replace("/login") }} 
                  className="btn btn_decrease nav"
                >
                  -
                </button>
                <p className="qty_display">{cartItems[item._id] ? cartItems[item._id] : "0"}</p>
                <button 
                  onClick={() => { token ? AddToCart(item._id) : window.location.replace("/login") }} 
                  className="btn btn_increase pos"
                >
                  +
                </button>
              </div>
              
            </div>
          );
        }
      })}
      <button
                className={`floating_cart ${isScrolled? "show_cart":""}`}
                onClick={()=> window.location.replace("/cart")}
              >
                <MdShoppingCart size={24}/>
                {ItemCount() > 0 && <span className="cart_count">{ItemCount()}</span>}
              </button>
    </div>
  );
};

export default Display;
