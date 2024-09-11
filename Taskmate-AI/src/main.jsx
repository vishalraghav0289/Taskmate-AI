import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import App from './App.jsx';
import './index.css';
import { store } from './Store/Store.js'; // Import the Redux store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap the App component in the Redux Provider */}
      <App />
    </Provider>
  </StrictMode>
);
