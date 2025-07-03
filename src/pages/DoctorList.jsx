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
    <section>
      {doctors.map((doctor)=>{
        return(
          <>
          <div key={doctor._id} className='doctorlist'>
            <article>
            <h2>Doctor's name: {doctor.user.firstName} {doctor.user.lastName}</h2>
            <h3>Doctor's specialty: {doctor.specialty}</h3>
            <h4>He started his work at {doctor.startedYear}</h4>
            </article>
            
             <article id="doctor-availability">
              <p>Doctor's description: {doctor.user.description}</p>
           <Link to={`/doctors/${doctor._id}`}>You can check the doctor's availabilities here</Link>
          </article>

          </div>
         
        </>
        )
      })}
    </section>
    </>
  )
}

export default DoctorList