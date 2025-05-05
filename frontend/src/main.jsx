import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { TravelProvider } from './context/TravelContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TravelProvider>
          <App />
        </TravelProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);