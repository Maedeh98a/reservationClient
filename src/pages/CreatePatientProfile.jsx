import axios from 'axios';
import React, { useContext, useState } from 'react'
import {config} from "../../config.js";
import { useNavigate, useParams } from 'react-router-dom';

function CreatePatientProfile() {
    const diseaseOptions = [
                  "Cancer",
                  "Diabetes",
                  "Hypertension (High Blood Pressure)",
                  "Heart Disease",
                  "Asthma",
                  "Chronic Obstructive Pulmonary Disease (COPD)",
                  "Stroke",
                  "Alzheimer’s Disease",
                  "Parkinson’s Disease",
                  "Depression",
                  "Anxiety Disorder",
                  "Arthritis",
                  "Obesity",
                  "Chronic Kidney Disease",
                  "Liver Disease",
                  "HIV/AIDS",
                  "COVID-19",
                  "Influenza (Flu)",
                  "Tuberculosis",
                ];

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
     <form onSubmit={patientInfoHandle} className='create-patient-form'>
      <label>dateOfBirth
        <input type="date" onChange={(event)=>{setDateOfBirth(event.target.value)}} />
      </label>
     <select value={history} onChange={(event)=>{setHistory(event.target.value)}}>
      <option value="">--Please choose one--</option>
      {diseaseOptions.map((disease, index) =>(
        <option key={index} value={disease}>
          {disease}
        </option>
      ))}
    </select>
      
      <button>submit</button>
    </form>

    </>
   
  )
}

export default CreatePatientProfile