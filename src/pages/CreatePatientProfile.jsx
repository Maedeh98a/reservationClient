import axios from 'axios';
import React, { useContext, useState } from 'react'
import {config} from "../../config.js";
import { useNavigate, useParams } from 'react-router-dom';

function CreatePatientProfile() {

    const [dateOfBirth, setDateOfBirth] = useState("1900-01-01");
    const[history, setHistory] = useState([]);
    const {userId} = useParams();
    const nav = useNavigate();

 async function patientInfoHandle(event) {
  event.preventDefault();
  try {
  
    const patientInfo = await axios.post(config.apiUrl + `/profile/createPatient/${userId}`, {
     
      dateOfBirth:dateOfBirth,
      history:history
    })
    console.log("patient created", patientInfo.data)
    nav("/login")
  } catch (error) {
    console.log(error)
  }
}
  return (
    <>
     <form onSubmit={patientInfoHandle}>
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