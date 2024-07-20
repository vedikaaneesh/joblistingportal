import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const JobSeekerProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        contact: '',
        resume: '',
        skills: '',
        experience: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfile({ ...profile, resume: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', profile.name);
        formData.append('contact', profile.contact);
        formData.append('resume', profile.resume);
        formData.append('skills', profile.skills);
        formData.append('experience', profile.experience);

        // Log form data
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await axios.post('http://localhost/my_project/api/job_seeker_profile.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data); // Log the response from the backend
            setProfile({
                name: '',
                contact: '',
                resume: '',
                skills: '',
                experience: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Contact"
                name="contact"
                value={profile.contact}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                type="file"
                name="resume"
                onChange={handleFileChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Skills"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Experience"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '1rem' }}>
                Save Profile
            </Button>
        </Box>
    );
};

export default JobSeekerProfile;
