'use client';

import { CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { applicationStatuses } from '@/lib/data/scholarship-data';
import { cn } from '@/lib/utils';

export function ApplicationTracker() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-semibold text-foreground mb-6">Your Applications</h3>

      {applicationStatuses.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No applications yet</p>
          <p className="text-sm mt-1">Apply for scholarships to track them here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {applicationStatuses.map((app) => {
            const getStatusConfig = (status: string) => {
              switch (status) {
                case 'approved':
                  return {
                    icon: CheckCircle,
                    label: 'Approved',
                    color: 'text-success',
                  };
                case 'under-review':
                  return {
                    icon: Clock,
                    label: 'Under Review',
                    color: 'text-warning-foreground',
                  };
                case 'rejected':
                  return {
                    icon: AlertCircle,
                    label: 'Rejected',
                    color: 'text-destructive',
                  };
                default:
                  return {
                    icon: Clock,
                    label: 'Pending',
                    color: 'text-muted-foreground',
                  };
              }
            };

            const statusConfig = getStatusConfig(app.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div key={app.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-foreground">{app.scholarshipName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Applied on{' '}
                      {new Date(app.appliedDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div
                    className={cn(
                      'flex items-center gap-1 text-sm font-medium',
                      statusConfig.color
                    )}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {statusConfig.label}
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center">
                  {app.steps.map((step, index) => {
                    const isCompleted = index < app.currentStep;
                    const isCurrent = index === app.currentStep - 1;

                    return (
                      <div key={index} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div
                            className={cn(
                              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                              isCompleted
                                ? 'bg-success text-success-foreground'
                                : isCurrent
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            )}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <span
                            className={cn(
                              'text-xs mt-1 text-center hidden sm:block',
                              isCompleted || isCurrent
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                            )}
                          >
                            {step}
                          </span>
                        </div>
                        {index < app.steps.length - 1 && (
                          <div
                            className={cn(
                              'h-0.5 flex-1 mx-1',
                              isCompleted ? 'bg-success' : 'bg-border'
                            )}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <button className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
