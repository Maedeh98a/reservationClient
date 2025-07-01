import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {config} from "../../config.js";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
    useEffect(()=>{
    axios.get(config.apiUrl + "/profile/doctors")
    .then((res)=>{
        console.log(res.data);
        setDoctors(res.data)
    })
    .catch((error)=>{
        console.log(error);
    })
},[])
  return (
    <>
    <div>
      {doctors.map((doctor)=>{
        return(
          <div key={doctor._id} className='doctorlist'>
            <Link to={`/doctors/${doctor._id}`}>{doctor.user.firstName} {doctor.user.lastName}</Link>
            <h2>{doctor.specialty}</h2>
            <h3>{doctor.startedYear}</h3>
            

          </div>
        )
      })}
    </div>
    </>
  )
}

export default DoctorList