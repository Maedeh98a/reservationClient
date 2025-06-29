import React from 'react';
import {useState, useContext} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../context/AuthContext';


function TimeSlot({availabilities, setAvailabilities}) {
    const [date, setDate] = useState(new Date());
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const {currentUser} = useContext(AuthContext);

    async function handleSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem("authToken");
        try {
            const res = await axios.post("http://localhost:5005/profile/availability", {
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
   <form onSubmit={handleSubmit}>
    <h2>Availability</h2>
    <label> select Date
        <DatePicker selected={date} onChange={(d)=> setDate(d)}/>
    </label>
    <label>select start
        <input type='text' onChange={(event) => setStart(event.target.value)} />
    </label>
    <label>select end
        <input type='text' onChange={(event) => setEnd(event.target.value)} />
    </label>
    <button type='submit'>Add time slot</button>

   </form>
  )
}

export default TimeSlot