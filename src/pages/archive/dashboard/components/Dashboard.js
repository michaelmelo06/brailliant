import React from 'react';
import './Dashboard.css';
import { NavBarIn } from '../../home/components/NavBarIn';
import { Link } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <NavBarIn></NavBarIn>

      <h2 className="dashboard-title">Dashboard</h2>
      <div className="card-container">
        <Link to={'/analytics'} style={{ textDecoration: 'none' }}>
          <div className="card">
            <div className="dashboard-icon ">☒</div>
            <h3>Analytics</h3>
            <p>View Lesson Metrics</p>
          </div>
        </Link>

        <Link to={'/materials'} style={{ textDecoration: 'none' }}>
          <div className="card">
            <div className="dashboard-icon ">☒</div>
            <h3>Materials</h3>
            <p>View Course Materials</p>
          </div>
        </Link>

        <Link to={'/upload'} style={{ textDecoration: 'none' }}>
          <div className="card">
            <div className="dashboard-icon ">☒</div>
            <h3>Upload Materials</h3>
            <p>Upload Files</p>
          </div>
        </Link>

        <Link to={'/custom'} style={{ textDecoration: 'none' }}>
          <div className="card">
            <div className="dashboard-icon ">☒</div>
            <h3>Custom Text</h3>
            <p>Show Text to Braille</p>
          </div>
        </Link>





      </div>
    </div>
  );
};

export default Dashboard;