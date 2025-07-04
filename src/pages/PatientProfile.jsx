import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {config} from "../../config.js";
import PatientUpdate from './PatientUpdate.jsx';

function PatientProfile() {
  const {currentUser, setCurrentUser, patientId } = useContext(AuthContext);
  const [patientInfo, setPatientInfo] = useState({});
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
  axios.get(config.apiUrl + `/profile/patient/${patientId}`)
  .then((res)=>{
    setPatientInfo(res.data)
   
  })
  .catch((error)=>{
    console.log(error);
  })

},[patientId])

console.log(patientInfo)
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
    <section className='patient-profile'>
      <article className='patient-info'>
        <h1>You can see your data here: </h1>
        <h2>Name: {currentUser.firstName} {currentUser.lastName}</h2>
        <h3>E-mail: {currentUser.email}</h3>
        <h3>Birthday: {patientInfo.dateOfBirth}</h3>
        <h4>Your history: {patientInfo.history}</h4>
        <p>Description: {currentUser.description}</p>
        
      </article>

    <article className='patient-edit'>  
    <p>You can update your information here!</p>
    <PatientUpdate patientInfo={patientInfo} setPatientInfo={setPatientInfo}/>
    <p>Do you want to delete your account?</p>
    <button onClick={handleDelete}> delete</button>
    </article>
    </section>
    
    </>
    
  )
}

export default PatientProfile