import axios from 'axios';
import React, { useContext, useState } from 'react'
import { config } from '../../config';
import { AuthContext } from '../context/AuthContext';

function PatientUpdate({patientInfo, setPatientInfo}) {
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
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const [dateOfBirth, setDateOfBirth] = useState(patientInfo.dateOfBirth);
  const [history, setHistory] = useState(patientInfo.history);
  const [userUpdates, setUserUpdates] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    description: currentUser.description
  })

  function handlePatientUpdate(event){
    event.preventDefault();

    const token = localStorage.getItem('authToken');
    axios.put(config.apiUrl + '/profile/updatePatient', {
      dateOfBirth, 
      history, 
      userUpdates
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res)=>{
      console.log("Updated patient and user:", res.data);
      if(res.data.user){
        setCurrentUser(res.data.user);
      }
      if(res.data.patient){
        setPatientInfo(res.data.patient);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <>
    <form onSubmit={handlePatientUpdate} className='form-style'>
    <label> Date of birth
      <input type='date' value={dateOfBirth} onChange={(event)=>setDateOfBirth(event.target.value)}/>
    </label>
    <label> your illness history
     <select value={history} onChange={(event)=>{setHistory(event.target.value)}}>
      <option value="">--Please choose one--</option>
      {diseaseOptions.map((disease, index) =>(
        <option key={index} value={disease}>
          {disease}
        </option>
      ))}
    </select>
    </label>
    <label>First Name
      <input type='text' value={userUpdates.firstName} onChange={(e) => setUserUpdates({...userUpdates, firstName: e.target.value})}/>
    </label>
    <label>Last Name
      <input type='text' value={userUpdates.lastName} onChange={(e) => setUserUpdates({...userUpdates, lastName: e.target.value})}/>
    </label>
    <label>description
      <textarea value={userUpdates.description} rows={3} onChange={(e) => setUserUpdates({...userUpdates, description: e.target.value})}/>
    </label>
    <button type='submit'>update</button>

    </form>
    </>
  )
}

export default PatientUpdate