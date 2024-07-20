import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './JobSearch.css';

const JobSearch = () => {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [jobSeekerId] = useState(1); // Replace with actual job seeker ID from your authentication system

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost/my_project/search_jobs.php', {
                params: { keyword, location, type: jobType }
            });
            setJobs(response.data);
        } catch (error) {
            setError('Error fetching job listings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleApplyClick = (jobId) => {
        setSelectedJobId(jobId);
        setModalIsOpen(true);
    };

    const handleApplySubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost/my_project/api/apply_for_job.php', {
                job_id: selectedJobId,
                job_seeker_id: jobSeekerId,
                cover_letter: coverLetter,
            });
            if (response.data && response.data.message === "Application submitted successfully") {
                alert('Application submitted successfully!');
            } else {
                alert('Error: ' + (response.data.message || 'Unknown error'));
            }
            setModalIsOpen(false);
            setCoverLetter('');
        } catch (error) {
            console.error('Error applying for job:', error);
            alert('Error applying for job. Please try again.');
        }
    };

    return (
        <div className="job-search">
            <h2>Find Your Dream Job</h2>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label>Keyword:</label>
                    <input 
                        type="text" 
                        value={keyword} 
                        onChange={(e) => setKeyword(e.target.value)} 
                        placeholder="e.g. Software Engineer" 
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        placeholder="e.g. New York" 
                    />
                </div>
                <div className="form-group">
                    <label>Job Type:</label>
                    <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                        <option value="">Select Job Type</option>
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="contract">Contract</option>
                    </select>
                </div>
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <div className="job-results">
                {jobs.map(job => (
                    <div key={job.id} className="job-card">
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <p>{job.type}</p>
                        <p>{job.description}</p>
                        <button onClick={() => handleApplyClick(job.id)}>Apply Now</button>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Apply for Job"
            >
                <h2>Apply for Job</h2>
                <form onSubmit={handleApplySubmit}>
                    <div className="form-group">
                        <label>Cover Letter:</label>
                        <textarea 
                            value={coverLetter} 
                            onChange={(e) => setCoverLetter(e.target.value)} 
                            rows="4" 
                            cols="50"
                        />
                    </div>
                    <button type="submit">Submit Application</button>
                    <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
                </form>
            </Modal>
        </div>
    );
};

export default JobSearch;
