import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployerNavbar from './components/EmployerNavbar';
import Home from './components/Home';
import Employer from './components/Employer';
import Jobs from './components/Jobs';
import JobListings from './components/JobListings';
import ApplicationViewing from './components/ApplicationViewing';
import EmployerProfile from './components/EmployerProfile';
import JobSeekerProfile from './components/JobSeekerProfile';
import Login from './components/Login';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  return (
    <Router>
      {isLoggedIn && (userType === 'jobseeker' ? <Navbar /> : <EmployerNavbar />)}
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />} />
        <Route path="/home" element={isLoggedIn && userType === 'jobseeker' ? <Home /> : <Navigate to="/login" />} />
        <Route path="/employer" element={isLoggedIn && userType === 'employer' ? <Employer /> : <Navigate to="/login" />} />
        <Route path="/manage-listings" element={<JobListings />} />
                <Route path="/view-applications" element={<ApplicationViewing />} />
        <Route path="/jobs" element={isLoggedIn && userType === 'jobseeker' ? <Jobs /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn && userType === 'jobseeker' ? <JobSeekerProfile /> : <Navigate to="/login" />} />
        <Route path="/job-listings" element={isLoggedIn && userType === 'employer' ? <JobListings /> : <Navigate to="/login" />} />
        <Route path="/application-viewing" element={isLoggedIn && userType === 'employer' ? <ApplicationViewing /> : <Navigate to="/login" />} />
        <Route path="/employer-profile" element={isLoggedIn && userType === 'employer' ? <EmployerProfile /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
