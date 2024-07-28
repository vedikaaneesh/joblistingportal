import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './employer.css'; // Ensure this file is present for styling
import axios from 'axios'; // Ensure axios is installed
import img3 from '../images/img3.png';

function Employer() {
    const [employerName, setEmployerName] = useState('');

    useEffect(() => {
        // Replace with the actual ID or method of identifying the current employer
        const employerId = 1; // Example ID; replace with dynamic value

        // Fetch employer data from the PHP API
        axios.get(`/api/get-employer.php?id=${employerId}`)
            .then(response => {
                setEmployerName(response.data.name);
            })
            .catch(error => {
                console.error("There was an error fetching the employer's data!", error);
            });
    }, []);

    return (
        <div className="dashboard-container">
            <div className="welcome-section">
                <img src={img3} alt="Employer" className="employer-image" />
                <h1>Welcome to Your Dashboard!</h1>
                <p>Hello, {employerName}! Manage your job listings and view applications with ease. Explore the tools and resources available to enhance your hiring process.</p>
            </div>
            <div className="cta-section">
                <Link to="/manage-listings" className="cta-button">Manage Job Listings</Link>
                <Link to="/view-applications" className="cta-button">View Applications</Link>
            </div>
        </div>
    );
}

export default Employer;
