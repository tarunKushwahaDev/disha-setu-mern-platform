'use client';

import Link from 'next/link';
import {
  Map,
  GraduationCap,
  Users,
  TrendingUp,
  Bell,
  FileText,
  ChevronRight,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MeshSyncPanel } from '@/components/mesh-sync-panel';
import { ConnectivityBadge } from '@/components/connectivity-badge';
import { useAppStore } from '@/lib/store/app-store';
import { cn } from '@/lib/utils';

const quickActions = [
  {
    icon: Map,
    label: 'Continue Career Quiz',
    href: '/career',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: GraduationCap,
    label: 'Browse Scholarships',
    href: '/scholarships',
    color: 'bg-success/10 text-success',
  },
  {
    icon: Users,
    label: 'Find a Mentor',
    href: '/community',
    color: 'bg-chart-4/10 text-chart-4',
  },
];

const recentNotifications = [
  {
    id: '1',
    type: 'scholarship',
    title: 'New Scholarship Available',
    message: 'AICTE Pragati Scholarship deadline extended',
    time: '2 hours ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'mentor',
    title: 'Mentor Request Accepted',
    message: 'Dr. Priya Sharma accepted your connection',
    time: '1 day ago',
    isRead: true,
  },
  {
    id: '3',
    type: 'application',
    title: 'Application Update',
    message: 'Your scholarship application is under review',
    time: '3 days ago',
    isRead: true,
  },
];

export default function DashboardPage() {
  const user = useAppStore((state) => state.user);
  const quizResult = useAppStore((state) => state.quizResult);
  const careerStep = useAppStore((state) => state.careerStep);

  // Mock data for demonstration
  const progress = {
    quizCompleted: careerStep > 1,
    profileComplete: 60,
    scholarshipsApplied: 2,
    mentorsConnected: 1,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Welcome back{user?.name ? `, ${user.name}` : ''}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your progress and continue your journey
              </p>
            </div>
            <ConnectivityBadge />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Overview */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-semibold text-foreground mb-4">Your Progress</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {progress.quizCompleted ? '100%' : `${(careerStep / 4) * 100}%`}
                    </p>
                    <p className="text-sm text-muted-foreground">Quiz Progress</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{progress.profileComplete}%</p>
                    <p className="text-sm text-muted-foreground">Profile Complete</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{progress.scholarshipsApplied}</p>
                    <p className="text-sm text-muted-foreground">Applications</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{progress.mentorsConnected}</p>
                    <p className="text-sm text-muted-foreground">Mentors</p>
                  </div>
                </div>

                {/* Career Path Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Career Mapping Progress</span>
                    <span className="text-sm text-primary">{careerStep}/4 steps</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500 rounded-full"
                      style={{ width: `${(careerStep / 4) * 100}%` }}
                    />
                  </div>
                </div>

                {quizResult && (
                  <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Your Top Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {quizResult.strengths.map((strength, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={action.href}
                        href={action.href}
                        className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', action.color)}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                            {action.label}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Recent Updates
                  </h2>
                  <button className="text-sm text-primary hover:underline">View All</button>
                </div>

                <div className="space-y-3">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        'flex items-start gap-3 p-3 rounded-lg transition-colors',
                        notification.isRead ? 'bg-muted/30' : 'bg-primary/5'
                      )}
                    >
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                          notification.isRead ? 'bg-muted-foreground' : 'bg-primary'
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">{notification.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <MeshSyncPanel />

              {/* Profile Completion */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Complete Your Profile</h3>
                <div className="space-y-3">
                  <ProfileTask completed label="Basic Information" />
                  <ProfileTask completed={progress.quizCompleted} label="Aptitude Quiz" />
                  <ProfileTask completed={false} label="Upload Documents" />
                  <ProfileTask completed={false} label="Add Education Details" />
                  <ProfileTask completed={progress.mentorsConnected > 0} label="Connect with Mentor" />
                </div>
              </div>

              {/* Resources */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Helpful Resources</h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Guide: How to Apply for Scholarships
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Career Options After 10th/12th
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Top Government Job Preparation Tips
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ProfileTask({ completed, label }: { completed: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3">
      {completed ? (
        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
      ) : (
        <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      )}
      <span
        className={cn(
          'text-sm',
          completed ? 'text-muted-foreground line-through' : 'text-foreground'
        )}
      >
        {label}
      </span>
    </div>
  );
}
