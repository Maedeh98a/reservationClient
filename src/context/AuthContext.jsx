import axios from 'axios';
import { useEffect } from 'react';
import { createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthContextWrapper = ({children})=>{
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [doctorId, setDoctorId] = useState(null);
    // const [patientId, setPatientId] = useState(null);

    async function authenticateUser(){
        try {
            const tokenInLocalStorage = localStorage.getItem('authToken')
            // console.log(tokenInLocalStorage);
            const response = await axios.get("http://localhost:5005/auth/verify",
                {headers:{
                    authorization:`Bearer ${tokenInLocalStorage}`
                }}
            );
            const payload = response.data.payload;
          
            setCurrentUser(payload);
            setIsLoading(false);
            setIsLoggedIn(true);
            // if(payload.role == "doctor"){
            //     setDoctorId(payload.doctorId);
            // }
            // if(payload.role == "patient"){
            //     setPatientId(payload.patientId);
            // }
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
            currentUser,
            isLoading,
            isLoggedIn,
            authenticateUser,
            handleLogout,
            setCurrentUser
            }}>
            {children}
        </AuthContext.Provider>
    )

    
}

export {AuthContext, AuthContextWrapper}