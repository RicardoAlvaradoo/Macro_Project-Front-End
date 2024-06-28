import { useState, useEffect } from "react"
import '../styles/Nav.css'
import User from '../assets/user.png'

function Nav(auth){
   
    



   
    return (
    <> 
    
    <div className="topnav">
    <div className="title">
    <h2>Placeholder</h2>
    </div>
  <ul>
  <li><a  href="#home">Home</a></li>
  <li><a href="#news">Info</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><img src={User} className="user" /> <a href="/login">Sign In</a></li>
      
  </ul>

</div>

</>
    )

};

export default Nav;