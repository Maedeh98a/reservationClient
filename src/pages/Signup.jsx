import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [role, setRole] = useState('')
  const nav = useNavigate();

  function handleSignupUser(event) {
    event.preventDefault()
    const userToCreate = { firstName, lastName, email, password, description, role }
    axios.post('http://localhost:5005/auth/signup', userToCreate)
      .then((res) => {
        console.log('user successfully created', res.data)
        nav("/login")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <form onSubmit={handleSignupUser}>
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
          <input type='text' value={role} onChange={(event) => setRole(event.target.value)} />
        </label>
        <button>Sign up</button>
      </form>
    </div>
  )
}

export default Signup
