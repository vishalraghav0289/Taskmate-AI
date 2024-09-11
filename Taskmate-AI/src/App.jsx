import React from 'react'
import './App.css'
import Home from './Pages/Home'
import AppRouter from './Router/Router'
import { BrowserRouter as Router } from 'react-router-dom';
function App() {


  return (
    <>
   <Router>
      <AppRouter />
    </Router>
    <Home/>
    </>
  )
}

export default App
