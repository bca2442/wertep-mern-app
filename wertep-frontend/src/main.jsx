import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Do NOT import express, path, or mongoose here!
// Those belong in wertep-server/server.mjs

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);