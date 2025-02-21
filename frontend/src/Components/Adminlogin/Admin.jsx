import React, { useState } from 'react'
import './Admin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'  

function Admin() {
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const navigate = useNavigate();  // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const admin = await axios.post('https://studentshub-2.onrender.com/api/admin', {
                email: adminEmail,
                password: adminPassword
            });

            console.log(admin)

            navigate('/admin-dashboard');
            alert('Login Successfully');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='admin'>
            <form onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder='Enter your email' 
                    required 
                    value={adminEmail} 
                    onChange={(e) => setAdminEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder='Enter your password' 
                    required 
                    value={adminPassword} 
                    onChange={(e) => setAdminPassword(e.target.value)} 
                />
                <button type='submit'>Log In</button>
            </form>
        </div>
    );
}

export default Admin;
