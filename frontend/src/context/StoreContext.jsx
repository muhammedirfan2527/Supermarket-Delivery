import { createContext, useEffect, useState } from "react";
import { product_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [allproduct,setAllproduct] = useState([])
  const [cartItems, setCartItems] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [count,setCount] = useState(0)
  const [favorite,setFavorite] = useState({})
  const [token,setToken] = useState("")
  const [username,setUsername] = useState("")
  const fetchInfo = async ()=>{
    try{
      const response = await fetch('http://localhost:4000/api/workout/')
      if(response.ok){
             const data = await response.json()
           setAllproduct(data)
           setFilteredData(data)
      }else{
        console.log("Failed to fetch data")
      }
    }catch(error){
      console.log({error:error.message})
    }
  }
  useEffect(()=>{
    fetchInfo();
  },[]);

  const loadCartData = async (token) => {
    try{
    const response = await fetch("http://localhost:4000/api/cart/get", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
    },
  })
  if(!response.ok){
    console.error("Error fetching cart:", response.statusText);
      return;
  }
  const data = await response.json()
  setCartItems(data.cartData)
  
  } catch (error){
    console.error("Failed to load cart data:", error);
  }
}

const loadFavouriteData = async (token) =>{
  try {
    const response = await fetch('http://localhost:4000/api/favourite/get',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'token': token
      }
    })
    if(!response.ok){
      console.error("Error fetching cart:", response.statusText);
        return;
    }
    const data = await response.json()
    setFavorite(data.favouriteData)
  } catch (error) {
    
  }
}

  useEffect(()=>{
    async function loadData() {
      await fetchInfo()
      const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      await loadCartData(storedToken);
      await loadFavouriteData(storedToken)
    }
    }
    loadData()
  },[])

  const AddToCart = async (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
    if(token){
      try{
        const response = await fetch("http://localhost:4000/api/cart/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token
        },
          body: JSON.stringify({itemId:id})
        })
      } catch (error){
        console.log(error)
      } 
    }
  };

  const RemoveFromCart = async (id) => {
    if(cartItems[id] > 0){
                     setCartItems((prv)=> ({...prv,[id]:prv[id]-1}))
                 }
                 if(token){
                  try{
                    const response = await fetch("http://localhost:4000/api/cart/remove", {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    },
                      body: JSON.stringify({itemId:id})
                    })
                  } catch (error){
                    console.log(error)
                  } 
                }
                  
  };

  const TotalAmount = () =>{
    let amount = 0
    for(const item in cartItems){
      if(cartItems[item] > 0){
        const getitem = allproduct.find((id)=> id._id===item)
        amount += getitem.price * cartItems[item]
      }
    }
    return amount;
  }
  const ItemCount = ()=>{
    let count = 0
    for(const item in cartItems){
      if(cartItems[item]>0){
        count++
      }
    }
    return count
  }
  const searchFunction = (query) => {
    console.log("Search Query:", query);
      const filtered = allproduct.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
  };

  const ClearObject = ()=>{
    setCartItems({})
  }


  const WishList = async (id) => {
    if (!token) return; // Ensure token exists

    try {
        const response = await fetch("http://localhost:4000/api/favourite/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ itemId: id })
        });

        if (!response.ok) {
            throw new Error("Failed to update wishlist");
        }

        const data = await response.json(); // Handle response properly
        console.log(data)

        // Update state only if the request succeeds
        setFavorite((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));

    } catch (error) {
        console.error("Wishlist update failed:", error);
    }
};


  const WhisListCount = () =>{
    let wcount =0;
    for(const whislist in favorite){
      if(favorite[whislist]){
        wcount++
      }
    }
    return wcount
  }

  const logoutHandler = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setToken("")
    setUsername("")
    window.location.replace("/")
  }

  const contextValue = {
    allproduct:filteredData,
    cartItems,
    AddToCart,
    RemoveFromCart,
    searchFunction,
    TotalAmount,
    ItemCount,
    ClearObject,
    favorite,
    WishList,
    WhisListCount,
    token,
    setToken,
    username,
    setUsername,
    logoutHandler,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
