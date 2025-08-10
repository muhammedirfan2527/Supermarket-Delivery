import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import cart_icon from "../assets/cart_icon.png";
import { Link } from "react-router-dom";
import { StoreContext } from '../context/StoreContext';
import heartnocolor from '../assets/redheart.jpg';
import orderimage from '../assets/order.jpeg';
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const Navbar = () => {
    const { searchFunction, ItemCount, WhisListCount, token, setToken, username, logoutHandler, setUsername } = useContext(StoreContext);
    const [userdata, setUserdata] = useState({});

    // const getUser = async () => {
    //     try {
    //         const response = await fetch("http://localhost:4000/login/sucess", { withCredentials: true });
    //         const data = await response.json();
    //         if (data.user) {
    //             setUserdata(data.user);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user:", error);
    //     }
    // };

    // useEffect(() => {
    //     getUser();
    // }, []);

    useEffect(() => {
        const storeUsername = localStorage.getItem("username");
        setUsername(storeUsername);

        const storeToken = localStorage.getItem("token");
        setToken(storeToken);
    }, [setUsername, setToken]);

    const handleSearch = (event) => {
        searchFunction(event.target.value);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to='/' className="brand-link">FreshMart</Link>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search products..."
                    className="search-input"
                />
                <FaSearch className="search-icon" />
            </div>
            <div className="navbar-actions">
                <div className="action-item">
                    <Link to="/favourite" className="action-link">
                        <FaHeart className="action-icon fav-count" />
                        {WhisListCount() > 0 && <span className="action-count">{WhisListCount()}</span>}
                    </Link>
                </div>
                <div className="action-item">
                    <Link to="/myorder" className="action-link">
                        <img src={orderimage} alt="Orders" className="order-icon"/>
                    </Link>
                </div>
                <div className="action-item">
                    <Link to="/cart" className="action-link">
                        <FaShoppingCart className="action-icon" />
                        {ItemCount() > 0 && <span className="action-count">{ItemCount()}</span>}
                    </Link>
                </div>
                {token ? (
                    <div className="user-profile">
                        <span className="username">{username}</span>
                        <button onClick={logoutHandler} className="logout-button">
                            <FaSignOutAlt />
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="login-button">
                        <FaUser /> Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;