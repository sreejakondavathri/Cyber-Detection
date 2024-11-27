import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './QAModelPage.css';

const DistilBertQA = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setError(''); // Reset error message
        try {
            const response = await fetch('http://127.0.0.1:5000/api/qa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to get answer from the backend.');
            }

            const data = await response.json();
            console.log("Data received from backend:", data); // Debug log
            setAnswer(data.answer); // Display the answer from the backend
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to get answer. Please try again.'); // Set error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='qabox'>
            <Navbar />
            <h2 >DistilBERT Question Answering</h2>
            <input
                type="text"
                placeholder="Ask your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Loading...' : 'Get Answer'}
            </button>
            {error && <div className="error-message">{error}</div>}
            <div className="answer-section">
                {answer && <p>{answer}</p>}
            </div>
        </div>
    );
};

export default DistilBertQA;