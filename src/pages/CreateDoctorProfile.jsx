import React, { useContext, useState } from 'react'
import axios
 from 'axios';
import { AuthContext } from '../context/AuthContext';
import TimeSlot from '../components/TimeSlot';
import {config} from "../../config.js";


function CreateDoctorProfile({setDoctorInfo, authenticateUser}) {
 
    const {currentUser, doctorId, setDoctorId} = useContext(AuthContext);
    const [specialty, setSpecialty] = useState("");
    const[startedYear, setStartedYear] = useState(1930);
    
async function doctorInfoHandle(event) {
  event.preventDefault();
  try {
    const token = localStorage.getItem('authToken');
    console.log(token)
    const doctorInfo = await axios.post(config.apiUrl + "/profile/createDoctor", {
      user: currentUser._id,
      specialty: specialty,
      startedYear: startedYear
    },
    {
      headers:{
        Authorization: `Bearer ${token}`
      } 
    })
    console.log("doctor created", doctorInfo.data)
    setDoctorInfo(doctorInfo.data);
  } catch (error) {
    console.log(error)
  }
}
  return (
    <>
     <form onSubmit={doctorInfoHandle}>
      <label>specialty
        <input type="text" onChange={(event)=>{setSpecialty(event.target.value)}} />
      </label>
      <label> startedYear
        <input type="number" onChange={(event)=>{setStartedYear(event.target.value)}}/>
      </label>
      
      <button>submit</button>
    </form>

    </>
   
  )
}

export default CreateDoctorProfile