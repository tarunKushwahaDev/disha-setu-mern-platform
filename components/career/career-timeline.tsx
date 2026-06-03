'use client';

import { Check, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/lib/store/app-store';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, labelKey: 'career.step1.title', descKey: 'career.step1.desc' },
  { id: 2, labelKey: 'career.step2.title', descKey: 'career.step2.desc' },
  { id: 3, labelKey: 'career.step3.title', descKey: 'career.step3.desc' },
  { id: 4, labelKey: 'career.step4.title', descKey: 'career.step4.desc' },
];

export function CareerTimeline() {
  const { t } = useTranslation();
  const careerStep = useAppStore((state) => state.careerStep);

  return (
    <div className="w-full">
      {/* Desktop Timeline - Horizontal */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Progress Line Background */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-border z-0" />
        
        {/* Progress Line Filled */}
        <div
          className="absolute top-6 left-0 h-1 bg-primary z-0 transition-all duration-500"
          style={{ width: `${((careerStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = careerStep > step.id;
          const isCurrent = careerStep === step.id;

          return (
            <div
              key={step.id}
              className={cn(
                'relative z-10 flex flex-col items-center',
                index === 0 && 'items-start',
                index === steps.length - 1 && 'items-end'
              )}
              style={{ width: `${100 / steps.length}%` }}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center',
                  'border-4 transition-all duration-300',
                  isCompleted && 'bg-primary border-primary text-primary-foreground',
                  isCurrent && 'bg-background border-primary text-primary scale-110',
                  !isCompleted && !isCurrent && 'bg-background border-border text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-bold">{step.id}</span>
                )}
              </div>

              {/* Step Label */}
              <div
                className={cn(
                  'mt-4 text-center',
                  index === 0 && 'text-left',
                  index === steps.length - 1 && 'text-right'
                )}
              >
                <p
                  className={cn(
                    'font-semibold text-sm',
                    isCurrent && 'text-primary',
                    isCompleted && 'text-foreground',
                    !isCurrent && !isCompleted && 'text-muted-foreground'
                  )}
                >
                  {t(step.labelKey)}
                </p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[150px]">
                  {t(step.descKey)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Timeline - Vertical */}
      <div className="md:hidden space-y-4">
        {steps.map((step, index) => {
          const isCompleted = careerStep > step.id;
          const isCurrent = careerStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex gap-4">
              {/* Vertical line and circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                    'border-2 transition-all duration-300',
                    isCompleted && 'bg-primary border-primary text-primary-foreground',
                    isCurrent && 'bg-background border-primary text-primary',
                    !isCompleted && !isCurrent && 'bg-background border-border text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="font-bold text-sm">{step.id}</span>
                  )}
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      'w-0.5 flex-1 min-h-[40px] transition-colors',
                      isCompleted ? 'bg-primary' : 'bg-border'
                    )}
                  />
                )}
              </div>

              {/* Content */}
              <div
                className={cn(
                  'flex-1 pb-4',
                  isCurrent && 'bg-primary/5 -mx-2 px-2 rounded-lg py-2'
                )}
              >
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      'font-semibold',
                      isCurrent && 'text-primary',
                      isCompleted && 'text-foreground',
                      !isCurrent && !isCompleted && 'text-muted-foreground'
                    )}
                  >
                    {t(step.labelKey)}
                  </p>
                  {isCurrent && (
                    <ChevronRight className="w-4 h-4 text-primary animate-pulse" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {t(step.descKey)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
