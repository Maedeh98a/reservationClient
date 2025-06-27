import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function DoctorProfile() {
  const {currentUser, isLoading, isLoggedIn,handleLogout } = useContext(AuthContext);
  
  return (
    <div>DoctorProfile
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DoctorProfile