import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/layout/Layout";
import MapView from "../components/MapView";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { alertsAPI, incidentsAPI } from "../services/api";

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
      console.log('🚨 SOS Button Clicked');
      console.log('🔐 User authentication status:', {
        user: user?.username || user?.name,
        userId: user?.id || user?._id,
        isAuthenticated: !!user
      });

      // Check if user is authenticated
      if (!user) {
        console.error('❌ User not authenticated for SOS');
        alert('You must be logged in to send an emergency alert.');
        return;
      }

      // Create emergency incident using authenticated API
      const emergencyIncident = {
        description: "EMERGENCY SOS - Immediate assistance required",
        location: {
          type: "Point",
          coordinates: [77.2090, 28.6139] // Current location or user's location
        },
        severity: "high"
      };

      console.log('📝 Creating emergency incident with data:', emergencyIncident);

      // Create incident using authenticated API
      const incidentResponse = await incidentsAPI.create(emergencyIncident);
      console.log('Emergency incident created:', incidentResponse.data);

      // Create alert linked to the incident for ALL admin users
      if (incidentResponse.data.success && incidentResponse.data.data.incident) {
        const incidentId = incidentResponse.data.data.incident._id;

        try {
          // Create alerts for all admin users via authenticated API
          const alertResponse = await alertsAPI.createEmergencySOS({
            incidentId: incidentId,
            location: emergencyIncident.location,
            touristInfo: {
              userId: user?.id || user?._id || 'unknown',
              name: user?.name || user?.username || 'Unknown Tourist'
            }
          });

          if (alertResponse.data.success) {
            console.log('Emergency alerts created for admins:', alertResponse.data);
          } else {
            console.error('Failed to create emergency alerts:', alertResponse.data);
          }
        } catch (alertError) {
          console.error('Error creating emergency alerts via SOS endpoint:', alertError);
          // Try fallback method - create alert using authenticated API
          try {
            const alertData = {
              message: `EMERGENCY SOS Alert: Tourist ${user?.name || user?.username || 'Unknown'} has triggered emergency SOS. Location: ${emergencyIncident.location.coordinates.join(', ')}`,
              incident: incidentId,
              priority: "high"
            };
            await alertsAPI.create(alertData);
            console.log('Emergency alert created via fallback method');
          } catch (fallbackError) {
            console.error('Fallback alert creation also failed:', fallbackError);
          }
        }
      }

      alert('Emergency alert sent! Help is on the way.');
    } catch (error) {
      console.error('Error creating emergency incident:', error);
      alert('Failed to send emergency alert. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--background)] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout showFooter={false}>
      <div className="relative flex flex-col h-full min-h-0 bg-[var(--background)] text-white">
        {/* Map container fills available space below the app header */}
        <div className="relative flex-1 min-h-0 overflow-hidden">
          <div className="absolute inset-0 z-0">
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

          {/* Map Legend */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[1000] w-56">
            <Card className="bg-white/95 text-gray-900 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Map Legend</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>Your Location</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>High Severity</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span>Medium Severity</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Low Severity</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 border-2 border-red-500 rounded-full mr-2"></div>
                    <span>Danger Zones</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 border-2 border-yellow-500 rounded-full mr-2"></div>
                    <span>Warning Zones</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Left side tools */}
          <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-[1000] w-80 space-y-4 max-w-[90vw]">
            <Card className="bg-black/40 text-white border-white/10 backdrop-blur">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white/70">search</span>
                  <Input className="bg-transparent border-white/20 text-white placeholder:text-white/60"
                         placeholder="Search for a location" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 text-white border-white/10 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Map Layers</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <label className="flex items-center justify-between text-sm">
                  <span>High-Alert Zones</span>
                  <Checkbox />
                </label>
                <label className="flex items-center justify-between text-sm">
                  <span>Safe Routes</span>
                  <Checkbox defaultChecked />
                </label>
                <label className="flex items-center justify-between text-sm">
                  <span>Police Stations</span>
                  <Checkbox />
                </label>
              </CardContent>
            </Card>
          </div>

          {/* Right side controls + SOS */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1000] flex flex-col items-end gap-4">
            <Card className="bg-black/40 text-white border-white/10 backdrop-blur p-2">
              <div className="flex flex-col">
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                  <span className="material-symbols-outlined">add</span>
                </Button>
                <div className="h-px bg-white/20 my-1"></div>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                  <span className="material-symbols-outlined">remove</span>
                </Button>
              </div>
            </Card>
            <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 bg-black/40 text-white border border-white/10 backdrop-blur">
              <span className="material-symbols-outlined">near_me</span>
            </Button>

            <Button
              onClick={handleSOSClick}
              variant="destructive"
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full shadow-2xl shadow-red-900/50 text-white"
            >
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl">sos</span>
                <span className="text-sm sm:text-base md:text-lg font-bold tracking-wider">SOS</span>
              </div>
            </Button>
          </div>

          {/* Emergency Contacts */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-[1000] w-80 max-w-[90vw]">
            <Card className="bg-black/40 text-white border-white/10 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-400">local_police</span>
                    <span className="text-sm">Local Police</span>
                  </div>
                  <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                    <span className="material-symbols-outlined">call</span>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-400">apartment</span>
                    <span className="text-sm">Embassy</span>
                  </div>
                  <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                    <span className="material-symbols-outlined">call</span>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-400">family_restroom</span>
                    <span className="text-sm">Mom</span>
                  </div>
                  <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                    <span className="material-symbols-outlined">call</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Item Details */}
          {(selectedIncident || selectedGeofence) && (
            <div className="absolute top-6 left-6 translate-y-[calc(100%+16px)] sm:translate-y-0 z-[1000] w-80 max-w-[90vw]">
              <Card className="bg-white/95 text-gray-900 shadow-lg">
                <CardContent>
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
                      <Button onClick={() => setSelectedIncident(null)} size="sm" variant="secondary" className="mt-2">
                        Close
                      </Button>
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
                      <Button onClick={() => setSelectedGeofence(null)} size="sm" variant="secondary" className="mt-2">
                        Close
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}