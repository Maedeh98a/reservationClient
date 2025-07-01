import axios from 'axios';
import { useEffect } from 'react';
import { createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {config} from "../../config.js";

const AuthContext = createContext();

const AuthContextWrapper = ({children})=>{
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [doctorId, setDoctorId] = useState(null);
    const [patientId, setPatientId] = useState(null);

    async function authenticateUser(){
        try {
            const authToken = localStorage.getItem('authToken');

            if (authToken == null || authToken === "") {
                console.log("No auth token to log in");
                return;
            }

            const response = await axios.get(config.apiUrl + "/auth/verify",
                {
                    headers:{
                        authorization:`Bearer ${authToken}`
                    }
                }
            );

            const payload = response.data.payload;
          
            setCurrentUser(payload);
            setIsLoading(false);
            setIsLoggedIn(true);

            if(payload.role === "doctor"){
                setDoctorId(payload.doctorId);
            } else if(payload.role === "patient"){
                setPatientId(payload.patientId);
            }
        } catch (error) {
            console.error(error);
            setCurrentUser(null);
            setIsLoading(false);
            setIsLoggedIn(false);            
        }
    }
    function handleLogout(){
        localStorage.removeItem('authToken');
        nav('/login');
    }
    useEffect(()=>{
        authenticateUser();
    },[])
    return (
        <AuthContext.Provider value={{
            authenticateUser,
            currentUser,
            isLoading,
            isLoggedIn,
            handleLogout,
            setCurrentUser,
            doctorId, 
            patientId,
            }}>
            {children}
        </AuthContext.Provider>
    )

    
}

export {AuthContext, AuthContextWrapper}