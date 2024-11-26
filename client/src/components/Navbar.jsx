// c:\Users\sreeja\OneDrive\Documents\GitHub Projects\Cyber-Detection\client\src\components\Navbar.jsx
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext'; // Import UserContext
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { logout } = useContext(UserContext); // Access logout function from context

  const handleLogout = async () => {
    await logout(); // Call the logout function
    window.location.href = '/'; // Redirect to home after logout
  };

  return (
    <div className="navbar">
      <nav className="navbar-container">
        {/* Show Back button only if not on Dashboard page */}
        {currentPath !== '/' && currentPath !== '/dashboard' && (
          <button onClick={() => navigate(-1)} className="nav-button">Back</button>
        )}
        {currentPath === '/' && ( // Show Home, Login, Register links on Home page
          <div className="navbar-left">
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
        )}

        {currentPath === '/dashboard' && ( // Show Logout button on Dashboard page
          <div className="logout-navbar-right">
            <button onClick={handleLogout} className="nav-button">Logout</button> {/* Logout button */}
          </div>
        )}
      </nav>
    </div>
  );
}