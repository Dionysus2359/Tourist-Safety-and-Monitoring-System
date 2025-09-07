import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons for different incident severities
const createIncidentIcon = (severity) => {
  const colors = {
    low: '#28a745',    // Green
    medium: '#ffc107', // Yellow
    high: '#dc3545'    // Red
  };
  
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${colors[severity] || colors.low};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 12px;
    ">!</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

// Custom icons for geofence alert types
const createGeofenceIcon = (alertType) => {
  const colors = {
    warning: '#ffc107', // Yellow
    danger: '#dc3545'   // Red
  };
  
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${colors[alertType] || colors.warning};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 10px;
    ">G</div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

// Custom icon for current location
const createCurrentLocationIcon = () => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: #007bff;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 14px;
      animation: pulse 2s infinite;
    ">📍</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const MapView = ({ 
  incidents = [], 
  geofences = [], 
  center = [28.6139, 77.2090], // Default to Delhi, India
  zoom = 10,
  onIncidentClick,
  onGeofenceClick,
  className = '',
  style = {},
  useCurrentLocation = true
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const geofenceLayersRef = useRef([]);
  const currentLocationMarkerRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Get current location with improved accuracy
  const getCurrentLocation = () => {
    console.log('Getting current location...');
    if (!navigator.geolocation) {
      console.log('Geolocation not supported');
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);
    console.log('Location request started');

    // First try with high accuracy
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location found:', position.coords);
        const { latitude, longitude, accuracy } = position.coords;
        
        // Check if accuracy is acceptable (within 100 meters)
        if (accuracy > 100) {
          console.log('Location accuracy is poor, trying again...');
          // Try again with watchPosition for better accuracy
          const watchId = navigator.geolocation.watchPosition(
            (betterPosition) => {
              console.log('Better location found:', betterPosition.coords);
              const { latitude: lat, longitude: lng, accuracy: acc } = betterPosition.coords;
              
              if (acc <= 50 || acc < accuracy) { // Accept if better or under 50m
                const location = [lat, lng];
                setCurrentLocation(location);
                setIsLoadingLocation(false);
                console.log('Better current location set:', location);
                navigator.geolocation.clearWatch(watchId);
                updateMapWithLocation(lat, lng, betterPosition);
              }
            },
            (error) => {
              console.log('Watch position error:', error);
              navigator.geolocation.clearWatch(watchId);
              // Fall back to original position
              const location = [latitude, longitude];
              setCurrentLocation(location);
              setIsLoadingLocation(false);
              console.log('Using original location:', location);
              updateMapWithLocation(latitude, longitude, position);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 30000
            }
          );
          
          // Clear watch after 10 seconds
          setTimeout(() => {
            navigator.geolocation.clearWatch(watchId);
          }, 10000);
        } else {
          // Accuracy is good enough
          const location = [latitude, longitude];
          setCurrentLocation(location);
          setIsLoadingLocation(false);
          console.log('Current location set:', location);
          updateMapWithLocation(latitude, longitude, position);
        }
      },
      (error) => {
        console.log('Location error:', error);
        let errorMessage = 'Unable to retrieve your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
        console.log('Location error set:', errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout for better accuracy
        maximumAge: 60000 // Reduced to 1 minute for fresher data
      }
    );
  };

  // Helper function to update map with location
  const updateMapWithLocation = (latitude, longitude, position) => {
    const location = [latitude, longitude];
    
    // Update map center if map is already initialized
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(location, 16); // Increased zoom for better detail
      
      // Add current location marker
      if (currentLocationMarkerRef.current) {
        mapInstanceRef.current.removeLayer(currentLocationMarkerRef.current);
      }
      
      const currentLocationMarker = L.marker(location, {
        icon: createCurrentLocationIcon()
      });
      
      currentLocationMarker.bindPopup(`
        <div style="min-width: 200px;">
          <h4 style="margin: 0 0 8px 0; color: #007bff;">📍 Your Current Location</h4>
          <p style="margin: 4px 0;"><strong>Latitude:</strong> ${latitude.toFixed(6)}</p>
          <p style="margin: 4px 0;"><strong>Longitude:</strong> ${longitude.toFixed(6)}</p>
          <p style="margin: 4px 0; font-size: 12px; color: #666;">
            Accuracy: ±${position.coords.accuracy.toFixed(0)} meters
          </p>
          <p style="margin: 4px 0; font-size: 11px; color: #28a745;">
            ${position.coords.accuracy <= 50 ? '✅ High Accuracy' : 
              position.coords.accuracy <= 100 ? '⚠️ Medium Accuracy' : '❌ Low Accuracy'}
          </p>
        </div>
      `);
      
      currentLocationMarker.addTo(mapInstanceRef.current);
      currentLocationMarkerRef.current = currentLocationMarker;
      console.log('Current location marker added to map');
      
      // Open popup to show location was found
      currentLocationMarker.openPopup();
    }
  };

  // Get current location on component mount if enabled
  useEffect(() => {
    console.log('useCurrentLocation changed:', useCurrentLocation);
    if (useCurrentLocation) {
      getCurrentLocation();
    }
  }, [useCurrentLocation]);

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Use current location if available, otherwise use provided center
      const mapCenter = currentLocation || center;
      const mapZoom = currentLocation ? 15 : zoom; // Zoom closer for current location
      
      // Create map instance
      mapInstanceRef.current = L.map(mapRef.current, {
        center: mapCenter,
        zoom: mapZoom,
        zoomControl: true,
        attributionControl: true
      });

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);

      // Add scale control
      L.control.scale({
        position: 'bottomright',
        metric: true,
        imperial: false
      }).addTo(mapInstanceRef.current);

      // Add current location marker if available
      if (currentLocation) {
        const currentLocationMarker = L.marker(currentLocation, {
          icon: createCurrentLocationIcon()
        });
        
        currentLocationMarker.bindPopup(`
          <div style="min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; color: #007bff;">📍 Your Current Location</h4>
            <p style="margin: 4px 0;"><strong>Latitude:</strong> ${currentLocation[0].toFixed(6)}</p>
            <p style="margin: 4px 0;"><strong>Longitude:</strong> ${currentLocation[1].toFixed(6)}</p>
          </div>
        `);
        
        currentLocationMarker.addTo(mapInstanceRef.current);
        currentLocationMarkerRef.current = currentLocationMarker;
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [currentLocation, center, zoom]);

  // Update map center and zoom when props change
  useEffect(() => {
    if (mapInstanceRef.current) {
      const mapCenter = currentLocation || center;
      const mapZoom = currentLocation ? 15 : zoom;
      mapInstanceRef.current.setView(mapCenter, mapZoom);
    }
  }, [center, zoom, currentLocation]);

  // Update incident markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing incident markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new incident markers
    incidents.forEach(incident => {
      if (incident.location && incident.location.coordinates) {
        const [lng, lat] = incident.location.coordinates;
        const marker = L.marker([lat, lng], {
          icon: createIncidentIcon(incident.severity || 'low')
        });

        // Add popup with incident details
        const popupContent = `
          <div style="min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; color: #333;">Incident Report</h4>
            <p style="margin: 4px 0;"><strong>Description:</strong> ${incident.description || 'No description'}</p>
            <p style="margin: 4px 0;"><strong>Severity:</strong> <span style="color: ${
              incident.severity === 'high' ? '#dc3545' : 
              incident.severity === 'medium' ? '#ffc107' : '#28a745'
            };">${(incident.severity || 'low').toUpperCase()}</span></p>
            <p style="margin: 4px 0;"><strong>Status:</strong> ${(incident.status || 'reported').toUpperCase()}</p>
            ${incident.address ? `<p style="margin: 4px 0;"><strong>Address:</strong> ${incident.address}</p>` : ''}
            <p style="margin: 4px 0; font-size: 12px; color: #666;">
              Reported: ${new Date(incident.createdAt).toLocaleString()}
            </p>
            <button onclick="window.dispatchEvent(new CustomEvent('incidentClick', { detail: '${incident.id}' }))" 
                    style="background: #007bff; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
              View Details
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.addTo(mapInstanceRef.current);

        // Add click event listener
        marker.on('click', () => {
          if (onIncidentClick) {
            onIncidentClick(incident);
          }
        });

        markersRef.current.push(marker);
      }
    });
  }, [incidents, onIncidentClick]);

  // Update geofence polygons/circles
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing geofence layers
    geofenceLayersRef.current.forEach(layer => {
      mapInstanceRef.current.removeLayer(layer);
    });
    geofenceLayersRef.current = [];

    // Add new geofence layers
    geofences.forEach(geofence => {
      if (geofence.center && geofence.center.coordinates && geofence.radius) {
        const [lng, lat] = geofence.center.coordinates;
        const radius = geofence.radius; // radius in meters

        // Create circle for geofence
        const circle = L.circle([lat, lng], {
          radius: radius,
          color: geofence.alertType === 'danger' ? '#dc3545' : '#ffc107',
          fillColor: geofence.alertType === 'danger' ? '#dc3545' : '#ffc107',
          fillOpacity: 0.2,
          weight: 2,
          opacity: 0.8
        });

        // Add popup with geofence details
        const popupContent = `
          <div style="min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; color: #333;">Geofence Zone</h4>
            <p style="margin: 4px 0;"><strong>Alert Type:</strong> <span style="color: ${
              geofence.alertType === 'danger' ? '#dc3545' : '#ffc107'
            };">${(geofence.alertType || 'warning').toUpperCase()}</span></p>
            <p style="margin: 4px 0;"><strong>Radius:</strong> ${radius}m</p>
            <p style="margin: 4px 0;"><strong>Status:</strong> <span style="color: ${
              geofence.active ? '#28a745' : '#6c757d'
            };">${geofence.active ? 'ACTIVE' : 'INACTIVE'}</span></p>
            <p style="margin: 4px 0; font-size: 12px; color: #666;">
              Created: ${new Date(geofence.createdAt).toLocaleString()}
            </p>
            <button onclick="window.dispatchEvent(new CustomEvent('geofenceClick', { detail: '${geofence.id}' }))" 
                    style="background: #007bff; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
              View Details
            </button>
          </div>
        `;

        circle.bindPopup(popupContent);
        circle.addTo(mapInstanceRef.current);

        // Add click event listener
        circle.on('click', () => {
          if (onGeofenceClick) {
            onGeofenceClick(geofence);
          }
        });

        geofenceLayersRef.current.push(circle);
      }
    });
  }, [geofences, onGeofenceClick]);

  // Listen for custom events from popup buttons
  useEffect(() => {
    const handleIncidentClick = (event) => {
      const incidentId = event.detail;
      const incident = incidents.find(inc => inc.id === incidentId);
      if (incident && onIncidentClick) {
        onIncidentClick(incident);
      }
    };

    const handleGeofenceClick = (event) => {
      const geofenceId = event.detail;
      const geofence = geofences.find(gf => gf.id === geofenceId);
      if (geofence && onGeofenceClick) {
        onGeofenceClick(geofence);
      }
    };

    window.addEventListener('incidentClick', handleIncidentClick);
    window.addEventListener('geofenceClick', handleGeofenceClick);

    return () => {
      window.removeEventListener('incidentClick', handleIncidentClick);
      window.removeEventListener('geofenceClick', handleGeofenceClick);
    };
  }, [incidents, geofences, onIncidentClick, onGeofenceClick]);

  // Expose map methods for parent components
  const getMapInstance = () => mapInstanceRef.current;

  const fitBounds = (bounds) => {
    if (mapInstanceRef.current && bounds) {
      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  const setView = (center, zoom) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  };

  // Expose methods via ref (if using forwardRef)
  React.useImperativeHandle = React.useImperativeHandle || (() => {});
  React.useImperativeHandle(React.forwardRef(() => null), () => ({
    getMapInstance,
    fitBounds,
    setView
  }));

  // Debug logging
  console.log('MapView render - isLoadingLocation:', isLoadingLocation, 'locationError:', locationError, 'currentLocation:', currentLocation);

  return (
    <div 
      ref={mapRef} 
      className={`map-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px',
        position: 'relative',
        ...style
      }}
    >
      {/* Location Status Overlay */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1000,
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '200px',
        border: '1px solid #dee2e6'
      }}>
        {isLoadingLocation && (
          <>
            <div style={{
              width: '12px',
              height: '12px',
              border: '2px solid #007bff',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <span>Getting your location...</span>
          </>
        )}
        
        {locationError && (
          <>
            <span style={{ color: '#dc3545' }}>⚠️</span>
            <span style={{ color: '#dc3545' }}>{locationError}</span>
            <button 
              onClick={getCurrentLocation}
              style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '2px 6px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '10px',
                marginLeft: '4px'
              }}
            >
              Retry
            </button>
          </>
        )}
        
        {currentLocation && !isLoadingLocation && !locationError && (
          <>
            <span style={{ color: '#28a745' }}>✅</span>
            <span style={{ color: '#28a745' }}>Location found</span>
            <button 
              onClick={getCurrentLocation}
              style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '2px 6px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '10px',
                marginLeft: '4px'
              }}
            >
              Improve Accuracy
            </button>
          </>
        )}
        
        {!useCurrentLocation && !isLoadingLocation && !locationError && !currentLocation && (
          <>
            <span style={{ color: '#6c757d' }}>📍</span>
            <span style={{ color: '#6c757d' }}>Using default location</span>
          </>
        )}
        
        {/* Always show something if no other state is active */}
        {!isLoadingLocation && !locationError && !currentLocation && useCurrentLocation && (
          <>
            <span style={{ color: '#6c757d' }}>📍</span>
            <span style={{ color: '#6c757d' }}>Location not available</span>
            <button 
              onClick={getCurrentLocation}
              style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '2px 6px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '10px',
                marginLeft: '4px'
              }}
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MapView;
