'use client';

import { useState } from 'react';
import {
  Search,
  MapPin,
  Star,
  Users,
  CheckCircle,
  MessageCircle,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { mentors, type Mentor } from '@/lib/data/community-data';
import { cn } from '@/lib/utils';

export function MentorNetwork() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase())) ||
      mentor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAvailabilityConfig = (availability: Mentor['availability']) => {
    switch (availability) {
      case 'available':
        return { label: 'Available', color: 'bg-success/10 text-success' };
      case 'limited':
        return { label: 'Limited', color: 'bg-warning/10 text-warning-foreground' };
      default:
        return { label: 'Unavailable', color: 'bg-muted text-muted-foreground' };
    }
  };

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, expertise, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Mentor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMentors.map((mentor) => {
          const availConfig = getAvailabilityConfig(mentor.availability);

          return (
            <div
              key={mentor.id}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">
                    {mentor.name.charAt(0)}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground truncate">{mentor.name}</h4>
                    {mentor.isVerified && (
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {mentor.title} at {mentor.organization}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {mentor.location}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-4 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Star className="w-4 h-4 text-warning" />
                  {mentor.rating}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {mentor.menteeCount} mentees
                </span>
                <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', availConfig.color)}>
                  {availConfig.label}
                </span>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {mentor.expertise.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
                >
                  View Profile
                </button>
                {mentor.availability !== 'unavailable' && (
                  <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-xl">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No mentors found matching your search</p>
        </div>
      )}

      {/* Mentor Detail Modal */}
      {selectedMentor && (
        <MentorDetailModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
      )}
    </div>
  );
}

function MentorDetailModal({ mentor, onClose }: { mentor: Mentor; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{mentor.name.charAt(0)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">{mentor.name}</h2>
              {mentor.isVerified && <CheckCircle className="w-5 h-5 text-primary" />}
            </div>
            <p className="text-muted-foreground">
              {mentor.title} at {mentor.organization}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              {mentor.location}
            </p>
          </div>
        </div>

        <p className="text-muted-foreground mb-6">{mentor.bio}</p>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="font-semibold flex items-center gap-1">
                <Star className="w-4 h-4 text-warning" />
                {mentor.rating}/5
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mentees Helped</p>
              <p className="font-semibold">{mentor.menteeCount}+</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Close
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Calendar className="w-4 h-4" />
            Schedule Session
          </button>
        </div>
      </div>
    </div>
  );
}

export function ForumSection() {
  const { forumPosts } = require('@/lib/data/community-data');

  return (
    <div className="space-y-4">
      {forumPosts.map((post: any) => (
        <div
          key={post.id}
          className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString('en-IN')}
            </span>
          </div>

          <h4 className="font-semibold text-foreground mb-2">{post.title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.content}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-medium">{post.author.name.charAt(0)}</span>
              </div>
              <span className="text-sm text-muted-foreground">{post.author.name}</span>
              {post.author.role === 'mentor' && (
                <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded">Mentor</span>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.replies} replies</span>
              <span>{post.likes} likes</span>
            </div>
          </div>
        </div>
      ))}

      <button className="w-full py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors flex items-center justify-center gap-2">
        View All Discussions
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export function EventsSection() {
  const { events } = require('@/lib/data/community-data');

  return (
    <div className="space-y-4">
      {events.map((event: any) => (
        <div
          key={event.id}
          className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={cn(
                    'px-2 py-0.5 text-xs font-medium rounded-full',
                    event.type === 'webinar' ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'
                  )}
                >
                  {event.type === 'webinar' ? 'Online Webinar' : event.type}
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
                <span>{event.time}</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-2">
                {event.registrations}/{event.maxCapacity} registered
              </p>
              <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
