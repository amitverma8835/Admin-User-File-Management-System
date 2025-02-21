import React, { useEffect, useState } from "react";
import DashboardNav from "../DashboardNav/DashboardNav";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://studentshub-2.onrender.com/api/fetchingusername");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userId) => {
    console.log("Deleting User ID:", userId);  
  
    try {
      const response = await axios.delete(`https://studentshub-2.onrender.com/api/deleteUser/${userId}`);
      console.log("Delete response:", response.data);
      
      alert(`User deleted successfully!`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
      alert("Failed to delete user");
    }
  };
  
  return (
    <div className="dashboardpage">
      <DashboardNav />
      <h1>Clients</h1>

      <div className="clients-data">
        {users.map((user) => (
          <div key={user._id} className="client-name">
            <Link to={`/list/${user._id}`}>{user.name}</Link>
            <Link to={`/list/${user._id}`}>{new Date(user.createdAt).toLocaleDateString()}</Link>
            <button onClick={() => handleDelete(user._id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
