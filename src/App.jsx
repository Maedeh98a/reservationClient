import { useState } from 'react'
import './App.css'
// App.jsx or App.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import CreateDoctorProfile from './pages/CreateDoctorProfile'
import CreatePatientProfile from './pages/CreatePatientProfile'
function App() {
 

  return (
    <>
    
    <Navbar/>
    <ToastContainer />
     <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/createDoctor/:userId" element={<CreateDoctorProfile/>}/>
      <Route path="/createPatient/:userId" element={<CreatePatientProfile/>}/>
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
