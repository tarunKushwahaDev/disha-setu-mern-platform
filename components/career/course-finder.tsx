'use client';

import { useState } from 'react';
import { MapPin, Building, GraduationCap, IndianRupee, ChevronRight, ExternalLink, Filter } from 'lucide-react';
import { useAppStore } from '@/lib/store/app-store';
import { sampleColleges } from '@/lib/data/career-data';
import { cn } from '@/lib/utils';

const states = [
  'All States',
  'Uttar Pradesh',
  'Maharashtra',
  'Bihar',
  'Rajasthan',
  'Tamil Nadu',
  'Karnataka',
];

const collegeTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'government', label: 'Government' },
  { value: 'skill-center', label: 'Skill Centers' },
  { value: 'private', label: 'Private' },
];

export function CourseFinder() {
  const setCareerStep = useAppStore((state) => state.setCareerStep);
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredColleges = sampleColleges.filter((college) => {
    const stateMatch = selectedState === 'All States' || college.state === selectedState;
    const typeMatch = selectedType === 'all' || college.type === selectedType;
    return stateMatch && typeMatch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'government':
        return 'bg-success/10 text-success border-success/20';
      case 'skill-center':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Find Courses & Colleges Near You
        </h3>
        <p className="text-muted-foreground">
          Discover government colleges and skill development centers in your area
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-4 md:hidden"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className={cn('flex flex-col md:flex-row gap-4', !showFilters && 'hidden md:flex')}>
          <div className="flex-1">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              State / Region
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Institution Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {collegeTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4 mb-8">
        {filteredColleges.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-xl">
            <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No institutions found matching your criteria
            </p>
            <button
              onClick={() => {
                setSelectedState('All States');
                setSelectedType('all');
              }}
              className="mt-4 text-primary hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredColleges.map((college) => (
            <div
              key={college.id}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground">{college.name}</h4>
                    <span
                      className={cn(
                        'px-2 py-0.5 text-xs font-medium rounded-full border',
                        getTypeColor(college.type)
                      )}
                    >
                      {college.type === 'skill-center' ? 'Skill Center' : college.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {college.district}, {college.state}
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {college.fees}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {college.courses.map((course, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                      >
                        <GraduationCap className="w-3 h-3" />
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="flex items-center gap-1 text-primary hover:underline text-sm font-medium whitespace-nowrap">
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setCareerStep(4)}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg font-medium',
            'bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
          )}
        >
          See Career Outcomes
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
