import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from './Pages/Menu'
import Employee from './Pages/Employee'
import Navbar from './Components/Navbar'
import OutOfStock from './Pages/OutOfStock'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/out-of-stock" element={<OutOfStock />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  )
}

export default App
