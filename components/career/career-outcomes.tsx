'use client';

import { TrendingUp, IndianRupee, Award, Briefcase, ArrowRight, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/lib/store/app-store';
import { careerOutcomes } from '@/lib/data/career-data';
import { cn } from '@/lib/utils';

export function CareerOutcomes() {
  const { language } = useTranslation();
  const quizResult = useAppStore((state) => state.quizResult);
  const setCareerStep = useAppStore((state) => state.setCareerStep);
  const clearQuizAnswers = useAppStore((state) => state.clearQuizAnswers);

  const relevantCareers = careerOutcomes.filter(
    (career) =>
      quizResult?.recommendedStreams.some((stream) =>
        career.pathwayFrom.includes(stream)
      )
  );

  const handleStartOver = () => {
    clearQuizAnswers();
    setCareerStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Message */}
      <div className="bg-success/10 border border-success/20 rounded-xl p-6 mb-8 text-center">
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Your Career Path is Ready!
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Based on your aptitude and interests, here are career opportunities that
          match your profile.
        </p>
      </div>

      {/* Career Cards */}
      <div className="grid gap-6 mb-8">
        {relevantCareers.length > 0 ? (
          relevantCareers.map((career) => (
            <div
              key={career.id}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Career Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {language === 'hi' && career.titleHi
                          ? career.titleHi
                          : career.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {career.description}
                      </p>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {career.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap lg:flex-col gap-4 lg:gap-2 lg:text-right">
                  <div className="flex items-center gap-2 lg:justify-end">
                    <IndianRupee className="w-4 h-4 text-success" />
                    <span className="font-semibold text-foreground">
                      {career.averageSalary}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 lg:justify-end text-sm">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      Growth: {career.growthRate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Start your journey towards this career
                </span>
                <button className="flex items-center gap-2 text-primary hover:underline text-sm font-medium">
                  View Full Pathway
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          // Show all careers if no specific matches
          careerOutcomes.map((career) => (
            <div
              key={career.id}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {career.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {career.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-success" />
                  <span className="font-semibold">{career.averageSalary}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleStartOver}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg font-medium',
            'border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
          )}
        >
          <RotateCcw className="w-4 h-4" />
          Start Over
        </button>
        <a
          href="/scholarships"
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg font-medium',
            'bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
          )}
        >
          Find Scholarships
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
