import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import EmergencyContacts from './pages/Emergency';
import TripDetails from './pages/TripDetails';
import KycOtpPage from './pages/KycOtpPage';
import Admin from './pages/Admin';
import DigitalTouristID from './pages/DigitalTouristId';
import SafeTravels from './pages/Safe';
import TouristDetails from './pages/IdCard';
import AdminLogin from './pages/adminlogin';

function App() {
  return (
    <div className="app">
      {/* Routes - Each page handles its own layout and styling */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emergency" element={<EmergencyContacts />} />
        <Route path="/tripdetails" element={<TripDetails />} />
        <Route path="/KycOtpPage" element={<KycOtpPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/DigitalTouristId" element={<DigitalTouristID />} />
        <Route path="/safe" element={<SafeTravels />} />
        <Route path="/touristdetails" element={<TouristDetails />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
