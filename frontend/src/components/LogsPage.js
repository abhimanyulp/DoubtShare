import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseServerUrl = "http://localhost:8080"

const LogsPage = () => {
  const [doubts, setDoubts] = useState([]);

  // Fetching doubts from the backend
  useEffect(() => {

    const fetchDoubts = async () => {
      try {
        const token = localStorage.getItem("token")

        //headers
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        };

        // Axios POST request with headers 
        axios.get(`${baseServerUrl}/doubtQuery/logs`, {
          headers: headers,
        })
          .then(response => {
            // Handle success
            console.log('Response:', response.data);
            const fetchedDoubts = response.data.logData
            setDoubts(fetchedDoubts);
            alert(response.data.message)
          })
          .catch(error => {
            // Handle error
            console.error('Error:', error);
          });

        
      } catch (error) {
        console.error('Error fetching doubts:', error);
      }
    };

    fetchDoubts();
  }, []);

  return (
    <div className="logs-page">
      <h2>My Doubts</h2>
      <ul>
        {doubts.map((doubt) => (
          <li key={doubt.id}>
            <h3>Subject: {doubt.subject}</h3>
            <p>Question: {doubt.question}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogsPage;
