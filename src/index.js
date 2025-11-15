import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Catch any unhandled errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Optionally display a user-friendly error message
  if (!document.getElementById('error-overlay')) {
    const errorOverlay = document.createElement('div');
    errorOverlay.id = 'error-overlay';
    errorOverlay.style.position = 'fixed';
    errorOverlay.style.top = '0';
    errorOverlay.style.left = '0';
    errorOverlay.style.width = '100%';
    errorOverlay.style.padding = '20px';
    errorOverlay.style.backgroundColor = '#ff5555';
    errorOverlay.style.color = 'white';
    errorOverlay.style.zIndex = '9999';
    errorOverlay.style.textAlign = 'center';
    errorOverlay.innerText = 'An error occurred. Check the console for details.';
    document.body.appendChild(errorOverlay);
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
