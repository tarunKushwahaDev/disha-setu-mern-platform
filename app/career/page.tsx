'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CareerTimeline } from '@/components/career/career-timeline';
import { AptitudeQuiz } from '@/components/career/aptitude-quiz';
import { SkillIdentification } from '@/components/career/skill-identification';
import { CourseFinder } from '@/components/career/course-finder';
import { CareerOutcomes } from '@/components/career/career-outcomes';
import { MeshSyncPanel } from '@/components/mesh-sync-panel';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/lib/store/app-store';
import { cn } from '@/lib/utils';

export default function CareerPage() {
  const { t } = useTranslation();
  const careerStep = useAppStore((state) => state.careerStep);

  const renderStepContent = () => {
    switch (careerStep) {
      case 1:
        return <AptitudeQuiz />;
      case 2:
        return <SkillIdentification />;
      case 3:
        return <CourseFinder />;
      case 4:
        return <CareerOutcomes />;
      default:
        return <AptitudeQuiz />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {t('career.title')}
            </h1>
            <p className="text-muted-foreground">{t('career.subtitle')}</p>
          </div>

          {/* Timeline */}
          <div className="mb-12 bg-card border border-border rounded-xl p-6">
            <CareerTimeline />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6">
                {renderStepContent()}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <MeshSyncPanel />

              {/* Quick Tips */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Quick Tips</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      1
                    </span>
                    Answer honestly - there are no right or wrong answers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      2
                    </span>
                    Explore multiple career paths before deciding
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      3
                    </span>
                    Connect with mentors in your preferred field
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
