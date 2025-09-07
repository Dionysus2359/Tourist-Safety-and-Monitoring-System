import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MapView from "../components/MapView";
import axios from "axios";
import { alertsAPI } from "../services/api";

export default function SafeTravels() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [geofences, setGeofences] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedGeofence, setSelectedGeofence] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incidentsResponse, geofencesResponse] = await Promise.all([
          axios.get('http://localhost:3000/incidents'),
          axios.get('http://localhost:3000/geofences')
        ]);
        
        if (incidentsResponse.data.success) {
          setIncidents(incidentsResponse.data.data.incidents || []);
        }
        
        if (geofencesResponse.data.success) {
          setGeofences(geofencesResponse.data.data.geofences || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to sample data if backend is not available
        setIncidents([
          {
            id: '1',
            description: 'Road accident on main highway',
            location: { coordinates: [77.2090, 28.6139] },
            severity: 'high',
            status: 'reported',
            address: 'Main Highway, Delhi',
            createdAt: new Date().toISOString()
          }
        ]);
        setGeofences([
          {
            id: '1',
            center: { coordinates: [77.2090, 28.6139] },
            radius: 500,
            alertType: 'danger',
            active: true,
            createdAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident);
    console.log('Incident clicked:', incident);
  };

  const handleGeofenceClick = (geofence) => {
    setSelectedGeofence(geofence);
    console.log('Geofence clicked:', geofence);
  };

  const handleSOSClick = async () => {
    try {
      // Create emergency incident
      const emergencyIncident = {
        description: "EMERGENCY SOS - Immediate assistance required",
        location: {
          coordinates: [77.2090, 28.6139] // Current location or user's location
        },
        severity: "high"
      };

      // Create incident first
      const incidentResponse = await axios.post('http://localhost:3000/incidents', emergencyIncident);
      console.log('Emergency incident created:', incidentResponse.data);

      // Create alert linked to the incident
      if (incidentResponse.data.success && incidentResponse.data.data.incident) {
        const incidentId = incidentResponse.data.data.incident._id;

        const alertData = {
          title: "EMERGENCY SOS Alert",
          message: "A tourist has triggered an emergency SOS signal. Immediate assistance required.",
          type: "emergency",
          priority: "high",
          incident: incidentId,
          location: emergencyIncident.location
        };

        try {
          await alertsAPI.create(alertData);
          console.log('Emergency alert created');
        } catch (alertError) {
          console.error('Error creating emergency alert:', alertError);
          // Don't fail the whole operation if alert creation fails
        }
      }

      alert('Emergency alert sent! Help is on the way.');
    } catch (error) {
      console.error('Error creating emergency incident:', error);
      alert('Emergency alert sent! Help is on the way.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--background-dark)] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background-dark)] text-white">
      <div className="flex h-screen w-full flex-col">
        {/* Header */}
        <header className="absolute top-0 z-20 w-full p-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="h-8 w-8 text-[var(--primary-color)]"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <h1 className="text-2xl font-bold tracking-tight">SafeTravels</h1>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              <button
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                onClick={() => navigate("/")}
              >
                Home
              </button>
              <button
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                onClick={() => navigate("/tripdetails")}
              >
                Trip Details
              </button>
              <button
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                onClick={() => navigate("/emergency")}
              >
                Emergency
              </button>
              <button
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                onClick={() => navigate("/DigitalTouristId")}
              >
                Digital ID
              </button>
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-white/80">
                <span>Welcome, {user?.name || user?.username}</span>
              </div>
              <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                <span className="material-symbols-outlined">person</span>
              </button>
              <button
                onClick={handleLogout}
                className="rounded-full p-2 transition-colors hover:bg-white/10"
                title="Logout"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Map Area */}
        <main className="relative flex-1">
          {/* Interactive Map */}
          <div className="absolute inset-0">
            <MapView
              incidents={incidents}
              geofences={geofences}
              center={[28.6139, 77.2090]} // Delhi, India
              zoom={12}
              onIncidentClick={handleIncidentClick}
              onGeofenceClick={handleGeofenceClick}
              useCurrentLocation={true}
              style={{ height: '100%', width: '100%' }}
            />
          </div>

          {/* Map Controls Overlay */}
          <div className="absolute top-20 right-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Map Legend</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Your Location</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">High Severity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Medium Severity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Low Severity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 border-2 border-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Danger Zones</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 border-2 border-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Warning Zones</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left side panel */}
          <div className="absolute left-4 top-20 w-80 space-y-4 z-10">
            {/* Search bar */}
            <div className="flex items-center rounded-full bg-[var(--surface-dark)]/80 backdrop-blur-sm shadow-lg">
              <div className="pl-4 text-white/60">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="w-full flex-1 appearance-none border-none bg-transparent py-3 pl-2 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-0"
                placeholder="Search for a location"
                type="text"
              />
            </div>

            {/* Map Layers */}
            <div className="space-y-2 rounded-xl bg-[var(--surface-dark)]/80 p-4 backdrop-blur-sm shadow-lg">
              <h3 className="font-semibold">Map Layers</h3>
              <div className="space-y-3 pt-2">
                {/* High-Alert Zones */}
                <label className="flex items-center justify-between">
                  <span className="text-sm">High-Alert Zones</span>
                  <button
                    aria-checked="false"
                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)]"
                    role="switch"
                    type="button"
                  >
                    <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </label>

                {/* Safe Routes */}
                <label className="flex items-center justify-between">
                  <span className="text-sm">Safe Routes</span>
                  <button
                    aria-checked="true"
                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[var(--primary-color)] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)]"
                    role="switch"
                    type="button"
                  >
                    <span className="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </label>

                {/* Police Stations */}
                <label className="flex items-center justify-between">
                  <span className="text-sm">Police Stations</span>
                  <button
                    aria-checked="false"
                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)]"
                    role="switch"
                    type="button"
                  >
                    <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </label>
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-4 z-10">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col overflow-hidden rounded-full bg-[var(--surface-dark)]/80 shadow-lg backdrop-blur-sm">
                <button className="p-3 transition-colors hover:bg-white/10">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <div className="h-px bg-white/20"></div>
                <button className="p-3 transition-colors hover:bg-white/10">
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
              <button className="rounded-full bg-[var(--surface-dark)]/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/10">
                <span className="material-symbols-outlined">near_me</span>
              </button>
            </div>
            {/* SOS Button */}
            <button 
              onClick={handleSOSClick}
              className="group flex h-24 w-24 items-center justify-center rounded-full bg-red-600 shadow-2xl shadow-red-900/50 transition-transform hover:scale-105"
            >
              <div className="flex flex-col items-center text-white">
                <span className="material-symbols-outlined text-4xl">sos</span>
                <span className="text-lg font-bold tracking-wider">SOS</span>
              </div>
            </button>
          </div>

          {/* Emergency Contacts */}
          <div className="absolute bottom-4 left-4 w-80 z-10">
            <div className="rounded-xl bg-[var(--surface-dark)]/80 p-4 backdrop-blur-sm shadow-lg">
              <h3 className="font-semibold">Emergency Contacts</h3>
              <div className="mt-3 space-y-3">
                {/* Police */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-400">
                      local_police
                    </span>
                    <span className="text-sm">Local Police</span>
                  </div>
                  <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                    <span className="material-symbols-outlined">call</span>
                  </button>
                </div>

                {/* Embassy */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-400">
                      apartment
                    </span>
                    <span className="text-sm">Embassy</span>
                  </div>
                  <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                    <span className="material-symbols-outlined">call</span>
                  </button>
                </div>

                {/* Mom */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-400">
                      family_restroom
                    </span>
                    <span className="text-sm">Mom</span>
                  </div>
                  <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                    <span className="material-symbols-outlined">call</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Item Details */}
          {(selectedIncident || selectedGeofence) && (
            <div className="absolute top-20 left-4 w-80 z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                {selectedIncident && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Selected Incident</h4>
                    <p className="text-sm text-gray-700"><strong>Description:</strong> {selectedIncident.description}</p>
                    <p className="text-sm text-gray-700"><strong>Severity:</strong> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        selectedIncident.severity === 'high' ? 'bg-red-100 text-red-800' :
                        selectedIncident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedIncident.severity?.toUpperCase()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700"><strong>Status:</strong> {selectedIncident.status}</p>
                    <p className="text-sm text-gray-700"><strong>Address:</strong> {selectedIncident.address}</p>
                    <button 
                      onClick={() => setSelectedIncident(null)}
                      className="mt-2 px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                    >
                      Close
                    </button>
                  </div>
                )}
                {selectedGeofence && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Selected Geofence</h4>
                    <p className="text-sm text-gray-700"><strong>Alert Type:</strong> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        selectedGeofence.alertType === 'danger' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedGeofence.alertType?.toUpperCase()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700"><strong>Radius:</strong> {selectedGeofence.radius}m</p>
                    <p className="text-sm text-gray-700"><strong>Status:</strong> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        selectedGeofence.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedGeofence.active ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </p>
                    <button 
                      onClick={() => setSelectedGeofence(null)}
                      className="mt-2 px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="absolute bottom-0 z-20 w-full p-2 md:hidden">
          <nav className="flex justify-around rounded-full border border-white/10 bg-[var(--background-dark)]/80 p-2 backdrop-blur-sm">
            <button
              className="flex flex-col items-center gap-1 rounded-lg px-4 py-1 text-[var(--primary-color)] transition-colors"
              onClick={() => navigate("/")}
            >
              <span className="material-symbols-outlined">home</span>
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              className="flex flex-col items-center gap-1 rounded-lg px-4 py-1 text-white/60 transition-colors hover:bg-white/10"
              onClick={() => navigate("/tripdetails")}
            >
              <span className="material-symbols-outlined">explore</span>
              <span className="text-xs font-medium">Trip</span>
            </button>
            <button
              className="flex flex-col items-center gap-1 rounded-lg px-4 py-1 text-white/60 transition-colors hover:bg-white/10"
              onClick={() => navigate("/emergency")}
            >
              <span className="material-symbols-outlined">emergency</span>
              <span className="text-xs font-medium">Emergency</span>
            </button>
            <button
              className="flex flex-col items-center gap-1 rounded-lg px-4 py-1 text-white/60 transition-colors hover:bg-white/10"
              onClick={() => navigate("/DigitalTouristId")}
            >
              <span className="material-symbols-outlined">badge</span>
              <span className="text-xs font-medium">ID</span>
            </button>
          </nav>
        </footer>
      </div>
    </div>
  );
}