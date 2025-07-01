import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { config } from '../../config';

function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [role, setRole] = useState('doctor')
  const nav = useNavigate();

  function handleSignupUser(event) {
    event.preventDefault()
    const userToCreate = { firstName, lastName, email, password, description, role }
    axios.post(config.apiUrl + '/auth/signup', userToCreate)
      .then((res) => {
        console.log('user successfully created', res.data)
        nav("/login")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    < >
    
   
      <form onSubmit={handleSignupUser} className='signup-style'>
        <p>
          You can signup here as a patient or doctor and after login you complete your profile
        </p>
        <label>
          Firstname:
          <input type='text' value={firstName} onChange={(event) => setFirstName(event.target.value)} />
        </label>
        <label>
          Lastname:
          <input type='text' value={lastName} onChange={(event) => setLastName(event.target.value)} />
        </label>
        <label>
          Email:
          <input type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password:
          <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <label>
          Your role:
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </label>
        <button className='btn'>Sign up</button>
        <p>you already have an account, so you can Login
          <Link to="/login">login</Link>
        </p>
      </form>
    </>
  )
}

export default Signup
