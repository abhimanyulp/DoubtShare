import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from "react-router-dom";


const baseServerUrl = "https://doubt-share-sho3.onrender.com"

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [language, setLanguage] = useState('');
    const [classGrade, setClassGrade] = useState('');
    const [type, setType] = useState('');
    const [showSubjectField, setShowSubjectField] = useState(false);
    const [subject, setSubject] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Registering with:', email, password, language, classGrade, type, subject);

        try {
            const res = await axios.post(`${baseServerUrl}/user/register`, {
                email, password, language, classGrade, type, subject
            })
            alert(res.data.msg)
            navigate('/login');
        } catch (error) {
            console.log(error.message)
            alert("Something wrong! / User already exists")
        }

        // Reset the form fields after submission
        setEmail('');
        setPassword('');
        setLanguage('');
        setClassGrade('');
        setType('');
        setSubject('');
        setShowSubjectField(false);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
        if (e.target.value === 'Tutor') {
            setShowSubjectField(true);
        } else {
            setShowSubjectField(false);
            setSubject(''); // Reset subject field if type is not Tutor
        }
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    return (
        <div className="register-page">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="language">Language:</label>
                    <input
                        type="text"
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="classGrade">Class/Grade:</label>
                    <input
                        type="text"
                        id="classGrade"
                        value={classGrade}
                        onChange={(e) => setClassGrade(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type (Student/Tutor):</label>
                    <select id="type" value={type} onChange={handleTypeChange} required>
                        <option value="">Select Type</option>
                        <option value="Student">Student</option>
                        <option value="Tutor">Tutor</option>
                    </select>
                </div>
                {showSubjectField && (
                    <div className="form-group">
                        <label htmlFor="subject">Subject:</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={handleSubjectChange}
                            required
                        />
                    </div>
                )}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;

