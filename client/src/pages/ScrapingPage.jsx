import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrapingPage.css';
import Navbar from '../components/Navbar';

export default function ScrapingPage() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle URL input
    const handleInputChange = (e) => {
        setUrl(e.target.value);
        setError('');
    };

    // Submit form to scrape URL
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/auth/api/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ website_url: url }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to scrape URL');
            }

            navigate('/scraped-files'); // Navigate to scraped files page after success
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="scraping-page">
            <h1>Scraping Website</h1>
            <div className="scraping-form-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="url"
                        placeholder="Enter Website URL"
                        value={url}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Scraping...' : 'Scrape'}
                    </button>
                </form>
                {error && <p className="scraping-error">{error}</p>}
            </div>
        </div>
    );
}