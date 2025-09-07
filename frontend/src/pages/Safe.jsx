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
import { Search as SearchIcon, Phone, LocateFixed, Siren, Building2, Shield, Users, X } from "lucide-react";
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
          const incidentsData = incidentsResponse.data.data.incidents || [];
          setIncidents(incidentsData);
          console.log('Loaded incidents from backend:', incidentsData.length);
        }

        if (geofencesResponse.data.success) {
          const geofencesData = geofencesResponse.data.data.geofences || [];
          setGeofences(geofencesData);
          console.log('Loaded geofences from backend:', geofencesData.length);
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
          },
          {
            id: '2',
            description: 'Medical emergency at tourist spot',
            location: { coordinates: [77.2150, 28.6189] },
            severity: 'high',
            status: 'inProgress',
            address: 'Red Fort Area, Delhi',
            createdAt: new Date().toISOString()
          },
          {
            id: '3',
            description: 'Pickpocket incident in market',
            location: { coordinates: [77.2050, 28.6089] },
            severity: 'medium',
            status: 'reported',
            address: 'Chandni Chowk Market, Delhi',
            createdAt: new Date().toISOString()
          },
          {
            id: '4',
            description: 'Lost wallet near hotel',
            location: { coordinates: [77.2200, 28.6200] },
            severity: 'medium',
            status: 'resolved',
            address: 'Connaught Place, Delhi',
            createdAt: new Date().toISOString()
          },
          {
            id: '5',
            description: 'Minor traffic violation',
            location: { coordinates: [77.2100, 28.6150] },
            severity: 'low',
            status: 'reported',
            address: 'Rajpath, Delhi',
            createdAt: new Date().toISOString()
          },
          {
            id: '6',
            description: 'Noise complaint at night',
            location: { coordinates: [77.2250, 28.6250] },
            severity: 'low',
            status: 'resolved',
            address: 'Karol Bagh, Delhi',
            createdAt: new Date().toISOString()
          }
        ]);
        setGeofences([
          {
            id: '1',
            center: { coordinates: [77.2090, 28.6139] },
            radius: 800,
            alertType: 'danger',
            active: true,
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            center: { coordinates: [77.2150, 28.6189] },
            radius: 600,
            alertType: 'danger',
            active: true,
            createdAt: new Date().toISOString()
          },
          {
            id: '3',
            center: { coordinates: [77.2050, 28.6089] },
            radius: 500,
            alertType: 'warning',
            active: true,
            createdAt: new Date().toISOString()
          },
          {
            id: '4',
            center: { coordinates: [77.2200, 28.6200] },
            radius: 700,
            alertType: 'warning',
            active: true,
            createdAt: new Date().toISOString()
          },
          {
            id: '5',
            center: { coordinates: [77.2100, 28.6150] },
            radius: 400,
            alertType: 'warning',
            active: false,
            createdAt: new Date().toISOString()
          },
          {
            id: '6',
            center: { coordinates: [77.2250, 28.6250] },
            radius: 300,
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
        description: "EMERGENCY SOS ALERT - Immediate assistance required for tourist safety. Please respond urgently to the reported location.",
        location: {
          coordinates: [77.2090, 28.6139] // Current location or user's location [longitude, latitude]
        },
        severity: "high"
      };

      console.log('📝 Creating emergency incident with data:', emergencyIncident);

      // Create incident using authenticated API
      const incidentResponse = await incidentsAPI.create(emergencyIncident);
      console.log('Emergency incident created:', incidentResponse.data);

      // Create alert linked to the incident for ALL admin users
      if (incidentResponse.data.success && incidentResponse.data.data?.incident) {
        const incidentId = incidentResponse.data.data.incident.id;

        try {
          // Create alerts for all admin users via authenticated API
          const alertResponse = await alertsAPI.createEmergencySOS({
            incidentId: incidentId,
            location: {
              coordinates: emergencyIncident.location.coordinates
            },
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
              message: `EMERGENCY SOS ALERT: Tourist ${user?.name || user?.username || 'Unknown'} has triggered an emergency SOS signal requiring immediate assistance. Location: ${emergencyIncident.location.coordinates.join(', ')}. Please respond urgently.`,
              incident: incidentId
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
      <div className="relative flex flex-col flex-1 min-h-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-800/50"></div>

        {/* Map container fills available space below the app header */}
        <div className="relative flex-1 min-h-0 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <MapView
              incidents={incidents}
              geofences={geofences}
              center={[28.6139, 77.2090]} // Delhi, India - will be overridden by current location if available
              zoom={12}
              onIncidentClick={handleIncidentClick}
              onGeofenceClick={handleGeofenceClick}
              useCurrentLocation={true}
              style={{ height: '100%', width: '100%' }}
            />
          </div>

          {/* Map Legend - Top Right */}
          <div className="absolute top-6 right-6 z-[1000] max-w-xs">
            <Card className="bg-white/95 backdrop-blur-sm text-gray-900 shadow-2xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  Map Legend
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
                    <span className="text-sm font-medium text-gray-700">Your Location</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
                    <span className="text-sm font-medium text-gray-700">High Severity</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-sm font-medium text-gray-700">Medium Severity</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                    <span className="text-sm font-medium text-gray-700">Low Severity</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-4 h-4 border-2 border-red-500 rounded-full shadow-sm"></div>
                    <span className="text-sm font-medium text-gray-700">Danger Zones</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-4 h-4 border-2 border-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-sm font-medium text-gray-700">Warning Zones</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Left side tools - Top Left */}
          <div className="absolute top-6 left-6 z-[1000] space-y-4 max-w-sm w-full">
            {/* Search Bar */}
            <Card className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
              <CardContent className="p-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-white/60 text-lg">search</span>
                  </div>
                  <Input
                    className="pl-10 bg-black/30 border-white/30 text-white placeholder:text-white/60 rounded-xl h-12 focus:ring-2 focus:ring-white/50 focus:border-white/50 text-sm"
                    // placeholder="Search for locations, landmarks..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Map Layers */}
            <Card className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  Map Layers
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-1">
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl hover:bg-black/30 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-red-500/20 rounded-lg border-2 border-red-500/40 group-hover:border-red-400 transition-colors"></div>
                      <span className="text-sm font-medium text-white/90">High-Alert Zones</span>
                    </div>
                    <Checkbox className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 border-white/40" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl hover:bg-black/30 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-500/20 rounded-lg border-2 border-green-500/40 group-hover:border-green-400 transition-colors"></div>
                      <span className="text-sm font-medium text-white/90">Safe Routes</span>
                    </div>
                    <Checkbox defaultChecked className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 border-white/40" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl hover:bg-black/30 transition-all duration-200 cursor-pointer group">
                    <div className="w-4 h-4 bg-blue-500/20 rounded-lg border-2 border-blue-500/40 group-hover:border-blue-400 transition-colors"></div>
                    <span className="text-sm font-medium text-white/90">Police Stations</span>
                  </label>
                  <Checkbox className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 border-white/40" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side controls - Bottom Right */}
          <div className="absolute bottom-6 right-6 z-[1000] flex flex-col items-end gap-4">
            {/* Zoom Controls */}
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-2">
              <div className="flex flex-col gap-2">
                {/* <Button
                  size="sm"
                  variant="ghost"
                  className="w-10 h-10 text-white hover:bg-black/30 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </Button>
                <div className="w-8 h-px bg-white/30 mx-auto"></div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-10 h-10 text-white hover:bg-black/30 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <span className="material-symbols-outlined text-lg">remove</span>
                </Button> */}
              </div>
            </Card>

            {/* Location Button
            <Button
              size="lg"
              className="w-14 h-14 bg-white text-gray-900 hover:bg-gray-100 rounded-2xl shadow-2xl border-0 hover:scale-105 transition-all duration-200"
            >
              My Location
            </Button> */}

            {/* SOS Emergency Button */}
            <div className="relative group">
              <Button
                onClick={handleSOSClick}
                className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white rounded-full shadow-2xl border-4 border-red-400/30 hover:border-red-300/50 hover:scale-105 transition-all duration-300 overflow-hidden group"
              >
                {/* Animated background pulse */}
                <div className="absolute inset-0 bg-red-400/20 rounded-full animate-ping"></div>
                <div className="absolute inset-1 bg-red-500/10 rounded-full animate-pulse"></div>

                {/* Content */}
                <div className="relative flex flex-col items-center justify-center z-10">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl font-bold mb-1">sos</span>
                  <span className="text-sm sm:text-base font-bold tracking-widest">SOS</span>
                </div>

                {/* Emergency glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 via-red-500/20 to-red-600/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>

              {/* Emergency tooltip */}
              <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none">
                Emergency SOS - Press for immediate help
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts - Bottom Left */}
          <div className="absolute bottom-6 left-6 z-[1000] max-w-sm w-full">
            <Card className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-pulse"></div>
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-black/30 transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30 group-hover:border-red-400 transition-colors">
                        {/* <span className="material-symbols-outlined text-red-400 text-lg">local_police</span> */}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Local Police</p>
                        <p className="text-xs text-white/60">Emergency: 100</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg px-3 transition-all duration-200"
                    >
                      {/* <span className="material-symbols-outlined text-sm mr-1">call</span> */}
                      Call
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-black/30 transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400 transition-colors">
                        {/* <span className="material-symbols-outlined text-blue-400 text-lg">apartment</span> */}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Embassy</p>
                        <p className="text-xs text-white/60">Consular Services</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-lg px-3 transition-all duration-200"
                    >
                      {/* <span className="material-symbols-outlined text-sm mr-1">call</span> */}
                      Call
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-black/30 transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30 group-hover:border-green-400 transition-colors">
                        {/* <span className="material-symbols-outlined text-green-400 text-lg">family_restroom</span> */}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Emergency Contact</p>
                        <p className="text-xs text-white/60">Family Member</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-lg px-3 transition-all duration-200"
                    >
                      {/* <span className="material-symbols-outlined text-sm mr-1">call</span> */}
                      Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Item Details Modal */}
          {(selectedIncident || selectedGeofence) && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1100] max-w-md w-full mx-4">
              <Card className="bg-white/95 backdrop-blur-md text-gray-900 shadow-2xl border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-800">
                      {selectedIncident ? 'Incident Details' : 'Geofence Details'}
                    </CardTitle>
                    <Button
                      onClick={() => {
                        setSelectedIncident(null);
                        setSelectedGeofence(null);
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-gray-700 rounded-full w-8 h-8 p-0"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {selectedIncident && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">Description</h4>
                          <p className="text-sm text-gray-600">{selectedIncident.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Severity:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedIncident.severity === 'high' ? 'bg-red-100 text-red-800' :
                          selectedIncident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {selectedIncident.severity?.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className="text-sm text-gray-600">{selectedIncident.status}</span>
                      </div>
                      {selectedIncident.address && (
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">Location</h4>
                            <p className="text-sm text-gray-600">{selectedIncident.address}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {selectedGeofence && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Alert Type:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedGeofence.alertType === 'danger' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedGeofence.alertType?.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Radius:</span>
                        <span className="text-sm text-gray-600">{selectedGeofence.radius} meters</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedGeofence.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedGeofence.active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
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