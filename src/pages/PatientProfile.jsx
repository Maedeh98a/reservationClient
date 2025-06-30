import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CreatePatientProfile from './CreatePatientProfile';

function PatientProfile() {
  const {currentUser, setCurrentUser,handleLogout, patientId } = useContext(AuthContext);
  const [patientInfo, setPatientInfo] = useState(null);
console.log(currentUser)

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

function getPatientInfo(patientId){
axios.get(`http://localhost:5005/profile/patient/${patientId}`)
.then((res)=>{
  console.log(res.data)
  setPatientInfo(res.data)
  
})
.catch((error)=>{
  console.log(error);
})
}
  return (
    <>
    <div className='patient-profile'>
    <div>
      <h1>{currentUser.firstName} {currentUser.lastName}</h1>
    </div>
    {patientInfo? (
      <div>
        {patientInfo.history}</div>
    ): <CreatePatientProfile setPatientInfo={setPatientInfo}/>}
    
      <button onClick={handleLogout}>Logout</button>
    </div>
    </>
    
  )
}

export default PatientProfile