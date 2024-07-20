import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApplicationViewing.css'; // Add a CSS file for styling

function ApplicationViewing() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost/my_project/get_applications.php');
        if (response.data.success) {
          setApplications(response.data.data);
        } else {
          setError('Failed to load applications.');
        }
      } catch (err) {
        setError('Error fetching data.');
        console.error('There was an error fetching the applications!', err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="applications-container">
      <h1>Job Applications</h1>
      {error && <p>{error}</p>}
      <div className="cards-container">
        {applications.map((app) => (
          <div className="application-card" key={app.id}>
            <h2>Application ID: {app.id}</h2>
            <p><strong>Job ID:</strong> {app.job_id}</p>
            <p><strong>Job Seeker ID:</strong> {app.job_seeker_id}</p>
            <p><strong>Application Date:</strong> {app.application_date}</p>
            <p><strong>Cover Letter:</strong></p>
            <p>{app.cover_letter}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationViewing;
