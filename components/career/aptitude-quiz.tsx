'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/lib/store/app-store';
import { aptitudeQuestions } from '@/lib/data/career-data';
import { cn } from '@/lib/utils';

export function AptitudeQuiz() {
  const { t, language } = useTranslation();
  const quizAnswers = useAppStore((state) => state.quizAnswers);
  const setQuizAnswer = useAppStore((state) => state.setQuizAnswer);
  const setQuizResult = useAppStore((state) => state.setQuizResult);
  const setCareerStep = useAppStore((state) => state.setCareerStep);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  const question = aptitudeQuestions[currentQuestion];
  const totalQuestions = aptitudeQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleSelectAnswer = (optionValue: string) => {
    setQuizAnswer(question.id, optionValue);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Calculate results based on answers
    const answerValues = Object.values(quizAnswers);
    const categoryCounts: Record<string, number> = {};
    
    answerValues.forEach((value) => {
      categoryCounts[value] = (categoryCounts[value] || 0) + 1;
    });

    // Find top strengths
    const sortedCategories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const strengthMap: Record<string, string> = {
      analytical: 'Analytical Thinking',
      creative: 'Creativity',
      social: 'Social Skills',
      practical: 'Practical Skills',
      stem: 'STEM Aptitude',
      arts: 'Artistic Expression',
      humanities: 'Humanities',
      vocational: 'Vocational Skills',
    };

    const streamMap: Record<string, string[]> = {
      analytical: ['engineering', 'business'],
      creative: ['arts', 'education'],
      social: ['healthcare', 'education'],
      practical: ['skilled-trades', 'engineering'],
      stem: ['engineering', 'healthcare'],
      arts: ['arts', 'education'],
      humanities: ['education', 'business'],
      vocational: ['skilled-trades'],
    };

    const strengths = sortedCategories.map(([key]) => strengthMap[key] || key);
    const recommendedStreams = new Set<string>();
    sortedCategories.forEach(([key]) => {
      (streamMap[key] || []).forEach((stream) => recommendedStreams.add(stream));
    });

    setQuizResult({
      category: sortedCategories[0]?.[0] || 'general',
      score: Math.round((Object.keys(quizAnswers).length / totalQuestions) * 100),
      strengths,
      recommendedStreams: Array.from(recommendedStreams).slice(0, 3),
    });

    setIsCompleting(false);
    setCareerStep(2);
  };

  const currentAnswer = quizAnswers[question.id];
  const canProceed = !!currentAnswer;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            {t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {totalQuestions}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-primary">{currentQuestion + 1}</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground leading-tight">
              {language === 'hi' && question.questionHi
                ? question.questionHi
                : question.question}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {t('quiz.select')}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = currentAnswer === option.value;
            return (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.value)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all',
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {isSelected ? <Check className="w-4 h-4" /> : option.id.toUpperCase()}
                </div>
                <span
                  className={cn(
                    'font-medium',
                    isSelected ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {language === 'hi' && option.textHi ? option.textHi : option.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentQuestion === 0}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            'text-muted-foreground hover:text-foreground hover:bg-muted',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          {t('career.back')}
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleComplete}
            disabled={!canProceed || isCompleting}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
              'bg-primary text-primary-foreground hover:bg-primary/90',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {isCompleting ? (
              <>
                <Sparkles className="w-4 h-4 animate-pulse" />
                Processing...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                {t('career.complete')}
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
              'bg-primary text-primary-foreground hover:bg-primary/90',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {t('career.next')}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
