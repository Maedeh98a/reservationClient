import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {authenticateUser} = useContext(AuthContext)

  const nav = useNavigate();
  async function handleLoginUser(event){
    event.preventDefault();
      const userToLogin = {email, password};
    try {
      const res = await axios.post("http://localhost:5005/auth/login", userToLogin);
      localStorage.setItem("authToken", res.data.authToken);
      const decode = jwtDecode(res.data.authToken);
      console.log(decode.role)
      await authenticateUser();
      if(decode.role == 'doctor'){
        nav("/doctorProfile");
      }
      else if(decode.role == 'patient'){
        nav("/patientProfile");
      }
      

      // I have to figure out for user profile is it doctor or patient
    
    } catch (error) {
      console.log(error)
    }
    
   
  }
  return (
    <div>
      <form onSubmit={handleLoginUser}>
        <label>email
          <input type='email' value={email} onChange={(event)=>setEmail(event.target.value)}/>
        </label>
        <label>password
          <input type='password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
        </label>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login