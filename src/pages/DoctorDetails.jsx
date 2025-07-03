import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {config} from "../../config.js";

function DoctorDetails() {
const {doctorId} = useParams();
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
    console.log(res.data)
    setAvailabilities(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })
},[doctorId])

function handleReserve(timeslotId){
  
    const token = localStorage.getItem('authToken');
    
    axios.post(config.apiUrl + `/timeslot/${timeslotId}/reserve`,{}, {headers:{
    Authorization: `Bearer ${token}`

  }})
  .then((res)=>{
    console.log(res.data);

  })
    
    
  .catch ((error)=>{
    console.log(error);

  }) 
    
}



  return (
    <>
       <h2>{doctor.specialty}</h2> 

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
    </>
  )

}
export default DoctorDetails