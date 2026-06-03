'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/use-translation';
import {
  Users,
  BookOpen,
  Award,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Settings,
  BarChart3,
  Calendar,
  Bell,
} from 'lucide-react';

// Mock data for mentor dashboard
const assignedStudents = [
  { id: 1, name: 'Priya Sharma', stream: 'Science', progress: 75, status: 'active' },
  { id: 2, name: 'Rahul Kumar', stream: 'Commerce', progress: 45, status: 'needs-attention' },
  { id: 3, name: 'Anita Devi', stream: 'Arts', progress: 90, status: 'active' },
  { id: 4, name: 'Vijay Singh', stream: 'Vocational', progress: 30, status: 'inactive' },
];

const pendingRequests = [
  { id: 1, student: 'Amit Patel', type: 'Career Guidance', date: '2 hours ago' },
  { id: 2, student: 'Sunita Yadav', type: 'Scholarship Help', date: '1 day ago' },
];

const upcomingSessions = [
  { id: 1, title: 'Career Counseling', students: 5, time: 'Today, 4:00 PM' },
  { id: 2, title: 'Scholarship Workshop', students: 12, time: 'Tomorrow, 10:00 AM' },
];

export default function MentorDashboard() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Dashboard Header */}
        <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Badge className="mb-2 bg-secondary text-secondary-foreground">Mentor Dashboard</Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Welcome back, Dr. Sharma
                </h1>
                <p className="text-muted-foreground mt-1">
                  You have 4 students awaiting guidance today
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  3 New
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">24</p>
                      <p className="text-xs text-muted-foreground">Active Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/30 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-xs text-muted-foreground">Pending Queries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">156</p>
                      <p className="text-xs text-muted-foreground">Sessions Done</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">89%</p>
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="students" className="space-y-6">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="students">My Students</TabsTrigger>
                <TabsTrigger value="requests">Requests</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="students" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Assigned Students
                    </CardTitle>
                    <CardDescription>
                      Track progress and provide guidance to your mentees
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignedStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary font-medium">
                                {student.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.stream}</p>
                            </div>
                          </div>
                          
                          <div className="flex-1 max-w-xs mx-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{student.progress}%</span>
                            </div>
                            <Progress value={student.progress} className="h-2" />
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                student.status === 'active'
                                  ? 'default'
                                  : student.status === 'needs-attention'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                            >
                              {student.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {student.status === 'needs-attention' && <AlertCircle className="w-3 h-3 mr-1" />}
                              {student.status === 'inactive' && <Clock className="w-3 h-3 mr-1" />}
                              {student.status.replace('-', ' ')}
                            </Badge>
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requests" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Pending Guidance Requests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pendingRequests.map((request) => (
                        <div
                          key={request.id}
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-foreground">{request.student}</p>
                            <p className="text-sm text-muted-foreground">
                              {request.type} - {request.date}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Decline
                            </Button>
                            <Button size="sm">Accept</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Upcoming Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingSessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-foreground">{session.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.students} students enrolled - {session.time}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Start Session
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Teaching Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border border-border rounded-lg">
                        <BookOpen className="w-8 h-8 text-primary mb-2" />
                        <h4 className="font-medium">Career Guidance Handbook</h4>
                        <p className="text-sm text-muted-foreground">Updated guidelines for mentors</p>
                        <Button variant="link" className="px-0 mt-2">Download PDF</Button>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <TrendingUp className="w-8 h-8 text-primary mb-2" />
                        <h4 className="font-medium">Industry Trends 2024</h4>
                        <p className="text-sm text-muted-foreground">Latest job market analysis</p>
                        <Button variant="link" className="px-0 mt-2">View Report</Button>
                      </div>
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
