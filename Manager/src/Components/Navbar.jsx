import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Employee', path: '/employee' },
    { name: 'Menu', path: '/' },
    { name: 'Out of Stock', path: '/out-of-stock' },
    { name: 'Comments', path: '/comment' },
    // { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg py-4 px-8 flex justify-between items-center">
      <div className="text-white text-2xl font-bold tracking-wider animate-pulse">
        Juice Plus
      </div>
      <ul className="flex space-x-8">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`text-lg font-semibold px-4 py-2 rounded transition duration-200 hover:bg-white hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-white ${
                location.pathname === item.path ? 'bg-white text-pink-500 shadow' : 'text-white'
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
