import React from 'react';
import ReactDOM from 'react-dom/client'; // make sure you're using the correct import
import './index.css';
import App from './App';

// Render the app using createRoot
const root = document.getElementById('root'); // Get the div with id="root"

if (root) {
  const rootElement = ReactDOM.createRoot(root); // Create the root
  rootElement.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found!');
}

