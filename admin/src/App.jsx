import React from 'react'
import  { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Menu from './pages/Menu.jsx';
import Employee from './pages/Employee.jsx';

const App = () => {
  return (
    <div>
      <Sidebar />
      <Routes>
        {/* <Route path="/" element={<Menu />} />
        <Route path="/employee" element={<Employee />} /> */}
      </Routes>
    </div>
  )
}

export default App
