import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './Pages/Menu';
import Employee from './Pages/Employee';
import Navbar from './Components/Navbar';
import OutOfStock from './Pages/OutOfStock';
import Comment from './Pages/Comment';

const App = () => {
  return (
    <Navbar>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/out-of-stock" element={<OutOfStock />} />
        <Route path="/comment" element={<Comment />} />
      </Routes>
    </Navbar>
  );
};

export default App;
