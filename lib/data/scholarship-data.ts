export interface Scholarship {
  id: string;
  name: string;
  nameHi?: string;
  provider: string;
  category: 'central' | 'state' | 'private' | 'ngo';
  eligibility: string[];
  amount: string;
  deadline: string;
  state?: string;
  description: string;
  descriptionHi?: string;
  applicationUrl?: string;
  documentsRequired: string[];
  status?: 'open' | 'closing-soon' | 'closed';
}

export const scholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Post-Matric Scholarship for SC Students',
    nameHi: 'एससी छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति',
    provider: 'Ministry of Social Justice & Empowerment',
    category: 'central',
    eligibility: ['SC Category', 'Family Income < ₹2.5 LPA', 'Class 11 and above'],
    amount: 'Up to ₹1,200/month + fees',
    deadline: '2024-12-31',
    description: 'Financial assistance for SC students pursuing post-matriculation education',
    descriptionHi: 'पोस्ट-मैट्रिक शिक्षा प्राप्त करने वाले एससी छात्रों के लिए वित्तीय सहायता',
    documentsRequired: ['Caste Certificate', 'Income Certificate', 'Marksheet', 'Bank Details'],
    status: 'open',
  },
  {
    id: '2',
    name: 'Prime Minister Scholarship Scheme',
    nameHi: 'प्रधानमंत्री छात्रवृत्ति योजना',
    provider: 'Ministry of Defence',
    category: 'central',
    eligibility: ['Children of Ex-Servicemen', 'Professional Degree Course', 'First Year Student'],
    amount: '₹2,500 - ₹3,000/month',
    deadline: '2024-11-30',
    description: 'For wards of ex-servicemen pursuing professional degree courses',
    descriptionHi: 'पेशेवर डिग्री पाठ्यक्रम करने वाले पूर्व सैनिकों के बच्चों के लिए',
    documentsRequired: ['PPO Certificate', 'ESM Certificate', 'Admission Letter', 'Bank Details'],
    status: 'closing-soon',
  },
  {
    id: '3',
    name: 'National Means-cum-Merit Scholarship',
    nameHi: 'राष्ट्रीय साधन-सह-योग्यता छात्रवृत्ति',
    provider: 'Ministry of Education',
    category: 'central',
    eligibility: ['Class 9-12 Students', 'Family Income < ₹3.5 LPA', 'Minimum 55% in Class 8'],
    amount: '₹12,000/year',
    deadline: '2024-10-31',
    description: 'Merit-based scholarship for economically weaker students to continue secondary education',
    descriptionHi: 'माध्यमिक शिक्षा जारी रखने के लिए आर्थिक रूप से कमजोर छात्रों के लिए योग्यता-आधारित छात्रवृत्ति',
    documentsRequired: ['Income Certificate', 'Marksheet', 'School Bonafide', 'Bank Details'],
    status: 'open',
  },
  {
    id: '4',
    name: 'Uttar Pradesh Scholarship',
    nameHi: 'उत्तर प्रदेश छात्रवृत्ति',
    provider: 'UP Government',
    category: 'state',
    eligibility: ['UP Domicile', 'OBC/SC/ST/General EWS', 'Pre & Post Matric'],
    amount: 'Varies by course',
    deadline: '2024-12-15',
    state: 'Uttar Pradesh',
    description: 'State scholarship for students of various categories in Uttar Pradesh',
    descriptionHi: 'उत्तर प्रदेश में विभिन्न श्रेणियों के छात्रों के लिए राज्य छात्रवृत्ति',
    documentsRequired: ['Domicile Certificate', 'Caste Certificate', 'Income Certificate', 'Marksheet'],
    status: 'open',
  },
  {
    id: '5',
    name: 'AICTE Pragati Scholarship for Girls',
    nameHi: 'लड़कियों के लिए AICTE प्रगति छात्रवृत्ति',
    provider: 'AICTE',
    category: 'central',
    eligibility: ['Female Students', 'Technical Education', 'Family Income < ₹8 LPA'],
    amount: '₹50,000/year',
    deadline: '2024-11-15',
    description: 'Encouraging girls to pursue technical education',
    descriptionHi: 'लड़कियों को तकनीकी शिक्षा प्राप्त करने के लिए प्रोत्साहित करना',
    documentsRequired: ['Admission Letter', 'Income Certificate', 'Marksheet', 'Bank Details'],
    status: 'open',
  },
  {
    id: '6',
    name: 'Tata Trusts Education Grant',
    nameHi: 'टाटा ट्रस्ट शिक्षा अनुदान',
    provider: 'Tata Trusts',
    category: 'private',
    eligibility: ['Higher Education', 'Financial Need', 'Merit-based'],
    amount: 'Up to 80% of fees',
    deadline: '2024-09-30',
    description: 'Private grant for deserving students pursuing higher education',
    descriptionHi: 'उच्च शिक्षा प्राप्त करने वाले योग्य छात्रों के लिए निजी अनुदान',
    documentsRequired: ['Income Proof', 'Admission Letter', 'Marksheet', 'Recommendation Letter'],
    status: 'closed',
  },
];

export const applicationStatuses = [
  {
    id: '1',
    scholarshipName: 'Post-Matric Scholarship for SC Students',
    appliedDate: '2024-08-15',
    status: 'under-review' as const,
    currentStep: 2,
    totalSteps: 4,
    steps: ['Submitted', 'Document Verification', 'Approval', 'Disbursement'],
  },
  {
    id: '2',
    scholarshipName: 'National Means-cum-Merit Scholarship',
    appliedDate: '2024-07-20',
    status: 'approved' as const,
    currentStep: 4,
    totalSteps: 4,
    steps: ['Submitted', 'Document Verification', 'Approval', 'Disbursement'],
  },
];
