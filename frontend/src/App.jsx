import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Components
import MapDemo from './components/MapDemo';

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
      {/* Header */}
      <header
        style={{
          background: '#007bff',
          color: 'white',
          padding: '1rem',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
          Smart Tourist Safety & Incident Response System
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Real-time incident tracking and geofence monitoring
        </p>
      </header>

      {/* Navigation (optional, uncomment if you want a menu) */}
      {/*
      <nav style={{
        background: "#282c34",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ color: "white", fontWeight: "bold" }}>Tourist Safety App</div>
        <div style={{ position: "relative" }}>
          <button style={{
            background: "#61dafb",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            Menu ▼
          </button>
          <div style={{
            position: "absolute",
            top: "40px",
            right: 0,
            background: "white",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            minWidth: "120px"
          }}>
            <Link to="/" style={{ padding: "10px", textDecoration: "none", color: "black" }}>Home</Link>
            <Link to="/register" style={{ padding: "10px", textDecoration: "none", color: "black" }}>Register</Link>
          </div>
        </div>
      </nav>
      */}

      {/* Main */}
      <main style={{ height: 'calc(100vh - 80px)' }}>
        {/* Map at the top level */}
        <MapDemo />

        {/* Routes */}
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
      </main>
    </div>
  );
}

export default App;
