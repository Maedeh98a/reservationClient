import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import DoctorProfile from './pages/DoctorProfile'
import PatientProfile from './pages/PatientProfile'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/footer'

function App() {
 

  return (
    <>
    
    <Navbar/>
     <Routes>
      <Route path="/" element={<Signup/>}/>
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
     <Footer/>
    </>
  )
}

export default App
