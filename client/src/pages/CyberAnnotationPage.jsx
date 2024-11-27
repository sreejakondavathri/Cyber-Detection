import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './CyberAnnotationPage.css';

export default function CyberAnnotationPage() {
    const [inputText, setInputText] = useState('');
    const [predictedEntities, setPredictedEntities] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        setError('');
    };

    const handleAnnotate = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("Annotate button clicked"); // Debug log

        // Check if input text is provided
        if (!inputText) {
            console.error("No input text provided");
            setError("Please enter text to annotate.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5001/api/classify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText }),
            });

            console.log("Response received:", response); // Debug log
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to annotate text');
            }

            const data = await response.json();
            console.log("Data received:", data); // Debug log

            // Ensure this matches your backend response
            if (data.word_entity_mapping) {
                setPredictedEntities(data.word_entity_mapping); // Update state with the correct data structure
            } else {
                setError("No entities found in response.");
            }
        } catch (err) {
            setError(err.message || 'An error occurred while annotating');
            console.error("Error during annotation:", err); // Debug log
        }
    };

    return (
        <div className='cyber-annotation-page'>
            <Navbar />
            <h1>Cyber Attribution Annotation </h1>
            <textarea
                rows="10"
                cols="50"
                placeholder="Enter text to annotate..."
                value={inputText}
                onChange={handleInputChange}
            />
            <button type="button" onClick={handleAnnotate}>Annotate</button> {/* Ensure button type is button */}
            {error && <p className="error">{error}</p>}
            {Object.keys(predictedEntities).length > 0 && (
                <div>
                    <h2>Predicted Entities:</h2>
                    <ul>
                        {Object.entries(predictedEntities).map(([word, entity], index) => (
                            <li key={index}>{word}: {entity}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}