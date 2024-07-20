import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobListings.css'; // Ensure this file exists and is correctly imported

function JobListings() {
  const [job, setJob] = useState({ id: '', title: '', company: '', location: '', type: '', description: '' });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost/my_project/get_jobs.php');
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/my_project/add_job.php', job);
      if (response.data.success) {
        setMessage('Job added successfully!');
        setJobs([...jobs, job]);
        setJob({ id: '', title: '', company: '', location: '', type: '', description: '' });
      } else {
        setMessage(`Failed to add job: ${response.data.error}`);
      }
    } catch (err) {
      setMessage('Error adding job.');
      console.error('Error adding job:', err);
    }
  };

  const handleEditJob = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/my_project/edit_job.php', job);
      if (response.data.success) {
        setMessage('Job updated successfully!');
        setJobs(jobs.map(j => (j.id === job.id ? job : j)));
        setJob({ id: '', title: '', company: '', location: '', type: '', description: '' });
        setEditing(false);
      } else {
        setMessage(`Failed to update job: ${response.data.error}`);
      }
    } catch (err) {
      setMessage('Error updating job.');
      console.error('Error updating job:', err);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await axios.post('http://localhost/my_project/delete_job.php', { id: jobId });
      if (response.data.success) {
        setMessage('Job deleted successfully!');
        setJobs(jobs.filter(j => j.id !== jobId));
      } else {
        setMessage(`Failed to delete job: ${response.data.error}`);
      }
    } catch (err) {
      setMessage('Error deleting job.');
      console.error('Error deleting job:', err);
    }
  };

  const handleEditClick = (job) => {
    setJob(job);
    setEditing(true);
  };

  const handleFormSubmit = (e) => {
    if (editing) {
      handleEditJob(e);
    } else {
      handleAddJob(e);
    }
  };

  return (
    <div className="job-listings-container">
      <h1>{editing ? 'Edit Job Listing' : 'Add Job Listing'}</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={job.company}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={job.type}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">{editing ? 'Update Job' : 'Add Job'}</button>
      </form>
      {message && <p>{message}</p>}

      {/* Job Cards for editing */}
      <h2>Job Listings</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.type}</p>
            <p>{job.description}</p>
            <button onClick={() => handleEditClick(job)}>Edit</button>
            <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No job listings available.</p>
      )}
    </div>
  );
}

export default JobListings;
