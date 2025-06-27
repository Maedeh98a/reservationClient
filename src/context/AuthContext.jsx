import axios from 'axios';
import { useEffect } from 'react';
import { createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthContextWrapper = ({children})=>{
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function authenticateUser(){
        try {
            const tokenInLocalStorage = localStorage.getItem('authToken')
            // console.log(tokenInLocalStorage);
            const response = await axios.get("http://localhost:5005/auth/verify",
                {headers:{
                    authorization:`Bearer ${tokenInLocalStorage}`
                }}
            );
            
            setCurrentUser(response.data.payload);
            setIsLoading(false);
            setIsLoggedIn(true);
            
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
        <AuthContext.Provider value={{currentUser, isLoading, isLoggedIn, authenticateUser, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )

    
}

export {AuthContext, AuthContextWrapper}