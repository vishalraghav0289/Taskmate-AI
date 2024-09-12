import React from 'react';
import { Provider } from 'react-redux'; // Import Provider from react-redux

import { store } from './Store/Store.js'; // Import the Redux store
import './index.css';
import Home  from "./Pages/Home"
import  About from "./Pages/About"
import  Signup from "./Pages/Signup.jsx"
import   Login from "./Pages/Login.jsx"
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout.jsx';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      children: [
          {
              path: "/login",
              element: (
                      <Login />

              ),
          },
          {
              path: "/Signup",
              element: (
                      <Signup />
              ),
          },
          {
            path:  "/About",
            element: (
              <About/>
            )
          }
         

      ],
  },
  
]);
  

 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)