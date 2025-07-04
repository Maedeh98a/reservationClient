import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {config} from "../../config.js";
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.jsx';

function DoctorDetails() {
const {doctorId} = useParams();
const {isLoggedIn} = useContext(AuthContext)
const [doctor, setDoctor] = useState({});
const [availabilities, setAvailabilities] = useState([]);
useEffect(()=>{
  axios.get(config.apiUrl + `/profile/doctor/${doctorId}`)
  .then((res)=>{
   setDoctor(res.data);
  })
  .catch((error)=>{
    console.log(error);
  })

},[doctorId])
 
useEffect(()=>{
  axios.get(config.apiUrl + `/timeslot/availability/${doctorId}`)
  .then((res)=>{
    setAvailabilities(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })
},[doctorId])



function handleReserve(timeslotId){
    if(!isLoggedIn){
      toast.warn("You have to login first");
      return;
    }
    const token = localStorage.getItem('authToken');
    
    axios.post(config.apiUrl + `/timeslot/${timeslotId}/reserve`,{}, {headers:{
    Authorization: `Bearer ${token}`

  }})
  .then((res)=>{
    console.log(res.data);
     toast.success("Reservation successful!");

  })  
  .catch ((error)=>{
    console.log(error);
    toast.error("Something went wrong with the reservation.");
  }) 
    
}

  return (
    <>
    <section className='doctor-availabilities'>
      {availabilities.length == 0 ? "Doctor hasn't set his availabilities yet": "doctor's availabilies"}
     
         {availabilities.map((item) => (
    <div key={item._id} className='timeslot-table'>
      <table>
        <thead>
          <tr>
          <th>date</th>
        <th>weekday</th>
        <th>time</th>
        <th>booked</th>
        <th>reserve</th>
          </tr>
        </thead>
        <tbody>
          <tr>
                    <td>
        {new Date(item.date).toLocaleDateString()}
        </td>
        <td>
     {new Date(item.date).toLocaleDateString('en-US', {weekday: 'long'})}
        </td>
        <td>
        <p>{item.start} - {item.end}</p>
        </td>
        <td>{item.isBooked?"yes":"no"}</td>
        <td>
          <button onClick={()=> handleReserve(item._id)}>reserve</button>        
        </td>
          </tr>
        </tbody>
      </table>
      </div>
    )
    )}

     
    </section>
      
      
    </>
  )

}
export default DoctorDetails