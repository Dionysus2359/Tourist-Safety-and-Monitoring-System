import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncidentsTable from "../components/IncidentsTable";
import TouristMap from "../components/TouristMap";
import {
  Shield,
  Users,
  MapPin,
  AlertTriangle,
  Settings,
  Eye,
  Phone,
  Mail,
  Calendar,
  Activity,
  LogOut,
  RefreshCw
} from "lucide-react";
import { incidentsAPI, usersAPI, statsAPI, alertsAPI } from "../services/api";
import AdminTouristsTable from "../components/AdminTouristsTable";

export default function Admin() {
  const navigate = useNavigate();
  const { logout, user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [alerts, setAlerts] = useState([]);
  const [alertsLoading, setAlertsLoading] = useState(false);

  console.log('🎯 Admin component rendered:', {
    user: user?.username,
    role: user?.role,
    isAuthenticated,
    loading
  });

  // If still loading authentication, show loading spinner
  if (loading) {
    console.log('🔄 Admin: Authentication still loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400"></div>
      </div>
    );
  }

  // If not authenticated or not admin, redirect
  if (!isAuthenticated || user?.role !== 'admin') {
    console.log('❌ Admin: Not authenticated or not admin role');
    return null; // Let ProtectedRoute handle the redirect
  }
  const [stats, setStats] = useState([
    { title: "Total Tourists", value: "0", icon: Users, change: "0%" },
    { title: "Active Alerts", value: "0", icon: AlertTriangle, change: "0%" },
    { title: "Safe Zones", value: "0", icon: Shield, change: "0%" },
    { title: "Incidents Today", value: "0", icon: Activity, change: "0%" },
  ]);
  const [statsLoading, setStatsLoading] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleViewTourist = (touristId) => {
    navigate(`/touristdetails/${touristId}`);
  };

  // Fetch real stats from API - wrapped with useCallback to prevent unnecessary re-renders
  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);

      // Use the new dashboard stats API
      const response = await statsAPI.getDashboard();

      if (response.data.success) {
        const statsData = response.data.data.stats;

        // Update stats with real data
        setStats([
          {
            title: "Total Tourists",
            value: statsData.totalTourists.value.toLocaleString(),
            icon: Users,
            change: statsData.totalTourists.change
          },
          {
            title: "Active Alerts",
            value: statsData.activeAlerts.value.toString(),
            icon: AlertTriangle,
            change: statsData.activeAlerts.change
          },
          {
            title: "Safe Zones",
            value: statsData.safeZones.value.toString(),
            icon: Shield,
            change: statsData.safeZones.change
          },
          {
            title: "Total Incidents",
            value: statsData.totalIncidents.value.toString(),
            icon: Activity,
            change: statsData.totalIncidents.change
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Fallback to default values if API fails
      setStats([
        { title: "Total Tourists", value: "0", icon: Users, change: "0%" },
        { title: "Active Alerts", value: "0", icon: AlertTriangle, change: "0%" },
        { title: "Safe Zones", value: "0", icon: Shield, change: "0%" },
        { title: "Total Incidents", value: "0", icon: Activity, change: "0%" },
      ]);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch alerts for the alerts tab
  const fetchAlerts = useCallback(async () => {
    try {
      setAlertsLoading(true);
      const response = await alertsAPI.getAll();

      if (response.data.success) {
        setAlerts(response.data.data.alerts || []);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setAlerts([]);
    } finally {
      setAlertsLoading(false);
    }
  }, []);

  // Fetch stats on component mount - only once
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Fetch alerts when alerts tab is selected
  useEffect(() => {
    if (activeTab === "alerts") {
      fetchAlerts();
    }
  }, [activeTab, fetchAlerts]);

  const tourists = [
    {
      id: 1,
      name: "Ethan Carter",
      phone: "+1-555-123-4567",
      email: "ethan.carter@email.com",
      status: "active",
      location: "Mumbai, India",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQYvI8dVqoLDW64wUG3n69sdFPSds4QcCm9hEexDCZtO0151Ws0DPH_D2oa6bgrHnIrnbwFuYNkvvjxdB3Zz5W5kx-8EFvOvBORUnoTWVKYavEclmBKfKaam7vhmW_xIrcPbGOG5oSDXc9IFZYZgFO1ihINqE5JrujS_ZXvcQHxeQ9lePxhpRUqMVsmCiGZx74JlLCym9voLV4xK0HSY2kQ-TUOBGP_StxAfQM_DdEFyCAdYkcsaOHqqhcVzvK3Ouj44-sYo7yng1l",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Olivia Bennett",
      phone: "+1-555-987-6543",
      email: "olivia.bennett@email.com",
      status: "active",
      location: "Delhi, India",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6x2mxHyUnRwiP6DKeBoJ2M4fE4yIXgLJLthgyUCPUbCH-z8ixadIt8Txs_zEqjiLQHPCBknKSgqdmUeQIV7J6p3x2W2h0HYdam-3xMnEkCBmmiQoBGWtUvoI3DWb_iDZj1dt4ILz0yQJnMRlBzWmDGc1bEOJyafpfezQG3rxyeB0y0GkBrCNQbISQzTHzOYfL_1nqQAO53BT696hRzCabZgr7zKSjOVKyRnoKJQ3oqQJV85gO98xZ1JJ-X5izcpPUQYL_ErUzJZ6D",
      lastActive: "5 minutes ago"
    },
    {
      id: 3,
      name: "Noah Thompson",
      phone: "+1-555-246-8013",
      email: "noah.thompson@email.com",
      status: "inactive",
      location: "Bangalore, India",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPxrWhsp-GuRzABV5BQ1OxI9MncQoJMs2mGxQPuSCUdiBzsEKUdcUmdGizQ_iXhSQVbgWD6e0oMO6mWtRSTPiW1Z_L-2WTIuDgHEvzALe59-4wsaG5Q_bv3ve_OzLc4LQBceBNMuoBHfK6eOLrhszJHJKPlw0J97ANp1DLwolzIlMaNjZTru5PpEa3YGWp5gzeDz0ai2hsB3ps6OErwHdCPOREuaqLW3nRFLiqmTMdjVaeHe0M6UlHgfTXdaRvwMKyRj6c3QkYpC3W",
      lastActive: "1 day ago"
    },
    {
      id: 4,
      name: "Ava Rodriguez",
      phone: "+1-555-369-1470",
      email: "ava.rodriguez@email.com",
      status: "active",
      location: "Chennai, India",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC51jHbwf9YzGzdIR3yT4gbStIXRjO10vnwbaWGZFiQ8Hd9C-aruYhvKZRQfuEefn9k_ouYpNYpcYkNHqSxkFvsfeWsNYw6UpMZpvAfEWnvti_ilK1LcdnDCz7P6ksuhdS-KgRnUMbTU7ZVQf6A3b_CDf3ma6GBzDkkplvveuv49eGzp1gi2QRcBfkovJJWwYsLsFaR4YgE4L-u8pQGDzAbajtCWT2ok73tN_7KBk9bncpBTuTDeEBaXs00i6LYxJkOr434YtwyfXAw",
      lastActive: "30 minutes ago"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 px-3 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="flex h-14 sm:h-16 items-center px-3 sm:px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Welcome, {user?.name || user?.username}</span>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 py-6 sm:py-8 px-0">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {statsLoading ? (
                  <RefreshCw className="h-4 w-4 text-muted-foreground animate-spin" />
                ) : (
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsLoading ? "..." : stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  {' '}from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="tourists">Tourists</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Tourist Locations Map */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Tourist Locations</CardTitle>
                  <CardDescription>
                    Real-time location tracking of all registered tourists
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="rounded-lg overflow-hidden" style={{ height: '420px' }}>
                    <TouristMap
                      style={{ height: '100%', width: '100%' }}
                      center={[20.5937, 78.9629]} // Center on India
                      zoom={5}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest tourist check-ins and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={tourists[0].avatar} alt={tourists[0].name} />
                        <AvatarFallback>{tourists[0].name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {tourists[0].name} checked in
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {tourists[0].location}
                        </p>
                      </div>
                      <div className="ml-auto font-medium text-sm">
                        2h ago
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={tourists[1].avatar} alt={tourists[1].name} />
                        <AvatarFallback>{tourists[1].name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {tourists[1].name} updated location
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {tourists[1].location}
                        </p>
                      </div>
                      <div className="ml-auto font-medium text-sm">
                        5m ago
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-4">
            <IncidentsTable />
          </TabsContent>

          <TabsContent value="tourists" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tourist Management</CardTitle>
                <CardDescription>
                  Manage and monitor all registered tourists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminTouristsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Tourist Location Tracking
                </CardTitle>
                <CardDescription>
                  Interactive map showing all tourist locations with real-time updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] rounded-lg overflow-hidden border">
                  <TouristMap
                    style={{ height: '100%', width: '100%' }}
                    center={[20.5937, 78.9629]} // Center on India
                    zoom={5}
                    showControls={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Active Alerts
                </CardTitle>
                <CardDescription>
                  Monitor and respond to tourist safety alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {alertsLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="h-8 w-8 text-muted-foreground mx-auto mb-4 animate-spin" />
                    <p className="text-muted-foreground">Loading alerts...</p>
                  </div>
                ) : alerts.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No active alerts at the moment</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div
                        key={alert._id}
                        className={`p-4 rounded-lg border ${
                          alert.priority === 'high'
                            ? 'border-red-200 bg-red-50'
                            : alert.priority === 'medium'
                            ? 'border-yellow-200 bg-yellow-50'
                            : 'border-blue-200 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {alert.title || 'Alert'}
                              </h4>
                              <Badge
                                variant={
                                  alert.priority === 'high'
                                    ? 'destructive'
                                    : alert.priority === 'medium'
                                    ? 'secondary'
                                    : 'outline'
                                }
                              >
                                {alert.priority?.toUpperCase() || 'LOW'}
                              </Badge>
                              {!alert.read && (
                                <Badge variant="outline" className="text-red-600 border-red-600">
                                  UNREAD
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              {alert.message}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>
                                {new Date(alert.createdAt).toLocaleString()}
                              </span>
                              {alert.incident && (
                                <span>Incident: {alert.incident.description || 'Related incident'}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // Mark as read functionality could be added here
                                console.log('Mark alert as read:', alert._id);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  View detailed analytics and reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Analytics charts would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
