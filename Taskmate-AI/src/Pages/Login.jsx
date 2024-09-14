import React from 'react';

const Login = () => {
  return (
    <div className="bg-white text-purple-700 max-w-md mx-auto p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Sign In to Task Mate AI</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            type="email"
            id="email"
            placeholder="Enter your email"
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
          />
        </div>
        <button
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-600 transition-all"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Don't have an account?{' '}
        <a href="/signup" className="text-purple-500 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
