import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import About from './pages/About'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </div>
  )
}

export default App
