'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  MapPin,
  Building2,
  Search,
  Download,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  RefreshCw,
  Settings,
  Shield,
} from 'lucide-react';

// Mock statistics
const platformStats = {
  totalUsers: 125847,
  activeStudents: 89234,
  mentors: 2456,
  scholarshipsAwarded: 15678,
  placementRate: 78,
};

const stateWiseData = [
  { state: 'Uttar Pradesh', students: 28456, scholarships: 3245, placement: 72 },
  { state: 'Maharashtra', students: 19823, scholarships: 2890, placement: 81 },
  { state: 'Bihar', students: 15234, scholarships: 1876, placement: 68 },
  { state: 'Madhya Pradesh', students: 12456, scholarships: 1567, placement: 74 },
  { state: 'Rajasthan', students: 10234, scholarships: 1234, placement: 71 },
];

const recentAlerts = [
  { id: 1, type: 'warning', message: 'Scholarship deadline approaching for PM Vidya Lakshmi', time: '2 hours ago' },
  { id: 2, type: 'info', message: 'New skill center registered in Jaipur, Rajasthan', time: '5 hours ago' },
  { id: 3, type: 'success', message: '500+ students placed through campus drive', time: '1 day ago' },
];

const pendingApprovals = [
  { id: 1, type: 'Mentor Registration', name: 'Dr. Ramesh Kumar', institution: 'IIT Delhi', submitted: '2 days ago' },
  { id: 2, type: 'Skill Center', name: 'Digital Skills Academy', location: 'Lucknow', submitted: '3 days ago' },
  { id: 3, type: 'Scholarship Scheme', name: 'State Merit Scholarship', state: 'Gujarat', submitted: '1 week ago' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Admin Header */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-8 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Badge className="mb-2 bg-primary">Government Admin Panel</Badge>
                <h1 className="text-2xl md:text-3xl font-bold">
                  DishaSetu Administration
                </h1>
                <p className="text-slate-300 mt-1">
                  Ministry of Skill Development & Entrepreneurship
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="bg-transparent border-white/30 text-white hover:bg-white/10">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button size="sm" className="bg-white text-slate-900 hover:bg-white/90">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Statistics */}
        <section className="py-6 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {platformStats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <GraduationCap className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {platformStats.activeStudents.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Active Students</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {platformStats.mentors.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Verified Mentors</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 mx-auto text-amber-600 mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {platformStats.scholarshipsAwarded.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Scholarships Given</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    {platformStats.placementRate}%
                  </p>
                  <p className="text-xs text-muted-foreground">Placement Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Admin Content */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="w-full md:w-auto flex-wrap">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="approvals">Approvals</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="schemes">Schemes</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* State-wise Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        State-wise Performance
                      </CardTitle>
                      <CardDescription>
                        Student enrollment and outcomes by state
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {stateWiseData.map((state, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{state.state}</span>
                              <span className="text-muted-foreground">
                                {state.students.toLocaleString()} students
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <Progress value={state.placement} className="h-2" />
                              </div>
                              <span className="text-xs text-muted-foreground w-12">
                                {state.placement}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-auto py-4 flex-col">
                          <FileSpreadsheet className="w-6 h-6 mb-2" />
                          <span className="text-xs">Generate Report</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex-col">
                          <Building2 className="w-6 h-6 mb-2" />
                          <span className="text-xs">Add Skill Center</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex-col">
                          <Award className="w-6 h-6 mb-2" />
                          <span className="text-xs">New Scholarship</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex-col">
                          <RefreshCw className="w-6 h-6 mb-2" />
                          <span className="text-xs">Sync Data</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          {alert.type === 'warning' && (
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                          )}
                          {alert.type === 'info' && (
                            <Activity className="w-5 h-5 text-blue-500 mt-0.5" />
                          )}
                          {alert.type === 'success' && (
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{alert.message}</p>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="approvals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Pending Approvals</CardTitle>
                        <CardDescription>Review and approve registrations</CardDescription>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search..." className="pl-9 w-64" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pendingApprovals.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg gap-4"
                        >
                          <div>
                            <Badge variant="outline" className="mb-2">{item.type}</Badge>
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.institution || item.location || item.state} - Submitted {item.submitted}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Review</Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              Reject
                            </Button>
                            <Button size="sm">Approve</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Analytics & Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 border border-border rounded-lg text-center">
                        <PieChart className="w-12 h-12 mx-auto text-primary mb-3" />
                        <h4 className="font-medium">Student Distribution</h4>
                        <p className="text-sm text-muted-foreground">By category and region</p>
                        <Button variant="link" className="mt-2">View Report</Button>
                      </div>
                      <div className="p-4 border border-border rounded-lg text-center">
                        <BarChart3 className="w-12 h-12 mx-auto text-primary mb-3" />
                        <h4 className="font-medium">Placement Analytics</h4>
                        <p className="text-sm text-muted-foreground">Industry-wise placement data</p>
                        <Button variant="link" className="mt-2">View Report</Button>
                      </div>
                      <div className="p-4 border border-border rounded-lg text-center">
                        <TrendingUp className="w-12 h-12 mx-auto text-primary mb-3" />
                        <h4 className="font-medium">Growth Metrics</h4>
                        <p className="text-sm text-muted-foreground">Monthly progress tracking</p>
                        <Button variant="link" className="mt-2">View Report</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schemes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Government Schemes</CardTitle>
                    <CardDescription>Add, edit, or deactivate scholarship and skill development schemes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Scheme management interface</p>
                      <Button className="mt-4">Add New Scheme</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>System Notifications</CardTitle>
                    <CardDescription>Broadcast alerts to users across the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <AlertTriangle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Alert broadcast system</p>
                      <Button className="mt-4">Create Alert</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
