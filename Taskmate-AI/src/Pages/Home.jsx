import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../Feature/auth/authSlice'; //  todo: Work on it add more  actions

const Home = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.modal.activeModal);

  const handleOpenModal = (modalType) => {
    dispatch(openModal(modalType));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500 text-white">
      <header className="bg-transparent border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Task Mate AI</div>
          <nav className="space-x-2">
            <button 
              onClick={() => handleOpenModal('about')}
              className="text-white hover:bg-white/20 transition-all duration-300 px-4 py-2 rounded"
            >
              About Us
            </button>
            <button 
              onClick={() => handleOpenModal('signup')}
              className="bg-cyan-500 text-white hover:bg-cyan-600 transition-all duration-300 px-4 py-2 rounded"
            >
              Sign Up
            </button>
            <button 
              onClick={() => handleOpenModal('login')}
              className="bg-white text-purple-700 hover:bg-purple-100 transition-all duration-300 px-4 py-2 rounded"
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Manage Tasks Smarter with AI
            </h1>
            <p className="text-xl mb-8 text-cyan-200 animate-fade-in-up animation-delay-300">
              Task Mate AI revolutionizes your productivity with intelligent task management
            </p>
            <Link 
              to="/signup"
              className="inline-block bg-white text-purple-700 hover:bg-purple-100 hover:scale-105 transition-all duration-300 px-8 py-3 rounded-full text-lg font-semibold"
            >
              Get Started
            </Link>
          </div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </section>

        <section className="py-20 bg-white/10 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon="✅"
                title="Smart Task Prioritization"
                description="AI-powered system that automatically prioritizes your tasks based on urgency and importance"
              />
              <FeatureCard
                icon="⏰"
                title="Time Estimation"
                description="Accurate time estimates for your tasks, helping you plan your day more effectively"
              />
              <FeatureCard
                icon="⚡"
                title="Productivity Insights"
                description="Gain valuable insights into your productivity patterns and receive personalized recommendations"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-purple-900 py-8">
        <div className="container mx-auto px-4 text-center text-purple-200">
          <p>&copy; 2023 Task Mate AI. All rights reserved.</p>
        </div>
      </footer>

      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-purple-700 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              {activeModal === 'about' && 'About Us'}
              {activeModal === 'signup' && 'Sign Up'}
              {activeModal === 'login' && 'Login'}
            </h2>
            <p className="mb-4">This feature is coming soon!</p>
            <button
              onClick={handleCloseModal}
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/20 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-cyan-100">{description}</p>
  </div>
);

export default Home;