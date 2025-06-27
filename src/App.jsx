import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import DoctorProfile from './pages/DoctorProfile'
import PatientProfile from './pages/PatientProfile'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
 

  return (
    <>
     <nav>
      <h2>Our fullstack project</h2>
     </nav>
     <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/doctorProfile' element={
        <ProtectedRoute>
          <DoctorProfile/>
        </ProtectedRoute>
        }/>
      <Route path='/patientProfile' element={
        <ProtectedRoute>
        <PatientProfile/>
        </ProtectedRoute>
        }/>
      <Route path='/*' element={<NotFound/>}/>
      
   
     </Routes>
    </>
  )
}

export default App
