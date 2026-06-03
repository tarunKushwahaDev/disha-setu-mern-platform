export interface Mentor {
  id: string;
  name: string;
  title: string;
  organization: string;
  expertise: string[];
  location: string;
  avatar?: string;
  bio: string;
  rating: number;
  menteeCount: number;
  isVerified: boolean;
  availability: 'available' | 'limited' | 'unavailable';
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: 'student' | 'mentor' | 'alumni';
  };
  category: string;
  createdAt: string;
  replies: number;
  likes: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'webinar' | 'workshop' | 'meetup' | 'career-fair';
  isOnline: boolean;
  registrations: number;
  maxCapacity: number;
}

export const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    title: 'Senior Software Engineer',
    organization: 'Tech Solutions India',
    expertise: ['Software Development', 'Career Guidance', 'Interview Prep'],
    location: 'Lucknow, UP',
    bio: 'First-generation graduate helping students navigate tech careers. 10+ years in software development.',
    rating: 4.9,
    menteeCount: 45,
    isVerified: true,
    availability: 'available',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    title: 'Government Teacher',
    organization: 'Kendriya Vidyalaya',
    expertise: ['Education', 'Scholarship Guidance', 'Career Counseling'],
    location: 'Varanasi, UP',
    bio: 'Helping rural students access quality education and government schemes for 15 years.',
    rating: 4.8,
    menteeCount: 120,
    isVerified: true,
    availability: 'available',
  },
  {
    id: '3',
    name: 'Sunita Devi',
    title: 'Entrepreneur',
    organization: 'Local Crafts Co-op',
    expertise: ['Entrepreneurship', 'Handicrafts', 'Women Empowerment'],
    location: 'Jaipur, Rajasthan',
    bio: 'Started from a small village, now running a successful cooperative. Passionate about skill development.',
    rating: 4.7,
    menteeCount: 67,
    isVerified: true,
    availability: 'limited',
  },
  {
    id: '4',
    name: 'Amit Patel',
    title: 'Nursing Supervisor',
    organization: 'District Hospital',
    expertise: ['Healthcare', 'Nursing', 'Medical Education'],
    location: 'Ahmedabad, Gujarat',
    bio: 'Guiding aspiring healthcare professionals from underserved communities.',
    rating: 4.6,
    menteeCount: 38,
    isVerified: true,
    availability: 'available',
  },
];

export const forumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'How to prepare for government job exams?',
    content: 'I am from a village in UP and want to prepare for SSC exams. What resources are available for free?',
    author: { name: 'Ravi Singh', role: 'student' },
    category: 'Career Guidance',
    createdAt: '2024-03-15',
    replies: 23,
    likes: 45,
  },
  {
    id: '2',
    title: 'Scholarship application tips for first-generation learners',
    content: 'Sharing my experience on how I got multiple scholarships. Hope this helps others!',
    author: { name: 'Priya Kumari', role: 'alumni' },
    category: 'Scholarships',
    createdAt: '2024-03-14',
    replies: 56,
    likes: 134,
  },
  {
    id: '3',
    title: 'ITI vs Polytechnic - Which is better?',
    content: 'After 10th, should I go for ITI or Polytechnic diploma? Need guidance from seniors.',
    author: { name: 'Akash Yadav', role: 'student' },
    category: 'Education',
    createdAt: '2024-03-13',
    replies: 31,
    likes: 67,
  },
  {
    id: '4',
    title: 'Success Story: From village to software engineer',
    content: 'My journey from a small village in Bihar to working at a tech company. Never give up!',
    author: { name: 'Mentor Rajesh', role: 'mentor' },
    category: 'Success Stories',
    createdAt: '2024-03-12',
    replies: 89,
    likes: 256,
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Scholarship Application Workshop',
    description: 'Learn how to find and apply for government scholarships effectively',
    date: '2024-04-05',
    time: '3:00 PM',
    type: 'webinar',
    isOnline: true,
    registrations: 234,
    maxCapacity: 500,
  },
  {
    id: '2',
    title: 'Career in Healthcare - Panel Discussion',
    description: 'Doctors and nurses share their journey and answer your questions',
    date: '2024-04-12',
    time: '5:00 PM',
    type: 'webinar',
    isOnline: true,
    registrations: 156,
    maxCapacity: 300,
  },
  {
    id: '3',
    title: 'Local Skill Development Fair',
    description: 'Meet skill development centers and employers in your area',
    date: '2024-04-20',
    time: '10:00 AM',
    type: 'career-fair',
    isOnline: false,
    registrations: 89,
    maxCapacity: 200,
  },
];
