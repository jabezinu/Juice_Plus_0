import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from './Pages/Menu'
import Employee from './Pages/Employee'
import Navbar from './Components/Navbar'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/employee" element={<Employee />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  )
}

export default App
