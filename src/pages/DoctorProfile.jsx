import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import TimeSlot from '../components/TimeSlot';
import CreateDoctorProfile from './CreateDoctorProfile';

function DoctorProfile() {
  const {currentUser, setCurrentUser, isLoading, isLoggedIn,handleLogout, doctorId } = useContext(AuthContext);
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);


useEffect(()=>{
  const userId = currentUser._id;
  axios.get(`http://localhost:5005/profile/${userId}`)
  .then((res)=>{
    setCurrentUser(res.data);
  })
  .catch((error)=>{
    console.log(error);
  })

},[currentUser._id])

useEffect(()=>{
  const token = localStorage.getItem("authToken")
  axios.get(`http://localhost:5005/profile/availability/${doctorId}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  .then((res)=>{
    console.log(res.data)
    console.log(doctorId)
    setAvailabilities(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })
},[doctorId])



  function getDoctorProfile(doctorId){
    useEffect(()=>{
  axios.get(`http://localhost:5005/profile/doctor/${doctorId}`)
  .then((res)=>{
    setDoctorInfo(res.data)
   
  })
  .catch((error)=>{
    console.log(error);
  })

},[doctorId])


  }


  return (
<>


<div>{doctorId != undefined ? getDoctorProfile(doctorId) : <CreateDoctorProfile/>}</div>
    <p>{currentUser.firstName}</p>
    <h3>{doctorInfo._id}</h3>
    <div>
      {doctorId != undefined ? <TimeSlot/> : "you should create your profile"}
      <div>
  {availabilities.map((item) => (
    <div key={item._id}>
      <h3>{new Date(item.date).toLocaleDateString()}</h3>
      <p>{item.start} - {item.end}</p>
    </div>
  ))}
</div>
      <div/>
      <button onClick={handleLogout}>Logout</button>
    </div>

    
</>
    
  )
}

export default DoctorProfile