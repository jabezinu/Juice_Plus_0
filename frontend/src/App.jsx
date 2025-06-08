import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import About from './pages/About'
import Home from './pages/Home'
import Contact from './pages/Contact'

const App = () => {
  return (
    <div>
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
