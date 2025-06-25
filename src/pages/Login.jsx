import axios from 'axios';
import React, { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLoginUser(event){
    event.preventDefault();
    const userToLogin = {email, password};
    axios.post("http://localhost:5005/auth/login", userToLogin)
    .then((res)=>{
      console.log("user successfully logged in", res.data);
      // I have to figure out for user profile is it doctor or patient
    })
    .catch((err) => console.log(err))
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