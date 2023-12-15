// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CreateDoubtPage from './components/CreateDoubtPage';
import LogsPage from './components/LogsPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/create-doubt" element={<CreateDoubtPage/>} />
          <Route path="/logs" element={<LogsPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
