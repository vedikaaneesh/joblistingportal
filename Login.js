import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setError('Please fill in both username and password.');
            return;
        }

        const url = event.target.name === 'register' ? 'my_project/register.php' : 'my_project/login.php';

        try {
            const response = await fetch(`http://localhost/${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (result.success) {
                if (event.target.name === 'login') {
                    navigate('/welcome'); // Redirect to welcome on successful login
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
