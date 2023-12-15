import React, { useState } from 'react';
import axios from 'axios';

const baseServerUrl = "http://localhost:8080"

const CreateDoubtPage = () => {
    const [subject, setSubject] = useState('');
    const [question, setQuestion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Creating doubt with:', subject, question);

        try {

            const token = localStorage.getItem("token")

            //headers
            const headers = {
                'Content-Type': 'application/json', 
                'Authorization': `${token}`, 
            };

            // request body
            const requestBody = {
                subject, question
            };

            // Axios POST request with headers and body
            axios.post(`${baseServerUrl}/doubtQuery/create`, requestBody, {
                headers: headers,
            })
                .then(response => {
                    // Handle success
                    console.log('Response:', response.data);
                    alert(response.data.message)
                })
                .catch(error => {
                    // Handle error
                    console.error('Error:', error);
                });

            
        } catch (error) {

        }

        // Reset the form fields after submission
        setSubject('');
        setQuestion('');
    };

    return (
        <div className="create-doubt-page">
            <h2>Create Doubt</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="question">Question:</label>
                    <textarea
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Create Doubt</button>
            </form>
        </div>
    );
};

export default CreateDoubtPage;
