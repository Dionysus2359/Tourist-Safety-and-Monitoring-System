import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authCheckInProgress, setAuthCheckInProgress] = useState(false);
    const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

    // Check if user is already logged in on app start
    useEffect(() => {
        const checkAuthStatus = async () => {
            // Prevent multiple auth checks
            if (authCheckCompleted || authCheckInProgress) {
                return;
            }

            setAuthCheckInProgress(true);

            try {
                // Check localStorage first for quick access
                const storedUser = localStorage.getItem('user');
                let shouldVerifyWithServer = false;

                if (storedUser) {
                    try {
                        const userData = JSON.parse(storedUser);
                        setUser(userData);
                        setIsAuthenticated(true);
                        shouldVerifyWithServer = true;
                    } catch (parseError) {
                        // Invalid JSON in localStorage, clear it
                        localStorage.removeItem('user');
                    }
                }

                // Only verify with server if we have valid stored user data
                if (shouldVerifyWithServer) {
                    try {
                        const response = await authAPI.getProfile();
                        if (response.data.success) {
                            setUser(response.data.data);
                            setIsAuthenticated(true);
                            // Update localStorage with fresh data
                            localStorage.setItem('user', JSON.stringify(response.data.data));
                        } else {
                            // Server says user is not authenticated, clear local state
                            localStorage.removeItem('user');
                            setUser(null);
                            setIsAuthenticated(false);
                        }
                    } catch (serverError) {
                        console.error('Server auth check failed:', serverError);
                        // If server returns 401 (unauthorized), clear local state
                        if (serverError.response?.status === 401) {
                            localStorage.removeItem('user');
                            setUser(null);
                            setIsAuthenticated(false);
                        }
                        // For other errors (network issues, etc.), keep local state
                        // but don't automatically redirect to avoid loops
                    }
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                // Clear invalid localStorage data
                localStorage.removeItem('user');
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
                setAuthCheckInProgress(false);
                setAuthCheckCompleted(true);
            }
        };

        checkAuthStatus();
    }, []);

    // Login function
    const login = async (credentials) => {
        try {
            setLoading(true);
            const response = await authAPI.login(credentials);

            if (response.data.success) {
                const userData = response.data.data;
                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(userData));
                // Reset auth check flag so it can re-verify if needed
                setAuthCheckCompleted(false);
                return { success: true, user: userData };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed. Please try again.'
            };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        try {
            setLoading(true);
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear local state regardless of API call success
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('user');
            setLoading(false);
        }
    };

    // Update user profile
    const updateProfile = async (userData) => {
        try {
            setLoading(true);
            const response = await authAPI.updateProfile(userData);

            if (response.data.success) {
                const updatedUser = response.data.data;
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                return { success: true };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.error('Profile update error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Profile update failed.'
            };
        } finally {
            setLoading(false);
        }
    };

    // Check if user has specific role
    const hasRole = (role) => {
        return user?.role === role;
    };

    // Check if user is admin
    const isAdmin = () => {
        return hasRole('admin');
    };

    // Check if user is tourist
    const isTourist = () => {
        return hasRole('tourist');
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        updateProfile,
        hasRole,
        isAdmin,
        isTourist
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
