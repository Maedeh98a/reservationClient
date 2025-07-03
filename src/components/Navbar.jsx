import React, { useContext } from 'react'
import reserve from '../assets/reserve.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {config} from "../../config.js";

function Navbar() {
    const {currentUser, isLoggedIn, handleLogout} = useContext(AuthContext);
  return (
    <>
    <nav>
      <section className='common-nav'>
        <img id='logo-img' src={reserve} alt='logo'/>
            <Link to="/doctors">Doctors</Link>
            <Link>About us</Link>
      </section>


       <section className='user-nav'>
        {isLoggedIn && currentUser.role == "docotor" ?
        ( <Link to="/doctorProfile">My profile</Link>) 
        : (<Link to="/login">Login</Link>)}


        {isLoggedIn && currentUser.role == "patient" ?
        ( <Link to="/patientProfile">My profile</Link>) 
        : (<Link to="/login">Login</Link>)}
            
            
           
      </section>
        
    </nav>
    


    </>
  )
}

export default Navbar