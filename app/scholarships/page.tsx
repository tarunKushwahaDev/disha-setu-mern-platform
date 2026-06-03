'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ScholarshipFinder } from '@/components/scholarship/scholarship-finder';
import { ApplicationTracker } from '@/components/scholarship/application-tracker';
import { MeshSyncPanel } from '@/components/mesh-sync-panel';

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ScholarshipFinder />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ApplicationTracker />
              <MeshSyncPanel />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
