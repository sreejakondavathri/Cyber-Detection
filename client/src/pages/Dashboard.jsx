import {useContext} from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
    const {user,logout}=useContext(UserContext);
    const navigate=useNavigate();

    const handleLogout=async(event) => {
      event.preventDefault();

      const confirmLogout=window.confirm('Are you sure you want to logout?');
      if(confirmLogout){
        if(typeof logout==='function'){
            try {
                await logout(); // Call the logout function to clear user session
                
                // Redirect to home page after logout
                navigate('/'); 
            } catch (error) {
                console.error('Logout failed:', error.response?.data || error.message);
            }
        } else{
          console.error('Logout function is not available');
          
        }
      }
    };
  return (
    <div className='dashboard'>
      <nav className='navbar'>
        <a href='/' className='nav-button' onClick={handleLogout}>Logout</a>
      </nav>
      <h1>Dashboard</h1>
    </div>
  );
}




