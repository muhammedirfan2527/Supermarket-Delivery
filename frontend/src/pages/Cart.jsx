import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../context/StoreContext";
import {ToastContainer, toast,Bounce} from 'react-toastify'
import { CiCircleRemove } from "react-icons/ci";

const Cart = () => {
  const { allproduct, cartItems, AddToCart, RemoveFromCart, TotalAmount, ItemCount, ClearObject, token } =
    useContext(StoreContext);
  const [tipnumber, setTipnumber] = useState(0);
  const [input,setInput] = useState({})
  const emptycart = Object.values(cartItems).length

  console.log(token)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pin:"",
    country:"",
    phone:""
  })



  const onChangeHandler = (event) =>{
    setData({...data,[event.target.name]:event.target.value})
  } 

  console.log(emptycart)
  // const count = 0;
 
  const notify = () => {
    toast.success('Your order is successful!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
      ClearObject()
     
  };
  // console.log(input)

  const placeOrder = async (event) =>{
    event.preventDefault()
    let orderitems = []
    allproduct.map((item)=>{
      if(cartItems[item._id]>0){
        let iteminfo = item
        iteminfo["quantity"] = cartItems[item._id]
        orderitems.push(iteminfo)
      }
    })
    console.log(orderitems)
    let orderData = {
      address:data,
      items:orderitems,
      amount:TotalAmount()+20 +tipnumber
    }
    console.log(orderData)
    if(!data.firstName.trim()){
      window.alert("This field is required!")
    } else{
    window.alert("Order placed successfully!");
    window.location.replace('/');
    // add order
    try {
      let response = await fetch("http://localhost:4000/api/order/place", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${token}` // Use Bearer if required
              'token': token
          },
          body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
          // const { data } = await response.json(); // Added await
          try {
            // clear cart
            await fetch("http://localhost:4000/api/cart/allremove",{
              method:'POST',
              headers: {
               'Content-Type': 'application/json',
               'token': token
              }
            })
          } catch (error) {
            const errorText = await response.text(); // Better error handling
            alert(`Error: ${errorText}`);
          }
        } else {
          const errorText = await response.text(); // Better error handling
          alert(`Error: ${errorText}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        // alert("Something went wrong!");
      }
    }
      
  }
  return (
    <div className="cart">
      
      <div className="cartheader">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
        <hr />
      </div>
      <div className="cartheader">
        {allproduct.map((item) => {
          if (cartItems[item._id]) {
            return (
              <>
                <img src={`http://localhost:4000/uploads/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{cartItems[item._id] * item.price} </p>
                <button onClick={() => RemoveFromCart(item._id)}><CiCircleRemove/></button>
                {/* {count++} */}
              </>
            );
          }
        })}
      </div>
      <div className="bail-place-order">
          {/* <form onSubmit={placeOrder} className="place-order"> */}
        <div>
            <div className="place-order-left">
              <p className="title">Delivery Information</p>
              <div className="multi-fields">
                <input  type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder="First name" required />
                <input  type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last name" required/>
              </div>
              <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email address"/>
              {/* onChange={(event) => setInput({ ...input, email: event.target.value })} */}
              <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
              <div className="multi-fields">
                <input required type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
                <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" />
              </div>
              <div className="multi-fields">
                <input required type="text" name="pin" onChange={onChangeHandler} value={data.pin} placeholder="pin" />
                <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" />
              </div>
              <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" />
            </div>
        </div>
        <div className="bail">
          <div className="cart-total-details">
            <p>Subtotal : </p>
            <p className="value-bail">{TotalAmount()}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery fee : </p>
            <p className="value-bail">{TotalAmount() === 0 ? 0 : 20}</p>
          </div>
          <div className="cart-total-details">
            <p>Tip for delivery :</p>
            <p className="tipnumber">
              {tipnumber}
              <span>
                {tipnumber === 0 ? (
                  <button className="notip">-</button>
                ) : (
                  <button
                    className="tip"
                    onClick={() => setTipnumber((prve) => prve - 5)}
                    >
                    -
                  </button>
                )}
                <button
                  className="tip"
                  onClick={() => setTipnumber((prve) => prve + 5)}
                  >
                  +
                </button>
              </span>
            </p>
          </div>
          <div className="cart-total-details">
            <p>Total :</p>
            <p className="value-bail">
              {TotalAmount() === 0 ? 0 : TotalAmount() + 20 + tipnumber}
            </p>
          </div>
          {/* <ToastContainer> */}
          {/* <button onClick={() => input.email && input.pin ? notify() : alert("Enter in Delivery Information")}
 className={Object.keys(cartItems).length === 0 ? "aaaa" : "aaa"}>ORDER</button> */}

                {ItemCount() !== 0 ?<button onClick={placeOrder}
 className="aaa">ORDER</button>:<button className="aaaa">ORDER</button>

}
          <ToastContainer />
        </div>
      {/* </form> */}
      </div>
    </div>
  );
};

export default Cart;
