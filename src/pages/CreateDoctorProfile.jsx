import React, { useContext, useState } from 'react'
import axios
 from 'axios';
import { AuthContext } from '../context/AuthContext';
import TimeSlot from '../components/TimeSlot';
import {config} from "../../config.js";
import { useNavigate, useParams } from 'react-router-dom';


function CreateDoctorProfile() {
    const nav = useNavigate();
    const {userId} = useParams();
    const [specialty, setSpecialty] = useState("");
    const [address, setAddress] = useState("");
    const[startedYear, setStartedYear] = useState(1930);
    
async function doctorInfoHandle(event) {
  event.preventDefault();
  try {

    const doctorInfo = await axios.post(config.apiUrl + `/profile/createDoctor/${userId}`, {
      specialty: specialty,
      address: address,
      startedYear: startedYear
    },)
    console.log("doctor created", doctorInfo.data)
    nav("/login")
    
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
       <label>address
        <input type="text" onChange={(event)=>{setAddress(event.target.value)}} />
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