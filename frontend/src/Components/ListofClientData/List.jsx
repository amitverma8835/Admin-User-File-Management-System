import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './List.css';
import { FaDownload, FaTrashAlt } from 'react-icons/fa';

function List() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState({ user: {}, files: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);
    return () => window.removeEventListener("resize", calculateItemsPerPage);
  }, []);

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(`https://tuition-app-suz1.onrender.com/api/user/${userId}`);
      const filesResponse = await axios.get(`https://tuition-app-suz1.onrender.com/api/files/${userId}`);
      setUserData({ user: userResponse.data, files: filesResponse.data });
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleDownload = (fileId) => {
    window.location.href = `https://tuition-app-suz1.onrender.com/api/download/${fileId}`;
  };

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`https://tuition-app-suz1.onrender.com/api/delete-file/${fileId}`);
      alert("File deleted successfully!");
      setUserData(prevState => ({
        ...prevState,
        files: prevState.files.filter(file => file._id !== fileId)
      }));
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file");
    }
  };

  const calculateItemsPerPage = () => {
    const screenHeight = window.innerHeight;
    const itemHeight = 120;
    const maxItems = Math.floor((screenHeight - 200) / itemHeight);
    setItemsPerPage(maxItems > 0 ? maxItems : 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.files.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='list'>
      <h2>📂 Uploaded Files</h2>
      <div className="client-data-list">
        <span>Data for User: {userData.user.name}</span>
      </div>

      <div className="uploaded-files">
        {currentItems.length > 0 ? (
          currentItems.map(file => (
            <div key={file._id} className="file-item">
              <div className="file-info">
                <h3>📌 TOPIC : {file.topic}</h3>
                <p>👨‍🏫 FACULTY : {file.Fac}</p>
                <p>📅 DATE : {new Date(file.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="file-actions">
                <button onClick={() => handleDownload(file._id)} className="download-btn">
                  <FaDownload /> Download
                </button>
                <button onClick={() => handleDelete(file._id)} className="delete-btn">
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>

      <button className='upload-btn' onClick={() => navigate(`/upload-page/${userId}`)}>📤 Upload New File</button>
    </div>
  );
}

export default List;
