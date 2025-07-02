import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {config} from "../../config.js";
import { AuthContext } from '../context/AuthContext.jsx';

function UpdateDoctorProfile({setDoctorInfo}) {
    const nav = useNavigate();
    const {setCurrentUser} = useContext(AuthContext);
    const [specialty, setSpecialty] = useState('GP');
    const [address, setAddress] = useState("")
    const [startedYear, setStartedYear] = useState(1900);
    const [userUpdates, setUserUpdates] = useState({
        firstName: '',
        lastName: '',
        description: ''
      })
  



function handleUpdate(event){
    event.preventDefault();

    const token = localStorage.getItem('authToken');
    // const updatedDoctor = {
    //     specialty: specialty,
    //     startedYear: startedYear
    // }
    
        axios.put(config.apiUrl + "/profile/updateDoctor", {
            specialty, 
            address, 
            startedYear,
            userUpdates
        },{
            headers: {
                Authorization: `Bearer ${token}`}
            })
            .then((res)=>{
                
                console.log(res.data);
                if(res.data.user){
                    setCurrentUser(res.data.user);
                }
                if(res.data.doctor){
                    setDoctorInfo(res.data.doctor);
                }

            })
            .catch((error)=>{
                console.log(error);
            })
        
        }

function handleDelete(){
    const token = localStorage.getItem('authToken');
    axios.delete(config.apiUrl + "/profile/deleteDoctor",
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
        
        <label>Specialty
        <select
        id="specialty"
        value={specialty}
        onChange={(event) =>setSpecialty(event.target.value)}>
        <option value="">-- Select a specialty --</option>

        {/* Internal Medicine */}
        <optgroup label="Internal Medicine & Subspecialties">
          <option value="Internal Medicine">Internal Medicine</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Endocrinology">Endocrinology</option>
          <option value="Gastroenterology">Gastroenterology</option>
          <option value="Hematology">Hematology</option>
          <option value="Infectious Disease">Infectious Disease</option>
          <option value="Nephrology">Nephrology</option>
          <option value="Oncology">Oncology</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Rheumatology">Rheumatology</option>
          <option value="Geriatrics">Geriatrics</option>
          <option value="Allergy and Immunology">Allergy and Immunology</option>
        </optgroup>

  

        {/* Neurology & Psychiatry */}
        <optgroup label="Neurology & Psychiatry">
          <option value="Neurology">Neurology</option>
          <option value="Clinical Neurophysiology">Clinical Neurophysiology</option>
          <option value="Pain Medicine">Pain Medicine</option>
          <option value="Psychiatry">Psychiatry</option>
          <option value="Child and Adolescent Psychiatry">Child and Adolescent Psychiatry</option>
          <option value="Forensic Psychiatry">Forensic Psychiatry</option>
          <option value="Geriatric Psychiatry">Geriatric Psychiatry</option>
          <option value="Addiction Psychiatry">Addiction Psychiatry</option>
        </optgroup>


        {/* Organ or System Specialties */}
        <optgroup label="Organ/System Specialties">
          <option value="Dermatology">Dermatology</option>
          <option value="Ophthalmology">Ophthalmology</option>
          <option value="Otolaryngology">Otolaryngology (ENT)</option>
          <option value="Urology">Urology</option>
          <option value="Gynecology and Obstetrics">Gynecology and Obstetrics</option>
          <option value="Anesthesiology">Anesthesiology</option>
          <option value="Radiology">Radiology</option>
          <option value="Interventional Radiology">Interventional Radiology</option>
          <option value="Pathology">Pathology</option>
        </optgroup>
      </select>
    </label>
    <label>
            Address
            <input type="text" value={address} onChange={(event)=> setAddress(event.target.value)}/>
        </label>

        <label>
            startedYear
            <input type="number" value={startedYear} onChange={(event)=> setStartedYear(event.target.value)}/>
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