import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CreatePatientProfile from './CreatePatientProfile';
import {config} from "../../config.js";

function PatientProfile() {
  const {currentUser, setCurrentUser, patientId } = useContext(AuthContext);
  const [patientInfo, setPatientInfo] = useState(null);
console.log(currentUser)

useEffect(()=>{
  const userId = currentUser._id;
  axios.get(config.apiUrl + `/profile/${userId}`)
  .then((res)=>{
    setCurrentUser(res.data);
  })
  .catch((error)=>{
    console.log(error);
  })

},[currentUser._id])

useEffect(()=>{
  axios.get(config.apiUrl + `/profile/patient/${patientId}`)
.then((res)=>{
  console.log(res.data)
  setPatientInfo(res.data)
  
})
.catch((error)=>{
  console.log(error);
})
},[patientId])


  return (
    <>
    <div className='patient-profile'>
    <div>
      <h1>{currentUser.firstName} {currentUser.lastName}</h1>
    </div>

    </div>
    </>
    
  )
}

export default PatientProfile