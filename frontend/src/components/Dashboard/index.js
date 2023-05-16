import React from 'react';
import './dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="button-container">
          <Link to="/add-stock">
            <button className="dashboard-button">Add Stock</button>
          </Link>
          <Link to="/delete-stock">
            <button className="dashboard-button">Delete Stock</button>
          </Link>
          <Link to="/add-appointment">
            <button className="dashboard-button">Add Appointment</button>
          </Link>
          <Link to="/view-stock">
            <button className="dashboard-button">View Stock</button>
          </Link>  
        </div>
      </div>
    </div>
  );
};

export default Dashboard;