import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Menu from './Pages/Menu';
import Employee from './Pages/Employee';
import Navbar from './Components/Navbar';
import OutOfStock from './Pages/OutOfStock';
import Comment from './Pages/Comment';
import Login from './Pages/Login';
import useAuthStore from './stores/authStore';
import ChangePassword from './Pages/ChangePassword';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Navbar>
              <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/out-of-stock" element={<OutOfStock />} />
                <Route path="/comment" element={<Comment />} />
                <Route path="/change-password" element={<ChangePassword />} />
              </Routes>
            </Navbar>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
