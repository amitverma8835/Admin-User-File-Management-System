import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FirstPage.css';

function FirstPage() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('https://studentshub-2.onrender.com/api/login', {
                email: loginEmail,
                password: loginPassword,
            });

            if (result.data.userId) {
                localStorage.setItem("userId", result.data.userId);
                await new Promise(resolve => setTimeout(resolve, 500));
                navigate('/client-page', { state: { userName: result.data.name } });
                alert("✅ Successfully logged in");
            } else {
                setError("❌ Login failed! No userId found.");
            }
        } catch (error) {
            setError(error.response?.data?.message || "❌ Something went wrong");
        }
    };

    return (
        <div className='firstpage'>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-logo">
                    <h1>Login</h1>
                </div>

                <input
                    type="email"
                    placeholder=' Enter your email'
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder=' Enter your Password'
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                
                <button type="submit">Log In</button>

                <div className="login-links">
                    <Link to={'/user-register'}> User Register here</Link>
                    <Link to={'/admin-login'}>Admin login here</Link>
                </div>
            </form>
        </div>
    );
}

export default FirstPage;
