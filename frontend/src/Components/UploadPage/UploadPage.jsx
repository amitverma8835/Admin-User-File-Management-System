import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './UploadPage.css';

function UploadPage() {
  const { userId } = useParams(); 
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState(null);
  const [Fac, setFac] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
        alert("Please select a file before submitting.");
        return;
    }

    if (!topic.trim() || !Fac.trim()) {
        alert("Please fill all fields.");
        return;
    }

    const formData = new FormData();
    formData.append("topic", topic);
    formData.append("file", file);
    formData.append("Fac", Fac);
    formData.append("userId", userId);

    try {
        const result = await axios.post(
            'https://tuition-app-suz1.onrender.com/api/fileupload',
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        alert('File uploaded successfully');
        navigate('/admin-dashboard');

        setTopic('');
        setFac('');
        setFile(null);
        document.getElementById("fileInput").value = "";

    } catch (error) {
        console.error('Error:', error.response?.data?.message || error.message);
        alert(`Error: ${error.response?.data?.message || 'Something went wrong'}`);
    }
  };

  return (
    <div className='uploadpage'>
      <h2>📤 Upload File for User ID: {userId}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Topic Name" 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Faculty Name" 
          value={Fac} 
          onChange={(e) => setFac(e.target.value)} 
          required 
        />
        
        <label htmlFor="fileInput" className="file-label">📂 Choose File</label>
        <input 
          type="file"
          id="fileInput"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={(e) => setFile(e.target.files[0])} 
          required 
        />
        <p className="file-name">{file ? file.name : "No file chosen"}</p>

        <button type="submit">🚀 Upload</button>
      </form>
    </div>
  );
}

export default UploadPage;
