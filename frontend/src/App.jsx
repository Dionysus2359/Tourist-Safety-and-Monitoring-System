import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { ROUTES } from './constants';
import './App.css';
// import './index.css';

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

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // If route restricted to admins, redirect to admin login
    if (allowedRoles.includes('admin')) {
      return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
    }
    // Otherwise, show standard login
    return <Login />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

function App() {
  return (
    <div className="app">
      {/* Routes - Each page handles its own layout and styling */}
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route
          path={ROUTES.EMERGENCY}
          element={
            <ProtectedRoute>
              <EmergencyContacts />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.TRIP_DETAILS}
          element={
            <ProtectedRoute>
              <TripDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.KYC_OTP}
          element={
            <ProtectedRoute>
              <KycOtpPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN}
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.DIGITAL_TOURIST_ID}
          element={
            <ProtectedRoute>
              <DigitalTouristID />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SAFE}
          element={
            <ProtectedRoute>
              <SafeTravels />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.TOURIST_DETAILS}
          element={
            <ProtectedRoute>
              <TouristDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
