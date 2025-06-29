import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/home" element={<Home />} />
      </Routes>      
    </div>
  )
}

export default App
