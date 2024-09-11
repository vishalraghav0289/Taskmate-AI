import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home'; 
import Login from '../Pages/Login'; 
import Signup from '../Pages/Signup'; 
import About from '../Pages/About'; 

const AppRouter = () => {
  return (
    <Router basename="/">
    <Routes>
      <Route path="/" element={<Home />} />            {/* Home Route */}
      <Route path="/login" element={<Login />} />      {/* Login Route */}
      <Route path="/signup" element={<Signup />} />    {/* Signup Route */}
      <Route path="/about" element={<About />} />      {/* About Us Route */}
      {/* Add more routes as needed */}
    </Routes>
  </Router>
  );
};

export default AppRouter;
