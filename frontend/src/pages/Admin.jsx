import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Activity
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleViewTourist = (touristId) => {
    navigate(`/touristdetails/${touristId}`);
  };

  // Mock data for demonstration
  const stats = [
    { title: "Total Tourists", value: "1,247", icon: Users, change: "+12%" },
    { title: "Active Alerts", value: "23", icon: AlertTriangle, change: "-5%" },
    { title: "Safe Zones", value: "89", icon: Shield, change: "+3%" },
    { title: "Incidents Today", value: "7", icon: Activity, change: "-8%" },
  ];

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
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
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
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
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
            <TabsTrigger value="tourists">Tourists</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Map View */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Live Map View</CardTitle>
                  <CardDescription>
                    Real-time location of all registered tourists
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive map would be displayed here</p>
                    </div>
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

          <TabsContent value="tourists" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tourist Management</CardTitle>
                <CardDescription>
                  Manage and monitor all registered tourists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tourist</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tourists.map((tourist) => (
                      <TableRow key={tourist.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={tourist.avatar} alt={tourist.name} />
                              <AvatarFallback>{tourist.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{tourist.name}</div>
                              <div className="text-sm text-muted-foreground">{tourist.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Phone className="mr-2 h-3 w-3" />
                              {tourist.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={tourist.status === 'active' ? 'default' : 'secondary'}
                          >
                            {tourist.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{tourist.location}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {tourist.lastActive}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewTourist(tourist.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
                <CardDescription>
                  Monitor and respond to tourist safety alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No active alerts at the moment</p>
                </div>
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
