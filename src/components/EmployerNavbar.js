import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function EmployerNavbar() {
  return (
    <nav className="navbar">
      <h1>Employer Portal</h1>
      <ul>
        <li>
          <Link to="/employer">Home</Link>
        </li>
        <li>
          <Link to="/job-listings">Job Listings</Link>
        </li>
        <li>
          <Link to="/application-viewing">Application Viewing</Link>
        </li>
        <li>
          <Link to="/employer-profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default EmployerNavbar;
