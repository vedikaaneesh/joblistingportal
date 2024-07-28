import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login({ setIsLoggedIn, setUserType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserTypeLocal] = useState('jobseeker');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password || !userType) {
      setError('Please fill in all fields.');
      return;
    }

    const url = event.target.name === 'register' ? 'my_project/register.php' : 'my_project/login.php';

    try {
      const response = await fetch(`http://localhost/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, user_type: userType }),
      });

      const result = await response.json();

      if (result.success) {
        if (event.target.name === 'login') {
          setIsLoggedIn(true);
          setUserType(userType); // Set the user type in the parent state
          navigate(userType === 'jobseeker' ? '/home' : '/employer'); // Redirect to home or employer page based on user type
        }
        setMessage(`${event.target.name === 'register' ? 'Registration' : 'Login'} successful!`);
        setError('');
      } else {
        setMessage('');
        setError(`${event.target.name === 'register' ? 'Registration' : 'Login'} failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('');
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login / Register</h2>
      <form>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>User Type:</label>
          <select
            value={userType}
            onChange={(e) => setUserTypeLocal(e.target.value)}
            required
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <div className="button-group">
          <button type="button" name="login" onClick={handleSubmit}>Login</button>
          <button type="button" name="register" onClick={handleSubmit}>Register</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
