// c:\Users\sreeja\OneDrive\Documents\GitHub Projects\Cyber-Detection\client\src\pages\Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navbar from '../components/Navbar'; // Import Navbar

export default function Dashboard() {
    const navigate = useNavigate();

    const handleclassifyClick = () => {
        navigate('/classification');  // Navigate to the scraping page
    };


    const handleDistilBertClick = () => {
        navigate('/distilbert-qa'); // Navigate to the DistilBertQA page
    };

    const handleViewDatasetClick = () => {
        navigate('/view-dataset');  // Navigate to the view dataset page
    };

    const handleExtractDataClick = () => {
        navigate('/extract-data');  // Navigate to the new extract data page
    };

    return (
        <div className='dashboard'>
            <Navbar /> {/* Add Navbar here */}
            <h1>Dashboard</h1>
            <div className="details">
                <h1>RAG Cyber Detection - Kondavathri Sreeja, 22BD1A6728</h1>
            </div>
            <div className='button-container'>
                <button onClick={handleViewDatasetClick}>View Database</button>
                <button onClick={handleExtractDataClick}>Scrape website from url</button>
                <button onClick={handleclassifyClick}>Cyber Annotation with spacy</button>
                <button onClick={handleDistilBertClick}>DistilBERT QA Model</button>
            </div>
        </div>
    );
}