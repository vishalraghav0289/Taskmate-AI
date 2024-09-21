import React from 'react';
import './index.css';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { store } from './Store/Store.js'; // Import the Redux store
import './index.css';
import Home from "./Pages/Home";
import About from "./Pages/About";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TaskList from "../src/InnerPages/TaskList.jsx"
import TaskManagement from './InnerPages/TaskManagament.jsx';
import { TaskProvider } from './Contexs/TaskContex.jsx';


// Placeholder components for other pages

const AI = () => <div>AI Page</div>;
const Roadmap = () => <div>Roadmap Page</div>;
const StartMyDay = () => <div>Start My Day Page</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/tasklist",
    element: <TaskList />,
  },
  {
    path: "/taskmanagement",
    element: <TaskManagement />,
  },
  {
    path: "/ai",
    element: <AI />,
  },
  {
    path: "/roadmap",
    element: <Roadmap />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <TaskProvider> {/* Wrap your entire application with TaskProvider */}
        <RouterProvider router={router} />
      </TaskProvider>
    </Provider>
  </React.StrictMode>
);