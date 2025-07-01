import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {config} from "../../config.js";

function DoctorDetails() {
const {doctorId} = useParams();
const [doctor, setDoctor] = useState({});

useEffect(()=>{
  axios.get(config.apiUrl + `/profile/doctor/${doctorId}`)
  .then((res)=>{
   setDoctor(res.data);
  })
  .catch((error)=>{
    console.log(error);
  })

},[doctorId])
  
  return (
    <div>
       <h2>{doctor.specialty}</h2> 
    </div>
  )

}
export default DoctorDetails