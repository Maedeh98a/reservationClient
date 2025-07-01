import React, { useState } from 'react'
import TimeSlot from './TimeSlot'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import {config} from "../../config.js";

function UpdateTimeSlot({timeslot, setAvailabilities}) {
    const nav = useNavigate();
    const [date, setDate] = useState(timeslot.date.slice(0,10));
    const [start, setStart] = useState(timeslot.start);
    const [end, setEnd] = useState(timeslot.end);

    function handleUpdate(event){
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        axios.put(config.apiUrl + `/timeslot/updateTimeslot/${timeslot._id}`, {
            date, start, end
        }, {headers:{
            Authorization: `Bearer ${token}`
        }})
        .then((res)=>{
            console.log(res);
            nav("/doctorProfile");
            setAvailabilities(prev =>
        prev.map(slot =>
          slot._id === timeslot._id ? res.data : slot
        )
      );
        })
        .catch((error)=>{
            console.log(error);
        })
    }
  return (
    <>
    <form onSubmit={handleUpdate}>
        <label> Date: 
            <DatePicker selected={date} onChange={(newDate)=> setDate(newDate)} dateFormat="yyyy-MM-dd"/>
        </label>
        <label> start
            <input type='time' value={start} onChange={(e)=> setStart(e.target.value)}/>
        </label>
        <label> end
            <input type='time' value={end} onChange={(e)=> setEnd(e.target.value)}/>
        </label>
        <button type='submit'>Update</button>
    </form>
    </>
  )

}

export default UpdateTimeSlot