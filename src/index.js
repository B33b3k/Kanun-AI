import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import './index.css'; 
import App from './App'; 
import reportWebVitals from './reportWebVitals'; 
import LandingPage from './landingPage'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ChatPage from './pages/ChatPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<App />} />
        <Route path="/chat_page" element={<ChatPage />} />

        {/* Add more routes here */}
      </Routes>
    </Router>
  </React.StrictMode>
);

// Register the service worker for PWA functionality
serviceWorkerRegistration.register();

// Optionally, log web vitals for performance monitoring
reportWebVitals();
