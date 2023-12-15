import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("token")
      if(token){
        setIsAuthenticated(true)
      }
  }, []);

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav>
      <div className="navbar-container">
        <h1>Doubt Share</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/create-doubt">Create Doubt</Link>
              </li>
              <li>
                <Link to="/logs">Logs</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
