'use client';

import { useState } from 'react';
import { Users, MessageCircle, Calendar } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MentorNetwork, ForumSection, EventsSection } from '@/components/community/community-sections';
import { MeshSyncPanel } from '@/components/mesh-sync-panel';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'mentors', labelKey: 'community.mentors', icon: Users },
  { id: 'forums', labelKey: 'community.forums', icon: MessageCircle },
  { id: 'events', labelKey: 'community.events', icon: Calendar },
];

export default function CommunityPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('mentors');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {t('community.title')}
            </h1>
            <p className="text-muted-foreground">{t('community.subtitle')}</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors',
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {t(tab.labelKey)}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'mentors' && <MentorNetwork />}
              {activeTab === 'forums' && <ForumSection />}
              {activeTab === 'events' && <EventsSection />}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <MeshSyncPanel />

              {/* Community Stats */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Community Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Mentors</span>
                    <span className="font-semibold text-foreground">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Students Helped</span>
                    <span className="font-semibold text-foreground">2,340</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Forum Discussions</span>
                    <span className="font-semibold text-foreground">890</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Upcoming Events</span>
                    <span className="font-semibold text-foreground">12</span>
                  </div>
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
