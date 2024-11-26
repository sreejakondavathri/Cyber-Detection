// c:\Users\sreeja\OneDrive\Documents\GitHub Projects\Cyber-Detection\client\src\pages\Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navbar from '../components/Navbar'; // Import Navbar

export default function Dashboard() {
    const navigate = useNavigate();

    const handleScrapingClick = () => {
        navigate('/scraping');
    };

    const handleCyberAnnotationClick = () => {
        navigate('/cyber-annotation');
    };

    const handleQAModelClick = () => {
        navigate('/qa-model');
    };

    return (
        <div className='dashboard'>
            <Navbar /> {/* Add Navbar here */}
            <h1>Dashboard</h1>
            <div className='button-container'>
                <button onClick={handleScrapingClick}>Scraping Website</button>
                <button onClick={handleCyberAnnotationClick}>Cyber Annotation</button>
                <button onClick={handleQAModelClick}>Q/A Model</button>
            </div>
        </div>
    );
}