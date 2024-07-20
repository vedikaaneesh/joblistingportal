// src/components/Home.js
import React from 'react';
import JobSearch from './JobSearch';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Job Portal</h2>
      <p>This is the landing page.</p>
      <JobSearch />
    </div>
  );
};

export default Home;
