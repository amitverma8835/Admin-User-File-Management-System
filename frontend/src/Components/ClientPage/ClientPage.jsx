import React, { useEffect, useState } from 'react';
import DashboardNav from '../DashboardNav/DashboardNav';
import axios from 'axios';
import './ClientPage.css';

function ClientPage() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axios.get(`https://tuition-app-suz1.onrender.com/api/user/${userId}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => console.log('Error fetching data:', error));
    }
  }, [userId]);

  useEffect(() => {
    const calculateItemsPerPage = () => {
      const itemHeight = 180; 
      const navbarHeight = 80; 
      const availableHeight = window.innerHeight - navbarHeight - 40; 
      const items = Math.floor(availableHeight / itemHeight); 
      setItemsPerPage(items > 0 ? items : 1);
    };

    calculateItemsPerPage();
    window.addEventListener('resize', calculateItemsPerPage);

    return () => {
      window.removeEventListener('resize', calculateItemsPerPage);
    };
  }, []);

  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = userData.slice(startIndex, startIndex + itemsPerPage);

  const handleDownload = (fileId) => {
    window.location.href = `https://tuition-app-suz1.onrender.com/api/download/${fileId}`;
  };

  return (
    <div className='client-page'>
      <DashboardNav />
      
      <div className="content">
        {currentItems.length > 0 ? (
          currentItems.map((file, index) => (
            <div key={index} className="client-data-box">
              <h3>📌 Topic: <span>{file.topic || "No Topic"}</span></h3>
              <h3>📅 Date: <span>{file.createdAt ? new Date(file.createdAt).toLocaleDateString() : "No Date"}</span></h3>
              <h3>👨‍🏫 Faculty: <span>{file.Fac || "No Faculty Assigned"}</span></h3>
              <button onClick={() => handleDownload(file._id)}>⬇ Download</button>
            </div>
          ))
        ) : (
          <h3 className="no-data">No data available</h3>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ⬅ Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next ➡
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientPage;
