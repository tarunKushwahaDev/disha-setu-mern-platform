export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  questionHi?: string;
  options: {
    id: string;
    text: string;
    textHi?: string;
    value: string;
  }[];
}

export interface CareerStream {
  id: string;
  name: string;
  nameHi?: string;
  description: string;
  descriptionHi?: string;
  skills: string[];
  relatedCareers: string[];
  icon: string;
}

export interface College {
  id: string;
  name: string;
  type: 'government' | 'private' | 'skill-center';
  state: string;
  district: string;
  courses: string[];
  fees: string;
  website?: string;
}

export interface CareerOutcome {
  id: string;
  title: string;
  titleHi?: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  requirements: string[];
  pathwayFrom: string[];
}

export const aptitudeQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: 'logical',
    question: 'When solving a problem, you prefer to:',
    questionHi: 'समस्या हल करते समय, आप पसंद करते हैं:',
    options: [
      { id: 'a', text: 'Break it into smaller steps', textHi: 'छोटे चरणों में बांटना', value: 'analytical' },
      { id: 'b', text: 'Think of creative solutions', textHi: 'रचनात्मक समाधान सोचना', value: 'creative' },
      { id: 'c', text: 'Discuss with others', textHi: 'दूसरों से चर्चा करना', value: 'social' },
      { id: 'd', text: 'Use hands-on approach', textHi: 'व्यावहारिक दृष्टिकोण अपनाना', value: 'practical' },
    ],
  },
  {
    id: 2,
    category: 'interests',
    question: 'What type of work excites you most?',
    questionHi: 'किस तरह का काम आपको सबसे ज्यादा उत्साहित करता है?',
    options: [
      { id: 'a', text: 'Working with numbers and data', textHi: 'संख्याओं और डेटा के साथ काम करना', value: 'analytical' },
      { id: 'b', text: 'Creating art, designs, or content', textHi: 'कला, डिज़ाइन, या सामग्री बनाना', value: 'creative' },
      { id: 'c', text: 'Helping and teaching others', textHi: 'दूसरों की मदद और शिक्षण', value: 'social' },
      { id: 'd', text: 'Building or fixing things', textHi: 'चीज़ें बनाना या ठीक करना', value: 'practical' },
    ],
  },
  {
    id: 3,
    category: 'skills',
    question: 'Which subject do you enjoy the most?',
    questionHi: 'आप किस विषय का सबसे अधिक आनंद लेते हैं?',
    options: [
      { id: 'a', text: 'Mathematics or Science', textHi: 'गणित या विज्ञान', value: 'stem' },
      { id: 'b', text: 'Arts or Languages', textHi: 'कला या भाषाएं', value: 'arts' },
      { id: 'c', text: 'Social Studies or History', textHi: 'सामाजिक अध्ययन या इतिहास', value: 'humanities' },
      { id: 'd', text: 'Physical Education or Crafts', textHi: 'शारीरिक शिक्षा या शिल्प', value: 'vocational' },
    ],
  },
  {
    id: 4,
    category: 'environment',
    question: 'Where would you prefer to work?',
    questionHi: 'आप कहाँ काम करना पसंद करेंगे?',
    options: [
      { id: 'a', text: 'In an office with computers', textHi: 'कंप्यूटर के साथ कार्यालय में', value: 'office' },
      { id: 'b', text: 'In a creative studio or outdoors', textHi: 'रचनात्मक स्टूडियो या बाहर', value: 'creative' },
      { id: 'c', text: 'With people in schools or hospitals', textHi: 'स्कूलों या अस्पतालों में लोगों के साथ', value: 'service' },
      { id: 'd', text: 'In a workshop or field', textHi: 'कार्यशाला या क्षेत्र में', value: 'field' },
    ],
  },
  {
    id: 5,
    category: 'personality',
    question: 'How do you feel about leading a team?',
    questionHi: 'टीम का नेतृत्व करने के बारे में आप कैसा महसूस करते हैं?',
    options: [
      { id: 'a', text: 'I enjoy taking charge', textHi: 'मुझे नेतृत्व करना पसंद है', value: 'leader' },
      { id: 'b', text: 'I prefer working independently', textHi: 'मैं स्वतंत्र रूप से काम करना पसंद करता हूं', value: 'independent' },
      { id: 'c', text: 'I like collaborating equally', textHi: 'मुझे समान रूप से सहयोग करना पसंद है', value: 'collaborative' },
      { id: 'd', text: 'I am happy to follow instructions', textHi: 'मुझे निर्देशों का पालन करने में खुशी है', value: 'supportive' },
    ],
  },
  {
    id: 6,
    category: 'goals',
    question: 'What is most important to you in a career?',
    questionHi: 'करियर में आपके लिए सबसे महत्वपूर्ण क्या है?',
    options: [
      { id: 'a', text: 'Good salary and stability', textHi: 'अच्छा वेतन और स्थिरता', value: 'security' },
      { id: 'b', text: 'Passion and creativity', textHi: 'जुनून और रचनात्मकता', value: 'passion' },
      { id: 'c', text: 'Helping society', textHi: 'समाज की मदद करना', value: 'impact' },
      { id: 'd', text: 'Learning new skills', textHi: 'नए कौशल सीखना', value: 'growth' },
    ],
  },
  {
    id: 7,
    category: 'aptitude',
    question: 'When learning something new, you prefer:',
    questionHi: 'कुछ नया सीखते समय, आप पसंद करते हैं:',
    options: [
      { id: 'a', text: 'Reading and researching', textHi: 'पढ़ना और शोध करना', value: 'theoretical' },
      { id: 'b', text: 'Watching videos or demonstrations', textHi: 'वीडियो या प्रदर्शन देखना', value: 'visual' },
      { id: 'c', text: 'Listening to explanations', textHi: 'व्याख्याएं सुनना', value: 'auditory' },
      { id: 'd', text: 'Practicing hands-on', textHi: 'व्यावहारिक अभ्यास करना', value: 'kinesthetic' },
    ],
  },
  {
    id: 8,
    category: 'technology',
    question: 'How comfortable are you with technology?',
    questionHi: 'आप प्रौद्योगिकी के साथ कितने सहज हैं?',
    options: [
      { id: 'a', text: 'Very comfortable, I love it', textHi: 'बहुत सहज, मुझे पसंद है', value: 'high' },
      { id: 'b', text: 'Comfortable for basic tasks', textHi: 'बुनियादी कार्यों के लिए सहज', value: 'medium' },
      { id: 'c', text: 'I prefer minimal technology', textHi: 'मैं न्यूनतम तकनीक पसंद करता हूं', value: 'low' },
      { id: 'd', text: 'I want to learn more', textHi: 'मैं और सीखना चाहता हूं', value: 'learning' },
    ],
  },
];

export const careerStreams: CareerStream[] = [
  {
    id: 'engineering',
    name: 'Engineering & Technology',
    nameHi: 'इंजीनियरिंग और प्रौद्योगिकी',
    description: 'Design, build, and innovate with technology',
    descriptionHi: 'प्रौद्योगिकी के साथ डिज़ाइन, निर्माण और नवाचार करें',
    skills: ['Problem Solving', 'Mathematics', 'Technical Skills', 'Logical Thinking'],
    relatedCareers: ['Software Engineer', 'Civil Engineer', 'Mechanical Engineer', 'Electrical Engineer'],
    icon: '⚙️',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medicine',
    nameHi: 'स्वास्थ्य सेवा और चिकित्सा',
    description: 'Care for others and save lives',
    descriptionHi: 'दूसरों की देखभाल करें और जीवन बचाएं',
    skills: ['Empathy', 'Biology', 'Attention to Detail', 'Communication'],
    relatedCareers: ['Doctor', 'Nurse', 'Pharmacist', 'Lab Technician'],
    icon: '🏥',
  },
  {
    id: 'business',
    name: 'Business & Commerce',
    nameHi: 'व्यापार और वाणिज्य',
    description: 'Manage, trade, and grow enterprises',
    descriptionHi: 'उद्यमों का प्रबंधन, व्यापार और विकास करें',
    skills: ['Communication', 'Mathematics', 'Leadership', 'Negotiation'],
    relatedCareers: ['Accountant', 'Business Analyst', 'Manager', 'Entrepreneur'],
    icon: '📊',
  },
  {
    id: 'arts',
    name: 'Arts & Design',
    nameHi: 'कला और डिज़ाइन',
    description: 'Create, express, and inspire through art',
    descriptionHi: 'कला के माध्यम से बनाएं, व्यक्त करें और प्रेरित करें',
    skills: ['Creativity', 'Visual Sense', 'Attention to Detail', 'Software Tools'],
    relatedCareers: ['Graphic Designer', 'Fashion Designer', 'Animator', 'Photographer'],
    icon: '🎨',
  },
  {
    id: 'education',
    name: 'Education & Teaching',
    nameHi: 'शिक्षा और अध्यापन',
    description: 'Shape minds and build the future',
    descriptionHi: 'मन को आकार दें और भविष्य का निर्माण करें',
    skills: ['Communication', 'Patience', 'Subject Knowledge', 'Leadership'],
    relatedCareers: ['Teacher', 'Professor', 'Counselor', 'Education Administrator'],
    icon: '📚',
  },
  {
    id: 'skilled-trades',
    name: 'Skilled Trades & Vocational',
    nameHi: 'कुशल व्यापार और व्यावसायिक',
    description: 'Build with your hands and technical skills',
    descriptionHi: 'अपने हाथों और तकनीकी कौशल से निर्माण करें',
    skills: ['Practical Skills', 'Physical Fitness', 'Technical Knowledge', 'Safety Awareness'],
    relatedCareers: ['Electrician', 'Plumber', 'Carpenter', 'Welder', 'Auto Mechanic'],
    icon: '🔧',
  },
];

export const sampleColleges: College[] = [
  {
    id: '1',
    name: 'Government Polytechnic',
    type: 'government',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    courses: ['Diploma in Engineering', 'ITI Courses'],
    fees: '₹5,000 - ₹15,000 per year',
  },
  {
    id: '2',
    name: 'Skill Development Center',
    type: 'skill-center',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    courses: ['Computer Basics', 'Tailoring', 'Electrical Work'],
    fees: 'Free under PMKVY',
  },
  {
    id: '3',
    name: 'Government Degree College',
    type: 'government',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    courses: ['B.A.', 'B.Sc.', 'B.Com.'],
    fees: '₹3,000 - ₹10,000 per year',
  },
];

export const careerOutcomes: CareerOutcome[] = [
  {
    id: '1',
    title: 'Software Developer',
    titleHi: 'सॉफ्टवेयर डेवलपर',
    description: 'Build applications and solve problems through code',
    averageSalary: '₹4-12 LPA',
    growthRate: '25% per year',
    requirements: ['B.Tech/BCA', 'Programming Skills', 'Problem Solving'],
    pathwayFrom: ['engineering'],
  },
  {
    id: '2',
    title: 'Staff Nurse',
    titleHi: 'स्टाफ नर्स',
    description: 'Provide patient care in hospitals and clinics',
    averageSalary: '₹2.5-6 LPA',
    growthRate: '12% per year',
    requirements: ['GNM/B.Sc Nursing', 'Empathy', 'Medical Knowledge'],
    pathwayFrom: ['healthcare'],
  },
  {
    id: '3',
    title: 'Electrician',
    titleHi: 'इलेक्ट्रीशियन',
    description: 'Install and maintain electrical systems',
    averageSalary: '₹2-5 LPA',
    growthRate: '10% per year',
    requirements: ['ITI Certificate', 'Technical Skills', 'Safety Training'],
    pathwayFrom: ['skilled-trades'],
  },
];
