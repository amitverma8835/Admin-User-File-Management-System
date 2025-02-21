import React from "react";
import { useLocation, useNavigate } from "react-router";
import { FiLogOut } from "react-icons/fi"; 
import "./DashboardNav.css";

function DashboardNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("userId"); 
    navigate("/"); 
  };

  return (
    <div className='dashboardnav'>
      <div className="admin-name">
        <h2>{`${userName} Dashboard`}</h2>
      </div>

      <div className="right-section">
        <h2 className="web-logo">StudentsHub-IEMA</h2>
        <FiLogOut className="logout-icon" onClick={handleLogout} size={24} />
      </div>
    </div>
  );
}

export default DashboardNav;
