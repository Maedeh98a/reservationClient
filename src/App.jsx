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
import Footer from './components/Footer'
import DoctorList from './pages/DoctorList'
import DoctorDetails from './pages/DoctorDetails'
function App() {
 

  return (
    <>
    
    <Navbar/>
     <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/doctors' element={<DoctorList/>}/>
      <Route path = '/doctors/:doctorId' element= {<DoctorDetails/>}/>
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
