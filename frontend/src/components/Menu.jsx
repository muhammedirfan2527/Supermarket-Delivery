import React, { useState } from 'react'
import './Menu.css'
import Dairyproduct from '../assets/Dairy product.jpeg'
import Bakery from '../assets/Bakery.jpeg'
import Beverages from '../assets/Beverages.jpeg'
import Breakfastcereals from '../assets/Breakfast cereals.jpeg'
import Meat from '../assets/Meat.jpeg'
import Produce from '../assets/Produce.jpeg'
import Seafood from '../assets/Seafood.jpeg'
import Snacks from '../assets/Snacks.jpeg'

const Menu = ({category,setCategory}) => {
    const [menu,setMenu] = useState([
        {
            manu_name:"Dairy product",
            manu_image: Dairyproduct
        },
        {
            manu_name:"Bakery",
            manu_image: Bakery
        },
        {
            manu_name:"Beverages",
            manu_image: Beverages
        },
        {
            manu_name:"Breakfast cereals",
            manu_image: Breakfastcereals
        },
        {
            manu_name:"Meat",
            manu_image: Meat
        },
        {
            manu_name:"Produce",
            manu_image: Produce
        },
        {
            manu_name:"Seafood",
            manu_image: Seafood
        },
        {
            manu_name:"Snacks",
            manu_image: Snacks
        },
    ])
    // const [category,setCategory] = useState("All")
  return (
    <div className='menu'>
      {
        menu.map((item)=>{
            return (
                <div onClick={()=>setCategory(prev=> prev === item.manu_name?"All": item.manu_name)} className='div_menu'>
                    <img src={item.manu_image} alt="" className={category === item.manu_name?"active_img":""}/>
                    <p className={category === item.manu_name?"active":""}>{item.manu_name}</p>
                </div>
            )
        })
      }
    </div>
  )
}

export default Menu
