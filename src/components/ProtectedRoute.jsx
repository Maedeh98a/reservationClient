import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {

    const {isLoading, isLoggedIn} = useContext(AuthContext);

    if(isLoading){
        return <p>
            Loading ...
        </p>
    }
    if(!isLoggedIn){
        return <Navigate to='/login'/>
    }
  return (
   children
  )
}

export default ProtectedRoute