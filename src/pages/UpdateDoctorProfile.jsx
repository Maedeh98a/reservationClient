import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UpdateDoctorProfile({doctorInfo, setDoctorInfo}) {
    const nav = useNavigate();
    const [specialty, setSpecialty] = useState('GP');
    const [startedYear, setStartedYear] = useState(1900);



function handleUpdate(event){
    event.preventDefault();

    const token = localStorage.getItem('authToken');
    const updatedDoctor = {
        specialty: specialty,
        startedYear: startedYear
    }
        axios.put("http://localhost:5005/profile/updateDoctor", updatedDoctor,{
            headers: {
                Authorization: `Bearer ${token}`}
            })
            .then((res)=>{
                setDoctorInfo(res.data)
                console.log(res.data);

            })
            .catch((error)=>{
                console.log(error);
            })
        }

function handleDelete(){
    const token = localStorage.getItem('authToken');
    axios.delete("http://localhost:5005/profile/deleteDoctor",
        {headers:{
            Authorization: `Bearer ${token}`
        }}
    )
    .then((res)=>{
        console.log(res.data);
        nav("/")
        
    })
    .catch((error)=>{
        console.log(error);
    })
}
  return (
    <>
    <form onSubmit={handleUpdate} className='update-form'>
        <label>
            specialty
            <input type='text' value={specialty} onChange={(event)=>setSpecialty(event.target.value)}/>
        </label>
        <label>
            startedYear
            <input type="number" value={startedYear} onChange={(event)=> setStartedYear(event.target.value)}/>
        </label>
        <button id="update-btn" className='btn'>update</button>

    </form>
    <h3> with this delete button you loose your account permanently!!! </h3>
    <button id="delete-btn" className="btn" onClick={handleDelete}>
        delete doctor
    </button>
    </>
  )
}

export default UpdateDoctorProfile