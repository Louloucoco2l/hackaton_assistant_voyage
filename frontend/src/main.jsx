import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { TravelProvider } from './context/TravelContext';
import { BrowserRouter } from 'react-router-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TravelProvider>
        <App />
      </TravelProvider>
    </BrowserRouter>
  </React.StrictMode>
);
