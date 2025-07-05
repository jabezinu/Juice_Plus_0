import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Manege from './pages/Manege'
import ContactUs from './pages/ContactUs'
import Navbar from './components/Navbar'
import About from './pages/About'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        {/* <Route path="/manage" element={<Manege />} /> */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
      </Routes>      
    </div>
  )
}

export default App
