import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import TimeSlot from '../components/TimeSlot';
import CreateDoctorProfile from './CreateDoctorProfile';
import UpdateDoctorProfile from './UpdateDoctorProfile';
import UpdateTimeSlot from '../components/UpdateTimeSlot';
import DeleteTimeSlot from '../components/DeleteTimeSlot';

function DoctorProfile() {
  const {currentUser, setCurrentUser,handleLogout, doctorId } = useContext(AuthContext);
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [editingId, setEditingId] = useState(null);


useEffect(()=>{
  const userId = currentUser._id;
  axios.get(`http://localhost:5005/profile/${userId}`)
  .then((res)=>{
    setCurrentUser(res.data);
  })
  .catch((error)=>{
    console.log(error);
  })

},[currentUser._id])

// check this part
useEffect(()=>{
  const token = localStorage.getItem("authToken")
  axios.get(`http://localhost:5005/timeslot/availability/${doctorId}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  .then((res)=>{
    console.log(res.data)
    console.log(doctorId)
    setAvailabilities(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })
},[doctorId])



  function getDoctorProfile(doctorId){
    useEffect(()=>{
  axios.get(`http://localhost:5005/profile/doctor/${doctorId}`)
  .then((res)=>{
    setDoctorInfo(res.data)
   
  })
  .catch((error)=>{
    console.log(error);
  })

},[doctorId])
  }

function handleDelete(itemId){
  const token = localStorage.getItem('authToken')
  axios.delete(`http://localhost:5005/timeslot/deleteTimeslot/${itemId}`, {headers:{
    Authorization: `Bearer ${token}`

  }})
  .then((res)=>{
   console.log(res.data);
   setAvailabilities(prev => prev.filter(item => item._id !== itemId))

  })
  .catch((error)=>{
    console.log(error);
  })
}
  return (
<>

<section className='doctor-profile'>
  <article className='doctor-style'>

    <div>
      {doctorId != undefined ? getDoctorProfile(doctorId) : <CreateDoctorProfile  setDoctorInfo={setDoctorInfo}/>}
    <h2>Mr {currentUser.firstName} {currentUser.lastName}</h2>
    <h4>email : {currentUser.email}</h4>
    <h4>specialty: {doctorInfo.specialty}</h4>
    <h4>started Year: {doctorInfo.startedYear}</h4>
   
      </div>
      <div>
        <h4>You can change your profile here:</h4>
        
          <UpdateDoctorProfile doctorInfo={doctorInfo} setDoctorInfo={setDoctorInfo}/>
      </div>
        
     
  </article>
  <article className='timeslot-style'>

    
      {doctorId != undefined ? <TimeSlot availabilities={availabilities} setAvailabilities={setAvailabilities}/> : "you should create your profile"}
      <div>
  {availabilities.map((item) => (
    <div key={item._id} className='timeslot-table'>
      <table>
        <thead>
          <tr>
          <th>date</th>
        <th>weekday</th>
        <th>time</th>
        <th>booked</th>
        <th>patient</th>
        <th>edit</th>
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
        <td>{item.patient}</td>
        <td>
          <button onClick={()=> handleDelete(item._id)}>delete</button>
          <button onClick={()=> setEditingId(item._id)}>update</button>
          {editingId == item._id && <UpdateTimeSlot timeslot={item} setAvailabilities={setAvailabilities}/>}
        
        </td>
          </tr>
        </tbody>
      </table>
      
      
    </div>
  ))}
</div>
  </article>
    
</section>


    
</>
    
  )
}

export default DoctorProfile