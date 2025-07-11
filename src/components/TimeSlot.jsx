import React from 'react';
import {useState, useContext} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../context/AuthContext';
import {config} from "../../config.js";


function TimeSlot({availabilities, setAvailabilities}) {
    const [date, setDate] = useState(new Date());
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const {currentUser} = useContext(AuthContext);

    async function handleSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem("authToken");
        try {
            const res = await axios.post(config.apiUrl + "/timeslot/availability", {
                date: date.toISOString().split('T')[0],
                start, 
                end
            },
        {
            headers:
             {Authorization:`Bearer ${token}`}
        });
        const newAvailability = res.data;
        setAvailabilities((prev) => [...prev, newAvailability].sort((a, b)=> new Date(a.date) - new Date(b.date)));
        console.log("Availability created:", res.data);

            
        } catch (error) {
            console.log(error);
        }
    }
  return (
   <form onSubmit={handleSubmit} className='form-style'>
    <h2>Availability</h2>
    <label> select Date
        <DatePicker selected={date} onChange={(d)=> setDate(d)}/>
    </label>
    <label>select start
        <input type='time' onChange={(event) => setStart(event.target.value)} />
    </label>
    <label>select end
        <input type='time' onChange={(event) => setEnd(event.target.value)} />
    </label>
    <button id='timeslot-btn' type='submit'>Add time slot</button>

   </form>
  )
}

export default TimeSlot