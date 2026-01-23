import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                {/* <img src={assets.logo1} className="logo-vv" /> */}
                <h2 className='loog'>RAZZ FOOD EXPRESS</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos nihil ex odit iure ullam earum sapiente cum fuga id voluptas enim est et quibusdam dolor quis accusamus modi, eum saepe?</p>
                <div className='footer-social-icons'>
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.facebook_icon} alt='' />
                    <img src={assets.twitter_icon} alt='' />
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
                    <li>+91-9801267844</li>
                    <li>razzexpressfood@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p>Copyright 2026 &copy; razzexpressfood.com - All Right Reserved. &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; Made by- Vikash Kumar &#x2764;</p>
    </div>
  )
}

export default Footer
