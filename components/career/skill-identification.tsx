'use client';

import { ChevronRight, Check, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/lib/store/app-store';
import { careerStreams } from '@/lib/data/career-data';
import { cn } from '@/lib/utils';

export function SkillIdentification() {
  const { t, language } = useTranslation();
  const quizResult = useAppStore((state) => state.quizResult);
  const setCareerStep = useAppStore((state) => state.setCareerStep);

  const recommendedStreams = careerStreams.filter((stream) =>
    quizResult?.recommendedStreams.includes(stream.id)
  );

  const otherStreams = careerStreams.filter(
    (stream) => !quizResult?.recommendedStreams.includes(stream.id)
  );

  const handleSelectStream = () => {
    setCareerStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Star className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Your Strengths
            </h3>
            <div className="flex flex-wrap gap-2">
              {quizResult?.strengths.map((strength, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Streams */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-success" />
          Recommended for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedStreams.map((stream) => (
            <button
              key={stream.id}
              onClick={handleSelectStream}
              className={cn(
                'text-left p-6 rounded-xl border-2 transition-all',
                'border-primary bg-primary/5 hover:bg-primary/10'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{stream.icon}</span>
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                  Best Match
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                {language === 'hi' && stream.nameHi ? stream.nameHi : stream.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'hi' && stream.descriptionHi
                  ? stream.descriptionHi
                  : stream.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {stream.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Other Streams */}
      <div>
        <h3 className="text-lg font-semibold text-muted-foreground mb-4">
          Other Career Streams
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherStreams.map((stream) => (
            <button
              key={stream.id}
              onClick={handleSelectStream}
              className={cn(
                'text-left p-6 rounded-xl border transition-all',
                'border-border hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <span className="text-2xl mb-3 block">{stream.icon}</span>
              <h4 className="font-semibold text-foreground mb-2">
                {language === 'hi' && stream.nameHi ? stream.nameHi : stream.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'hi' && stream.descriptionHi
                  ? stream.descriptionHi
                  : stream.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSelectStream}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg font-medium',
            'bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
          )}
        >
          Continue to Course Finder
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
