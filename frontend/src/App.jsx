import React from 'react';
import MapDemo from './components/MapDemo';
import './App.css';

function App() {
  return (
    <div className="app">
      <header style={{
        background: '#007bff',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
          Smart Tourist Safety & Incident Response System
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Real-time incident tracking and geofence monitoring
        </p>
      </header>
      
      <main style={{ height: 'calc(100vh - 80px)' }}>
        <MapDemo />
      </main>
    </div>
  );
}

export default App;
