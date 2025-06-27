import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function DoctorProfile() {
  const {currentUser, setCurrentUser, isLoading, isLoggedIn,handleLogout } = useContext(AuthContext);
  const [specialty, setSpecialty] = useState("");
  const[startedYear, setStartedYear] = useState(1990);
  const [availabilities, setAvailabilities] = useState([]);


async function doctorInfoHandle(event) {
  event.preventDefault();
  try {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const doctorInfo = await axios.post("http://localhost:5005/profile/createDoctor", {
      user: currentUser._id,
      specialty: specialty,
      startedYear: startedYear
    },
    {
      headers:{
        Authorization: `Bearer ${token}`
      } 
    })
    console.log("doctor created", doctorInfo.data)
  } catch (error) {
    console.log(error)
  }
}
  return (
<>
<div>DoctorProfile
    <p>{currentUser.firstName}</p>
    
      <button onClick={handleLogout}>Logout</button>
    </div>

    <form onSubmit={doctorInfoHandle}>
      <label>specialty
        <input type="text" onChange={(event)=>{setSpecialty(event.target.value)}} />
      </label>
      <label> startedYear
        <input type="number" onChange={(event)=>{setStartedYear(event.target.value)}}/>
      </label>
      <button>submit</button>
    </form>
</>
    
  )
}

export default DoctorProfile