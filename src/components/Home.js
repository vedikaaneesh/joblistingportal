import React from 'react';
import JobSearch from './JobSearch';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Your Future Job Portal</h2>
      <p>Discover the best job opportunities tailored just for you. Start your job search today and find your dream job with ease.</p>
      <JobSearch />
    </div>
  );
};

export default Home;
