import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Blurred background */}
      <div className="absolute inset-100 bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500 backdrop-blur-md"></div>
      
      {/* Login form */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Login to Task Mate AI</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
            Don't have an account? Sign up
          </Link>
        </div>
        {showMessage && (
          <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            <p className="font-bold">Sorry, we are under work</p>
            <p>The login functionality is not available at the moment. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;