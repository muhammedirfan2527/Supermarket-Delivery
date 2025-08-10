import React from 'react'
import './Footer.css'
import  twitter_icon  from '../assets/twitter_icon.png'
import  facebook_icon  from '../assets/facebook_icon.png'
import  linkedin_icon  from '../assets/linkedin_icon.png'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        {/* <img src={assets.logo} alt="" /> */}
        <h1>FreshMart</h1>
        <div className="footer-social-icons">
            <img src={facebook_icon} alt="" />
            <img src={twitter_icon} alt="" />
            <img src={linkedin_icon} alt="" />
        </div>
      </div>
      <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
      </div>
      <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
            <li>+1-212-456-7890</li>
            <li>contact@freshmart.com</li>
        </ul>
      </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 FreshMart.com - All Right Reserved </p>
    </div>
  )
}

export default Footer
