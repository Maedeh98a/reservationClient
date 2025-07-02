import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CreatePatientProfile from './CreatePatientProfile';
import {config} from "../../config.js";
import PatientUpdate from './PatientUpdate.jsx';

function PatientProfile() {
  const {currentUser, setCurrentUser, patientId } = useContext(AuthContext);
  const [patientInfo, setPatientInfo] = useState(null);
  const nav = useNavigate();

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
  axios.get(config.apiUrl + `/profile/doctor/${patientId}`)
  .then((res)=>{
    setPatientInfo(res.data)
   
  })
  .catch((error)=>{
    console.log(error);
  })

},[patientId])

function handleDelete(){
const token = localStorage.getItem('authToken')
  axios.delete(config.apiUrl + "/profile/deletePatient", {headers:
    {
      Authorization: `Bearer ${token}`
    }
  })
  .then((res)=>{
    console.log(res.data);
    nav("/");
  
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

    </div>
    <PatientUpdate setPatientInfo={setPatientInfo}/>
    <button onClick={handleDelete}> delete</button>
    </>
    
  )
}

export default PatientProfile