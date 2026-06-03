'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  Calendar,
  IndianRupee,
  Building,
  ChevronDown,
  ExternalLink,
  AlertCircle,
  Clock,
  CheckCircle,
  FileText,
  X,
} from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { scholarships, type Scholarship } from '@/lib/data/scholarship-data';
import { cn } from '@/lib/utils';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'central', label: 'Central Govt' },
  { value: 'state', label: 'State Govt' },
  { value: 'private', label: 'Private/Corporate' },
  { value: 'ngo', label: 'NGO' },
];

const states = [
  'All States',
  'Uttar Pradesh',
  'Maharashtra',
  'Bihar',
  'Rajasthan',
  'Tamil Nadu',
  'Karnataka',
  'West Bengal',
];

export function ScholarshipFinder() {
  const { t, language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('All States');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const filteredScholarships = scholarships.filter((scholarship) => {
    const searchMatch =
      scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch =
      selectedCategory === 'all' || scholarship.category === selectedCategory;
    const stateMatch =
      selectedState === 'All States' ||
      !scholarship.state ||
      scholarship.state === selectedState;
    return searchMatch && categoryMatch && stateMatch;
  });

  const getStatusConfig = (status?: string) => {
    switch (status) {
      case 'open':
        return {
          icon: CheckCircle,
          label: 'Open',
          color: 'bg-success/10 text-success border-success/20',
        };
      case 'closing-soon':
        return {
          icon: Clock,
          label: 'Closing Soon',
          color: 'bg-warning/10 text-warning-foreground border-warning/20',
        };
      case 'closed':
        return {
          icon: AlertCircle,
          label: 'Closed',
          color: 'bg-destructive/10 text-destructive border-destructive/20',
        };
      default:
        return {
          icon: CheckCircle,
          label: 'Open',
          color: 'bg-success/10 text-success border-success/20',
        };
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'central':
        return 'bg-primary/10 text-primary';
      case 'state':
        return 'bg-chart-2/10 text-chart-2';
      case 'private':
        return 'bg-chart-4/10 text-chart-4';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {t('scholarship.title')}
        </h1>
        <p className="text-muted-foreground">{t('scholarship.subtitle')}</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('common.search') + ' scholarships...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg text-muted-foreground"
          >
            <Filter className="w-4 h-4" />
            {t('common.filter')}
            <ChevronDown
              className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-180')}
            />
          </button>

          {/* Filters */}
          <div
            className={cn(
              'flex flex-col sm:flex-row gap-3',
              !showFilters && 'hidden lg:flex'
            )}
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:border-primary"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:border-primary"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredScholarships.length} scholarships
        </p>
      </div>

      {/* Scholarship Cards */}
      <div className="grid gap-4">
        {filteredScholarships.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-xl">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('common.noResults')}</p>
          </div>
        ) : (
          filteredScholarships.map((scholarship) => {
            const statusConfig = getStatusConfig(scholarship.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={scholarship.id}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={cn(
                          'px-2 py-0.5 text-xs font-medium rounded-full',
                          getCategoryColor(scholarship.category)
                        )}
                      >
                        {scholarship.category === 'central'
                          ? 'Central'
                          : scholarship.category === 'state'
                          ? 'State'
                          : scholarship.category}
                      </span>
                      <span
                        className={cn(
                          'flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border',
                          statusConfig.color
                        )}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {language === 'hi' && scholarship.nameHi
                        ? scholarship.nameHi
                        : scholarship.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {scholarship.provider}
                    </p>

                    <p className="text-sm text-muted-foreground mb-4">
                      {language === 'hi' && scholarship.descriptionHi
                        ? scholarship.descriptionHi
                        : scholarship.description}
                    </p>

                    {/* Eligibility Tags */}
                    <div className="flex flex-wrap gap-2">
                      {scholarship.eligibility.slice(0, 3).map((item, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                        >
                          {item}
                        </span>
                      ))}
                      {scholarship.eligibility.length > 3 && (
                        <span className="px-2 py-1 text-primary text-xs">
                          +{scholarship.eligibility.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Amount and Actions */}
                  <div className="lg:w-48 flex flex-row lg:flex-col justify-between lg:justify-start gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Amount</p>
                      <p className="font-semibold text-foreground flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        {scholarship.amount}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Deadline</p>
                      <p className="font-medium text-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(scholarship.deadline).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                      <button
                        onClick={() => setSelectedScholarship(scholarship)}
                        className="text-sm text-primary hover:underline"
                      >
                        {t('scholarship.details')}
                      </button>
                      {scholarship.status !== 'closed' && (
                        <button
                          className={cn(
                            'flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium',
                            'bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
                          )}
                        >
                          {t('scholarship.apply')}
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {selectedScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          onClose={() => setSelectedScholarship(null)}
          language={language}
        />
      )}
    </div>
  );
}

function ScholarshipDetailModal({
  scholarship,
  onClose,
  language,
}: {
  scholarship: Scholarship;
  onClose: () => void;
  language: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-foreground mb-2 pr-8">
          {language === 'hi' && scholarship.nameHi ? scholarship.nameHi : scholarship.name}
        </h2>
        <p className="text-muted-foreground mb-6">{scholarship.provider}</p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Description</h4>
            <p className="text-muted-foreground">
              {language === 'hi' && scholarship.descriptionHi
                ? scholarship.descriptionHi
                : scholarship.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">Eligibility Criteria</h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {scholarship.eligibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documents Required
            </h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {scholarship.documentsRequired.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-semibold text-foreground">{scholarship.amount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Deadline</p>
              <p className="font-semibold text-foreground">
                {new Date(scholarship.deadline).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {scholarship.status !== 'closed' && (
            <button
              className={cn(
                'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium',
                'bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
              )}
            >
              Apply Now
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
