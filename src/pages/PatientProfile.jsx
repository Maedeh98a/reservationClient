import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function PatientProfile() {
  const {currentUser, setCurrentUser, isLoading, isLoggedIn,handleLogout } = useContext(AuthContext);

console.log(currentUser)
  return (

    <div>PatientProfile
    <p></p>
    
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default PatientProfile