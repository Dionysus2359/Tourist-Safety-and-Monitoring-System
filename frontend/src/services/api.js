import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true, // Important for session cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
    (config) => {
        // Add any request preprocessing here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors - let components handle 401 errors themselves
        // instead of automatic redirects to avoid infinite loops
        if (error.response?.status === 401) {
            // Just log the error and let the component handle it
            console.log('Authentication error - component will handle redirect');
        }
        return Promise.reject(error);
    }
);

// API endpoints organized by feature
export const authAPI = {
    login: (credentials) => api.post('/users/login', credentials),
    register: (userData) => api.post('/users/register', userData),
    logout: () => api.post('/users/logout'),
    getProfile: () => api.get('/users/profile'),
    updateProfile: (userData) => api.put('/users/profile', userData),
    generateDigitalId: (publicKey) => api.post('/users/generate-digital-id', { publicKey }),
};

export const incidentsAPI = {
    getAll: () => api.get('/incidents'),
    getById: (id) => api.get(`/incidents/${id}`),
    create: (incidentData) => api.post('/incidents', incidentData),
    update: (id, incidentData) => api.put(`/incidents/${id}`, incidentData),
    delete: (id) => api.delete(`/incidents/${id}`),
};

export const geofencesAPI = {
    getAll: () => api.get('/geofences'),
    getById: (id) => api.get(`/geofences/${id}`),
    create: (geofenceData) => api.post('/geofences', geofenceData),
    update: (id, geofenceData) => api.put(`/geofences/${id}`, geofenceData),
    delete: (id) => api.delete(`/geofences/${id}`),
};

export const alertsAPI = {
    getAll: () => api.get('/alerts'),
    getById: (id) => api.get(`/alerts/${id}`),
    create: (alertData) => api.post('/alerts', alertData),
    update: (id, alertData) => api.put(`/alerts/${id}`, alertData),
    markAsRead: (id) => api.put(`/alerts/${id}`, { read: true }),
};

export default api;
