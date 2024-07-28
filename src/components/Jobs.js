import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewapplications.css'; // Add your CSS file here

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/my_project/view_applications.php', {
      params: {
        job_seeker_id: 1 // Replace with the actual logged-in job seeker ID
      }
    })
    .then(response => {
      console.log(response.data); // Debugging: Check the response data
      if (Array.isArray(response.data) && response.data.length > 0) {
        setApplications(response.data);
      } else {
        console.log('No applications found or invalid response format');
        setApplications([]);
      }
    })
    .catch(error => {
      console.error('There was an error fetching the applications!', error);
    });
  }, []);

  return (
    <div className="applications-container">
      <h1>My Applications</h1>
      <div className="applications-grid">
        {applications.length > 0 ? (
          applications.map(application => (
            <div key={application.id} className="application-card">
              <h2>{application.title}</h2>
              <p><strong>Company:</strong> {application.company}</p>
              <p><strong>Location:</strong> {application.location}</p>
              <p><strong>Type:</strong> {application.type}</p>
              <p><strong>Applied On:</strong> {new Date(application.application_date).toLocaleDateString()}</p>
              <p><strong>Cover Letter:</strong> {application.cover_letter}</p>
            </div>
          ))
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewApplications;
