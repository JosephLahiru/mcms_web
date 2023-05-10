import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.module.css';

function Dashboard() {
  return (
    // <div className='dash_body'>
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <nav className='navbar'>
          <ul className='nav-links'>
            <li>
              <Link to='/add_stock'>Add Stock</Link>
            </li>
            <li>
              <Link to='/view_stock'>View Stock</Link>
            </li>
            <li>
              <Link to='/delete_stock'>Delete Stock</Link>
            </li>
            <li>
              <Link to='/add_appointment'>Add Appointment</Link>
            </li>
          </ul>
        </nav>
      </div>
    // </div>
  );
}

export default Dashboard;
