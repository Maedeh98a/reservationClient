import axios from 'axios';
import React, { useContext, useState } from 'react'
import { config } from '../../config';
import { AuthContext } from '../context/AuthContext';

function PatientUpdate({setPatientInfo}) {
  const {setCurrentUser} = useContext(AuthContext);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [history, setHistory] = useState([]);
  const [userUpdates, setUserUpdates] = useState({
    firstName: '',
    lastName: '',
    description: ''
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
    <form onSubmit={handlePatientUpdate}>
    <label> Date of birth
      <input type='date' value={dateOfBirth} onChange={(event)=>setDateOfBirth(event.target.value)}/>
    </label>
    <label> your illness history
      <input type='text' value={history} onChange={(event)=>setHistory(event.target.value)}/>
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

    </form>
    </>
  )
}

export default PatientUpdate