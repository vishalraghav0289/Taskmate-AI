'use client'

import { useState } from 'react'
// shadcn/ui components for consistent, accessible UI elements
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
// Lucide React icons for a cohesive icon set
import { CheckCircle, Clock, Zap } from 'lucide-react'

export default function Home() {
  // State to handle which modal is currently open
  const [activeModal, setActiveModal] = useState(null)

  // Function to open a specific modal
  const handleOpenModal = (modalType) => setActiveModal(modalType)
  
  // Function to close the active modal
  const handleCloseModal = () => setActiveModal(null)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500 text-white">
      <header className="bg-transparent border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Task Mate AI</div>
          <nav className="space-x-2">
            {/* Button components from shadcn/ui for consistent styling */}
            <Button 
              onClick={() => handleOpenModal('about')}
              variant="ghost"
              className="text-white hover:bg-white/20 transition-all duration-300"
            >
              About Us
            </Button>
            <Button 
              onClick={() => handleOpenModal('signup')}
              className="bg-cyan-500 text-white hover:bg-cyan-600 transition-all duration-300"
            >
              Sign Up
            </Button>
            <Button 
              onClick={() => handleOpenModal('login')}
              className="bg-white text-purple-700 hover:bg-purple-100 transition-all duration-300 animate-pulse"
            >
              Login
            </Button>
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
            <Button 
              size="lg" 
              onClick={() => handleOpenModal('signup')}
              className="bg-white text-purple-700 hover:bg-purple-100 hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-600"
            >
              Get Started
            </Button>
          </div>
          {/* Animated background elements */}
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
                icon={<CheckCircle className="w-12 h-12 text-cyan-300" />}
                title="Smart Task Prioritization"
                description="AI-powered system that automatically prioritizes your tasks based on urgency and importance"
              />
              <FeatureCard
                icon={<Clock className="w-12 h-12 text-cyan-300" />}
                title="Time Estimation"
                description="Accurate time estimates for your tasks, helping you plan your day more effectively"
              />
              <FeatureCard
                icon={<Zap className="w-12 h-12 text-cyan-300" />}
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

      {/* Dialog component from shadcn/ui for accessible modal dialogs */}
      <Dialog open={activeModal === 'login'} onOpenChange={() => activeModal === 'login' && handleCloseModal()}>
        <DialogContent className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <DialogHeader>
            <DialogTitle>Login Coming Soon</DialogTitle>
            <DialogDescription className="text-cyan-200">
              We're working hard to bring you a seamless login experience. Check back soon!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleCloseModal} className="bg-white text-purple-700 hover:bg-purple-100">Close</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === 'signup'} onOpenChange={() => activeModal === 'signup' && handleCloseModal()}>
        <DialogContent className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <DialogHeader>
            <DialogTitle>Sign Up Coming Soon</DialogTitle>
            <DialogDescription className="text-cyan-200">
              We're excited to have you join us! Sign up functionality will be available shortly.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleCloseModal} className="bg-white text-purple-700 hover:bg-purple-100">Close</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === 'about'} onOpenChange={() => activeModal === 'about' && handleCloseModal()}>
        <DialogContent className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <DialogHeader>
            <DialogTitle>About Task Mate AI</DialogTitle>
            <DialogDescription className="text-cyan-200">
              Task Mate AI is a cutting-edge task management platform that leverages artificial intelligence to help you organize, prioritize, and complete your tasks more efficiently than ever before.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleCloseModal} className="bg-white text-purple-700 hover:bg-purple-100">Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Reusable component for feature cards
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-cyan-100">{description}</p>
    </div>
  )
}