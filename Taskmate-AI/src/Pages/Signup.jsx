import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false); // To track signup state
  const navigate = useNavigate(); // To redirect to home page

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSignedUp(true); // Trigger the state to show the warning message
  };

  const handleMoveAhead = () => {
    navigate('/'); // Redirect to home page for now
  };

  return (
    <div className="bg-white text-purple-700 max-w-md mx-auto p-8 rounded-lg shadow-lg">
      {!isSignedUp ? (
        <>
          <h2 className="text-3xl font-bold mb-4">Sign Up for Task Mate AI</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-600 transition-all"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 hover:underline">
              Log in
            </Link>
          </p>
        </>
      ) : (
        <div className="text-center">
          <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-lg">
            <p className="font-bold">We're working on it!</p>
            <p>The backend for this service is still under development. You can proceed, but please note:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Currently, we're using your device's local storage to manage tasks.</li>
              <li>Data stored locally might be lost if you clear your browser or switch devices.</li>
            </ul>
            <p className="mt-2">Thank you for understanding as we work to improve!</p>
          </div>
          <button
            onClick={handleMoveAhead}
            className="w-full mt-4 bg-cyan-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-cyan-600 transition-all duration-300"
          >
            Move Ahead
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;