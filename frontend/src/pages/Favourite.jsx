import React, { useContext } from 'react'
import './Favourite.css'
import { StoreContext } from '../context/StoreContext'
import heartnocolor from '../assets/nocolorheart.jpg'
import heartred from '../assets/redheart.jpg'

const Favourite = () => {
    const {allproduct,cartItems, AddToCart, RemoveFromCart, favorite, WishList} = useContext(StoreContext)

    // const checkfavorite = () =>{
    //     if()
    // }
    const checkfavorite = Object.values(favorite).filter(Boolean).length;
    //Object.values(favorite).filter(Boolean).length;
    console.log(favorite)
    console.log(checkfavorite)
  return (
    <div className='favourite'>
      <h1 className='wishlist'>Wishlist</h1>
      <div className='favourite-container'>

      {checkfavorite === 0 ?<div className='empty-wishlist'> <h3>Empty Wishlist</h3><p>You have no items in your wishlist. Start adding!</p> </div>:
        allproduct.map((item) => {
          if (favorite[item._id]) {
                return (
                  <div key={item._id} className="item_display">
                    <img
                      src={`http://localhost:4000/uploads/${item.image}`}
                      alt={item.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <button onClick={()=> WishList(item._id)} className="heart"><img src={favorite[item._id] ? heartred  : heartnocolor} alt="" />
                    </button>
                    <p>{item.name}</p>
                    <p className="product_weight">{item.weight} {item.measurement}</p>
                    <p className='fav_price'>{item.price} /-</p>
                    <div className="display_button">
                      <button onClick={() => RemoveFromCart(item._id)} className="nev">-</button>
                          {cartItems[item._id] ? <p>{cartItems[item._id]}</p> : <p>0</p>}
                      <button onClick={() => AddToCart(item._id)} className="pos">+</button>
                      
                    </div>
                    {/* <p>{item.category}</p> */}
                  </div>
                //   }
                );
              }
            })}
           </div>
    </div>
  )
}

export default Favourite