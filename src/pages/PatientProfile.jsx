import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function PatientProfile() {
  const {currentUser, isLoading, isLoggedIn,handleLogout } = useContext(AuthContext);
   
    return (
      <div>Patient Profile
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
}

export default PatientProfile