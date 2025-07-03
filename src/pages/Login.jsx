import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode';
import {config} from "../../config.js";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {authenticateUser} = useContext(AuthContext)
  // const {doctorId, setDoctorId} = useContext(AuthContext)
  // const {patientId,setPatientId} = useContext(AuthContext)
  const nav = useNavigate();
  async function handleLoginUser(event){
    event.preventDefault();
      
    try {
      const userToLogin = {email, password};
      // const res = await axios.post(`https://reservationserver-g0sr.onrender.com/auth/login`, userToLogin)
      console.log("Api url",config.apiUrl)
      const res = await axios.post(config.apiUrl + "/auth/login", userToLogin);
      localStorage.setItem("authToken", res.data.authToken);
      const decode = jwtDecode(res.data.authToken);
      console.log(decode)
      await authenticateUser();
      
      if(decode.role == 'doctor'){
       // setDoctorId(decode.doctorId)
        nav(`/doctorProfile`);
  
      }
      else if(decode.role == 'patient'){
        // setPatientId(decode.patientId);
        nav(`/patientProfile`);
      }
      // I have to figure out for user profile is it doctor or patient
    
    } catch (error) {
      console.log(error)
    }
    
   
  }
  return (
    <div>
      <form onSubmit={handleLoginUser}className='login-style'>
        <h1 className=''>You can login here</h1>
        <label>email
          <input type='email' value={email} onChange={(event)=>setEmail(event.target.value)}/>
        </label>
        <label>password
          <input type='password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
        </label>
        <button className="btn">Login</button>
        <p>You don't have account, so at first create new account
          <Link to="/">signup</Link>
        </p>
      </form>
    </div>
  )
}

export default Login