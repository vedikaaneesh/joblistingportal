import React, { useState } from 'react';
import axios from 'axios';
import './EmployerProfile.css'; // Ensure you create this CSS file for styling

function EmployerProfile() {
  const [profile, setProfile] = useState({
    company_name: '',
    contact: '',
    description: '',
    website: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/my_project/save_employer_profile.php', profile);
      if (response.data.success) {
        setMessage('Profile saved successfully!');
      } else {
        setMessage(`Failed to save profile: ${response.data.error}`);
      }
    } catch (err) {
      setMessage('Error saving profile.');
      console.error('Error saving profile:', err);
    }
  };

  return (
    <div className="employer-profile-container">
      <h1>Employer Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            name="company_name"
            value={profile.company_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            name="contact"
            value={profile.contact}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={profile.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={profile.website}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Save Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EmployerProfile;
