import React from 'react'
import './Orders.css'
import { useEffect } from 'react'
import { useState } from 'react'

const Orders = () => {
    const [orders,setOrders] = useState([])

    const fetchAllorders = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/order/list');
            const data = await response.json()

            setOrders(data.data)
            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const statusHandler = async (event,orderId) =>{
        try {
            const response = await fetch('http://localhost:4000/api/order/status', {
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({ orderId, status: event.target.value})
            });
            //const data = await response.json()
            if(response.ok){
                await fetchAllorders()
            }
            setOrders(data.data)
            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        fetchAllorders();
    },[])
  return (
    <div className='orderpage'>
     <h3>Order List</h3>
     <div className='order-list'>
        {
            orders.map((order,index)=> {
                return(
                <div key={index} className='order-item'>
                    <div>
                        <p className='order-item-food'>
                            {
                                order.items.map((item,index)=>{
                                    if(index === order.items.length - 1){
                                        return item.name+" x " + item.quantity
                                    }else{
                                        return item.name+ " x " + item.quantity+ ", "
                                    }
                                })
                            }
                        </p>
                    <p>Items : {order.items.length}</p>
                    <p>{order.amount} /-</p>
                        <p className='order-item-name'>{order.address.firstName+ " " +order.address.lastName}</p>
                        <div className='order-item-address'>
                            <p>{order.address.street+","}</p>
                            <p>{order.address.city+", "+order.address.state+", "+order.address.country+", " +order.address.pin}</p>
                        </div>
                        <p className='order-item-phone'>{order.address.phone}</p>
                    </div>
                    <select onChange={(event)=>statusHandler(event, order._id)} value={order.status}>
                        <option value="Processing">Processing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
                )
            })
        }
     </div>
    </div>
  )
}

export default Orders
