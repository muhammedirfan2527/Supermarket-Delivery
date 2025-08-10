import React, { useContext, useEffect, useState } from 'react'
import './Myorder.css'
import { StoreContext } from '../context/StoreContext'

const Myorder = () => {

    const {token} = useContext(StoreContext)
    const [data,setData] = useState([])

    const fetchorder = async () =>{
        const response = await fetch("http://localhost:4000/api/order/userorder", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': token
          },
    })
    const result = await response.json()

    const ordersData = Array.isArray(result) 
    console.log(result.data)
    setData(result.data)
    console.log(ordersData)
    }
    console.log(data)

    useEffect(()=> {
        if(token){
            fetchorder()
        }
    },[token])
  return (
    <div className='myorder'>
        <h2>My orders</h2>
        <div className='container'>
            {
                data.map((order,index)=>{
                    return(
                        <div key={index} className='myorderorder'>
                            <p>{order.items.map((item,index)=>{
                                if(index === order.items.length - 1){
                                    console.log(order.items.length)
                                    return item.name+ " x " +item.quantity
                                }else{
                                    return item.name+" x " +item.quantity+', '
                                }
                            })}</p>
                            <p>{order.amount} /-</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            {/* <button onClick={fetchorder}>Track Order</button> */}
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Myorder
