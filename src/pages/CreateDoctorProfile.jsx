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
     <form onSubmit={doctorInfoHandle} className='creat-doctor-form'>
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
       <label>address
        <input type="text" onChange={(event)=>{setAddress(event.target.value)}} />
      </label>
      <label> startedYear
        <input type="number" onChange={(event)=>{setStartedYear(event.target.value)}}/>
      </label>
      
      <button id='create-doctor-btn'>Create Profile</button>
    </form>

    </>
   
  )
}

export default CreateDoctorProfile