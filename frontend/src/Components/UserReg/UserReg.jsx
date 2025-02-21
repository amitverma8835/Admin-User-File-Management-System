import React, { useState } from 'react'
import './UserReg.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UserReg() {
  const [userName,setUserName] = useState('');
  const [userEmail,setUserEmail]=  useState('');
  const [userPassword,setUserPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const result = await axios.post('https://tuition-app-suz1.onrender.com/api/signup',{
        name: userName, 
        email: userEmail, 
        password: userPassword
      },
      { headers: { "Content-Type": "application/json" } } );
      console.log(result.data);
      alert(`Thank Your For Registerd ${userName}`);
      navigate('/');
    }catch (error) {
      console.error('Error submitting the form:', error.message || 'Unknown error');
      setError(error.response?.data?.message || 'Something went wrong');
    }
 
  }
  return (
    <div className='userReg'>
      <form onSubmit={handleSubmit}>
      <h2>Register</h2>
        <input type="text" name="name" id="name" placeholder='Enter your name' required value={userName} onChange={(e)=>setUserName(e.target.value)} />
        <input type="email" name="email" id="email" placeholder='Enter your email' required value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} />
        <input type="password" name="password" id="password" placeholder='Enter your password' required value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} />
        <button type='submit'>Submit</button>

        <div className="reg-link">
        <Link to={'/'}>already have registerd</Link>
      </div>
      </form>

      
    </div>
  )
}

export default UserReg
