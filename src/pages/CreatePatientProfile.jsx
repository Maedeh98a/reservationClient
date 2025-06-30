import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

function CreatePatientProfile({setPatientInfo}) {
    const {currentUser} = useContext(AuthContext);
    const [dateOfBirth, setDateOfBirth] = useState("1900-01-01");
    const[history, setHistory] = useState([]);
 async function doctorInfoHandle(event) {
  event.preventDefault();
  try {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const patientInfo = await axios.post("http://localhost:5005/profile/createPatient", {
      user: currentUser._id,
      dateOfBirth:dateOfBirth,
      history:history
    },
    {
      headers:{
        Authorization: `Bearer ${token}`
      } 
    })
    console.log("doctor created", patientInfo.data)
    setPatientInfo(patientInfo);
  } catch (error) {
    console.log(error)
  }
}
  return (
    <>
     <form onSubmit={doctorInfoHandle}>
      <label>dateOfBirth
        <input type="date" onChange={(event)=>{setDateOfBirth(event.target.value)}} />
      </label>
      <label> history
        <input type="text" onChange={(event)=>{setHistory(event.target.value)}}/>
      </label>
      
      <button>submit</button>
    </form>

    </>
   
  )
}

export default CreatePatientProfile