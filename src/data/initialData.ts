export interface ServiceItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  startingPrice: number;
  providerCount: number;
  popular: boolean;
  image: string;
}

export interface Provider {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  skill: string;
  serviceId: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  locality: string;
  experienceYears: number;
  hourlyRate: number;
  availableToday: boolean;
  verified: boolean;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  about: string;
  badge: string;
  joinedDate: string;
  skillsList: string[];
  coopMemberNumber: string;
  coopContribution: number;
}

export type BookingStatus = 'REQUESTED' | 'ACCEPTED' | 'IN PROGRESS' | 'COMPLETED' | 'RATED' | 'CANCELLED';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerLocality: string;
  customerAddress: string;
  providerId: string;
  providerName: string;
  providerSkill: string;
  providerAvatar: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  requirement: string;
  estimatedBudget: number;
  workerShare: number;
  coopShare: number;
  platformShare: number;
  status: BookingStatus;
  createdAt: string;
  rating?: number;
  review?: string;
  notes?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  providerId: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}

export interface NotificationItem {
  id: string;
  recipientRole: 'customer' | 'provider' | 'admin';
  recipientId: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'booking' | 'payment' | 'verification' | 'system';
  bookingId?: string;
}

export interface CooperativeStats {
  totalWorkersEmpowered: number;
  totalJobsCompleted: number;
  totalWorkerEarnings: number;
  coopWelfareFund: number;
  communitiesServed: number;
  customerSatisfaction: number;
}

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: 'Wrench',
    category: 'Home Repairs',
    shortDesc: 'Leakage fixing, pipe installation, taps, showers, and water tanks.',
    fullDesc: 'Expert cooperative plumbers for tap replacements, pipeline unclogging, bathroom fittings, and urgent water leak emergencies.',
    startingPrice: 350,
    providerCount: 14,
    popular: true,
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: 'Zap',
    category: 'Home Repairs',
    shortDesc: 'Wiring, MCB switches, ceiling fans, lighting, and surge repairs.',
    fullDesc: 'Certified local electricians for household repairs, appliance sockets, power outage diagnosis, and safety inspections.',
    startingPrice: 300,
    providerCount: 18,
    popular: true,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cleaning',
    name: 'Home Cleaning',
    icon: 'Sparkles',
    category: 'Sanitation',
    shortDesc: 'Deep home cleaning, kitchen scrubbing, bathroom sanitization.',
    fullDesc: 'Eco-friendly and meticulous home sanitation specialists dedicated to giving your home a sparkling, hygienic ambiance.',
    startingPrice: 599,
    providerCount: 22,
    popular: true,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    icon: 'Hammer',
    category: 'Home Repairs',
    shortDesc: 'Furniture assembly, hinge repairs, custom wooden shelves.',
    fullDesc: 'Skilled woodwork craftspeople for wardrobe repairs, doors, locks, customized cabinets, and furniture restorations.',
    startingPrice: 450,
    providerCount: 11,
    popular: true,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'appliances',
    name: 'Appliance Repair',
    icon: 'Cpu',
    category: 'Electronics',
    shortDesc: 'Washing machines, refrigerators, microwaves, and AC checkups.',
    fullDesc: 'Trained technicians diagnosing cooling issues, motor faults, compressor replacements, and seasonal AC services.',
    startingPrice: 400,
    providerCount: 15,
    popular: true,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting',
    name: 'Painting',
    icon: 'Palette',
    category: 'Renovation',
    shortDesc: 'Interior wall paint, damp-proofing, touch-ups, and exterior coat.',
    fullDesc: 'Experienced painters offering clean, spotless brush and spray finishes with odorless paints and quick turnaround.',
    startingPrice: 800,
    providerCount: 9,
    popular: false,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gardening',
    name: 'Gardening & Landscaping',
    icon: 'Sprout',
    category: 'Outdoors',
    shortDesc: 'Balcony garden setup, plant pruning, lawn mowing, organic soil.',
    fullDesc: 'Nurture your greens with skilled local urban gardeners skilled in composting, balcony plants, and seasonal pruning.',
    startingPrice: 350,
    providerCount: 8,
    popular: false,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tutoring',
    name: 'Tutoring',
    icon: 'BookOpen',
    category: 'Education',
    shortDesc: 'K-12 math, science, regional languages, exam preparation.',
    fullDesc: 'Patient neighborhood educators offering one-on-one sessions for school students, homework help, and foundational concepts.',
    startingPrice: 500,
    providerCount: 16,
    popular: true,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tech-support',
    name: 'Computer & Tech Support',
    icon: 'Laptop',
    category: 'Electronics',
    shortDesc: 'Wi-Fi setup, OS reinstallation, laptop cleanup, printer fix.',
    fullDesc: 'Doorstep tech troubleshooters for router connectivity, slow PC optimization, virus removal, and peripheral setup.',
    startingPrice: 400,
    providerCount: 12,
    popular: false,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'moving',
    name: 'Moving & Helping',
    icon: 'Package',
    category: 'Assistance',
    shortDesc: 'Luggage lifting, intra-city house shifting, loading assistance.',
    fullDesc: 'Careful local moving assistants to help pack, lift heavy boxes, arrange furniture, and transport household goods safely.',
    startingPrice: 650,
    providerCount: 10,
    popular: false,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
];

export const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'prov-arun',
    name: 'Arun Kumar',
    phone: '+91 98401 23456',
    email: 'arun.plumber@giggrid.coop',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    skill: 'Plumber',
    serviceId: 'plumbing',
    rating: 4.9,
    reviewCount: 48,
    completedJobs: 52,
    locality: 'Maduravoyal',
    experienceYears: 8,
    hourlyRate: 450,
    availableToday: true,
    verified: true,
    verificationStatus: 'verified',
    about: 'Certified master plumber with 8+ years experience in Maduravoyal & Porur. Specializes in concealed leakage detection, bathroom pipelines, PVC fitting, and booster pump setups. Cooperative founding member.',
    badge: 'Co-op Master Craftsman',
    joinedDate: 'Jan 2024',
    skillsList: ['Pipe Leak Repair', 'Water Tank Cleaning', 'Tap & Shower Fitting', 'Pressure Pump Fix'],
    coopMemberNumber: 'GG-MAD-0012',
    coopContribution: 3840,
  },
  {
    id: 'prov-priya',
    name: 'Priya S',
    phone: '+91 98402 34567',
    email: 'priya.clean@giggrid.coop',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    skill: 'Home Cleaning',
    serviceId: 'cleaning',
    rating: 4.9,
    reviewCount: 64,
    completedJobs: 71,
    locality: 'Porur',
    experienceYears: 5,
    hourlyRate: 600,
    availableToday: true,
    verified: true,
    verificationStatus: 'verified',
    about: 'Dedicated deep cleaning specialist in Porur and Valasaravakkam. Uses non-toxic eco sanitizers. Proud women self-help cooperative leader.',
    badge: 'Top Community Rated',
    joinedDate: 'Feb 2024',
    skillsList: ['Deep Kitchen Degreasing', 'Bathroom Descaling', 'Sofa Shampooing', 'Eco-friendly Disinfection'],
    coopMemberNumber: 'GG-POR-0034',
    coopContribution: 5120,
  },
  {
    id: 'prov-karthik',
    name: 'Karthik R',
    phone: '+91 98403 45678',
    email: 'karthik.elec@giggrid.coop',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    skill: 'Electrician',
    serviceId: 'electrical',
    rating: 4.8,
    reviewCount: 39,
    completedJobs: 44,
    locality: 'Maduravoyal',
    experienceYears: 6,
    hourlyRate: 400,
    availableToday: true,
    verified: true,
    verificationStatus: 'verified',
    about: 'Government licensed wireman handling short-circuits, MCB tripping, inverter connections, and LED panel lights across Maduravoyal.',
    badge: 'Safety Certified',
    joinedDate: 'Mar 2024',
    skillsList: ['MCB Breaker Replacement', 'Inverter Wiring', 'Fan Installation', 'Surge Protection'],
    coopMemberNumber: 'GG-MAD-0045',
    coopContribution: 2980,
  },
  {
    id: 'prov-divya',
    name: 'Divya M',
    phone: '+91 98404 56789',
    email: 'divya.tutor@giggrid.coop',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    skill: 'Tutor',
    serviceId: 'tutoring',
    rating: 5.0,
    reviewCount: 52,
    completedJobs: 58,
    locality: 'Valasaravakkam',
    experienceYears: 4,
    hourlyRate: 500,
    availableToday: false,
    verified: true,
    verificationStatus: 'verified',
    about: 'M.Sc Mathematics graduate helping CBSE & State Board students master concepts with interactive visual problem solving and patience.',
    badge: 'Excellence Educator',
    joinedDate: 'Jan 2024',
    skillsList: ['CBSE Maths 6-10', 'Science Practical Aid', 'Olympiad Prep', 'Exam Strategy'],
    coopMemberNumber: 'GG-VAL-0019',
    coopContribution: 4200,
  },
  {
    id: 'prov-suresh',
    name: 'Suresh Kumar',
    phone: '+91 98405 67890',
    email: 'suresh.wood@giggrid.coop',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    skill: 'Carpenter',
    serviceId: 'carpentry',
    rating: 4.7,
    reviewCount: 31,
    completedJobs: 36,
    locality: 'Koyambedu',
    experienceYears: 10,
    hourlyRate: 550,
    availableToday: true,
    verified: true,
    verificationStatus: 'verified',
    about: 'Traditional carpenter with 10 years of experience in teak, ply, and modular fittings. Reliable lock replacements and customized shelving.',
    badge: 'Master Artisan',
    joinedDate: 'Apr 2024',
    skillsList: ['Modular Cabinet Fix', 'Door Alignment', 'Lock Fitting', 'Custom Bookshelves'],
    coopMemberNumber: 'GG-KOY-0028',
    coopContribution: 2650,
  },
  {
    id: 'prov-meena',
    name: 'Meena P',
    phone: '+91 98406 78901',
    email: 'meena.tech@giggrid.coop',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    skill: 'Appliance Technician',
    serviceId: 'appliances',
    rating: 4.8,
    reviewCount: 27,
    completedJobs: 33,
    locality: 'Mogappair',
    experienceYears: 7,
    hourlyRate: 500,
    availableToday: true,
    verified: true,
    verificationStatus: 'verified',
    about: 'Specialist in multi-brand refrigerators, washing machines, and microwave ovens. Fast diagnostics with guaranteed cooperative-backed warranty.',
    badge: 'Certified Technician',
    joinedDate: 'Feb 2024',
    skillsList: ['Refrigerator Cooling Gas', 'Washing Machine Drum Fix', 'Microwave PCB', 'Water Purifier Filter'],
    coopMemberNumber: 'GG-MOG-0051',
    coopContribution: 2310,
  },
  {
    id: 'prov-rajesh',
    name: 'Rajesh V',
    phone: '+91 98407 89012',
    email: 'rajesh.paint@giggrid.coop',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    skill: 'Painter',
    serviceId: 'painting',
    rating: 4.6,
    reviewCount: 22,
    completedJobs: 25,
    locality: 'Ambattur',
    experienceYears: 9,
    hourlyRate: 600,
    availableToday: false,
    verified: true,
    verificationStatus: 'verified',
    about: 'Interior wall designer and weather-coat exterior painter. Expert in damp sealing, putty smoothing, and stenciled artistic accent walls.',
    badge: 'Craftsman Guild',
    joinedDate: 'May 2024',
    skillsList: ['Waterproofing Primer', 'Asian Paints Royale Finishes', 'Texture Walls', 'Exterior Weathercoat'],
    coopMemberNumber: 'GG-AMB-0062',
    coopContribution: 1950,
  },
  {
    id: 'prov-lakshmi',
    name: 'Lakshmi N',
    phone: '+91 98408 90123',
    email: 'lakshmi.garden@giggrid.coop',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    skill: 'Gardening & Landscaping',
    serviceId: 'gardening',
    rating: 4.9,
    reviewCount: 35,
    completedJobs: 41,
    locality: 'Maduravoyal',
    experienceYears: 6,
    hourlyRate: 400,
    availableToday: true,
    verified: true,
    verificationStatus: 'verified',
    about: 'Passionate botanist and balcony garden whisperer in Maduravoyal. Brings organic compost, medicinal herbal kits, and automatic drip systems.',
    badge: 'Green Guardian',
    joinedDate: 'Mar 2024',
    skillsList: ['Terrace Garden Setup', 'Organic Pest Control', 'Drip Irrigation', 'Bonsai Pruning'],
    coopMemberNumber: 'GG-MAD-0078',
    coopContribution: 2890,
  },
  {
    id: 'prov-ananya',
    name: 'Ananya K',
    phone: '+91 98409 01234',
    email: 'ananya.tech@giggrid.coop',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    skill: 'Computer & Tech Support',
    serviceId: 'tech-support',
    rating: 4.9,
    reviewCount: 41,
    completedJobs: 47,
    locality: 'Porur',
    experienceYears: 4,
    hourlyRate: 500,
    availableToday: true,
    verified: true,
    verificationStatus: 'verified',
    about: 'B.Tech IT graduate providing neighborhood hardware repairs, SSD upgrades, Wi-Fi mesh optimization, and data recovery with utmost privacy.',
    badge: 'IT Specialist',
    joinedDate: 'Jan 2024',
    skillsList: ['SSD/RAM Upgrade', 'Home Mesh Wi-Fi', 'Malware Removal', 'Printer Cloud Config'],
    coopMemberNumber: 'GG-POR-0089',
    coopContribution: 3410,
  },
  {
    id: 'prov-vijay',
    name: 'Vijay S',
    phone: '+91 98410 12345',
    email: 'vijay.move@giggrid.coop',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    skill: 'Moving & Helping',
    serviceId: 'moving',
    rating: 4.8,
    reviewCount: 29,
    completedJobs: 34,
    locality: 'Koyambedu',
    experienceYears: 5,
    hourlyRate: 650,
    availableToday: true,
    verified: true,
    verificationStatus: 'verified',
    about: 'Leader of an energetic cooperative moving team. Careful furniture handling, bubble wrapping of breakables, and hassle-free local shifting.',
    badge: 'Careful Movers',
    joinedDate: 'Feb 2024',
    skillsList: ['Heavy Furniture Lifting', 'Cushioned Packaging', 'Van Loading / Unloading', 'Appliance Dismantling'],
    coopMemberNumber: 'GG-KOY-0094',
    coopContribution: 2780,
  },
  {
    id: 'prov-chandran',
    name: 'Chandran M',
    phone: '+91 98411 23456',
    email: 'chandran.elec@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    skill: 'Electrician',
    serviceId: 'electrical',
    rating: 4.5,
    reviewCount: 3,
    completedJobs: 3,
    locality: 'Maduravoyal',
    experienceYears: 4,
    hourlyRate: 380,
    availableToday: true,
    verified: false,
    verificationStatus: 'pending',
    about: 'Local ITI-certified electrician applying for GigGrid cooperative membership. Experienced in domestic single-phase and three-phase wiring.',
    badge: 'Applicant',
    joinedDate: 'Aug 2024',
    skillsList: ['Domestic Wiring', 'Switchboard Repair'],
    coopMemberNumber: 'GG-MAD-PENDING-01',
    coopContribution: 0,
  },
  {
    id: 'prov-sangeetha',
    name: 'Sangeetha R',
    phone: '+91 98412 34567',
    email: 'sangeetha.tailor@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    skill: 'Carpentry',
    serviceId: 'carpentry',
    rating: 4.6,
    reviewCount: 4,
    completedJobs: 4,
    locality: 'Porur',
    experienceYears: 3,
    hourlyRate: 420,
    availableToday: true,
    verified: false,
    verificationStatus: 'pending',
    about: 'Wood polishing and furniture restoration artisan applying for verification with Aadhaar and skill credentials submitted.',
    badge: 'Applicant',
    joinedDate: 'Aug 2024',
    skillsList: ['Wood Polishing', 'Hinge Adjustments'],
    coopMemberNumber: 'GG-POR-PENDING-02',
    coopContribution: 0,
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-1001',
    customerId: 'cust-ramesh',
    customerName: 'Ramesh Patel',
    customerPhone: '+91 98840 11223',
    customerLocality: 'Maduravoyal',
    customerAddress: 'Flat 302, Green Meadows Apt, Nethaji Road, Maduravoyal',
    providerId: 'prov-arun',
    providerName: 'Arun Kumar',
    providerSkill: 'Plumber',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    serviceId: 'plumbing',
    serviceName: 'Plumbing',
    date: '2024-09-08',
    timeSlot: '10:00 AM - 12:00 PM',
    requirement: 'Kitchen sink pipe leaking and major blockage in utility basin.',
    estimatedBudget: 1000,
    workerShare: 850,
    coopShare: 100,
    platformShare: 50,
    status: 'COMPLETED',
    createdAt: '2024-09-07T14:30:00Z',
    rating: 5,
    review: 'Arun arrived right on time, diagnosed the blocked bend pipe in minutes, and replaced the degraded seal cleanly. Transparent cooperative pricing without hidden extras!',
  },
  {
    id: 'BK-1002',
    customerId: 'cust-ramesh',
    customerName: 'Ramesh Patel',
    customerPhone: '+91 98840 11223',
    customerLocality: 'Maduravoyal',
    customerAddress: 'Flat 302, Green Meadows Apt, Nethaji Road, Maduravoyal',
    providerId: 'prov-priya',
    providerName: 'Priya S',
    providerSkill: 'Home Cleaning',
    providerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    serviceId: 'cleaning',
    serviceName: 'Home Cleaning',
    date: '2024-09-06',
    timeSlot: '02:00 PM - 05:00 PM',
    requirement: 'Full festival kitchen scrub and cabinet wiping.',
    estimatedBudget: 1200,
    workerShare: 1020,
    coopShare: 120,
    platformShare: 60,
    status: 'RATED',
    createdAt: '2024-09-05T09:15:00Z',
    rating: 5,
    review: 'Outstanding dedication by Priya. The kitchen looks brand new. Very respectful and brought all needed eco solutions.',
  },
  {
    id: 'BK-1003',
    customerId: 'cust-anita',
    customerName: 'Anita Krishnan',
    customerPhone: '+91 98841 22334',
    customerLocality: 'Porur',
    customerAddress: '14/2, Lake View Road, Porur',
    providerId: 'prov-karthik',
    providerName: 'Karthik R',
    providerSkill: 'Electrician',
    providerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    serviceId: 'electrical',
    serviceName: 'Electrical',
    date: '2024-09-09',
    timeSlot: '11:00 AM - 01:00 PM',
    requirement: 'Main distribution board circuit breaker tripping constantly when AC starts.',
    estimatedBudget: 900,
    workerShare: 765,
    coopShare: 90,
    platformShare: 45,
    status: 'IN PROGRESS',
    createdAt: '2024-09-08T08:00:00Z',
  },
  {
    id: 'BK-1004',
    customerId: 'cust-mohan',
    customerName: 'Mohan Das',
    customerPhone: '+91 98842 33445',
    customerLocality: 'Maduravoyal',
    customerAddress: 'Plot 45, Krishna Nagar 2nd Main, Maduravoyal',
    providerId: 'prov-arun',
    providerName: 'Arun Kumar',
    providerSkill: 'Plumber',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    serviceId: 'plumbing',
    serviceName: 'Plumbing',
    date: '2024-09-09',
    timeSlot: '04:00 PM - 06:00 PM',
    requirement: 'Overhead tank float valve replacement and bathroom tap valve repair.',
    estimatedBudget: 800,
    workerShare: 680,
    coopShare: 80,
    platformShare: 40,
    status: 'ACCEPTED',
    createdAt: '2024-09-08T10:30:00Z',
  },
  {
    id: 'BK-1005',
    customerId: 'cust-kavitha',
    customerName: 'Kavitha R',
    customerPhone: '+91 98843 44556',
    customerLocality: 'Valasaravakkam',
    customerAddress: '8A, 1st Cross, Alwarthirunagar, Valasaravakkam',
    providerId: 'prov-divya',
    providerName: 'Divya M',
    providerSkill: 'Tutor',
    providerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    serviceId: 'tutoring',
    serviceName: 'Tutoring',
    date: '2024-09-10',
    timeSlot: '05:00 PM - 06:30 PM',
    requirement: 'Grade 10 Trigonometry concept revision and past question paper drill.',
    estimatedBudget: 750,
    workerShare: 637.5,
    coopShare: 75,
    platformShare: 37.5,
    status: 'REQUESTED',
    createdAt: '2024-09-08T12:00:00Z',
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    bookingId: 'BK-1001',
    providerId: 'prov-arun',
    customerName: 'Ramesh Patel',
    customerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Arun arrived right on time, diagnosed the blocked bend pipe in minutes, and replaced the degraded seal cleanly. Transparent cooperative pricing without hidden extras!',
    date: 'Yesterday',
    serviceName: 'Plumbing',
  },
  {
    id: 'rev-2',
    bookingId: 'BK-0991',
    providerId: 'prov-arun',
    customerName: 'Meenakshi Sundaram',
    customerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Super polite and did clean work fixing our leaking Jaguar mixer taps. Happy to support a cooperative worker where earnings go directly to him!',
    date: '3 days ago',
    serviceName: 'Plumbing',
  },
  {
    id: 'rev-3',
    bookingId: 'BK-1002',
    providerId: 'prov-priya',
    customerName: 'Ramesh Patel',
    customerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Outstanding dedication by Priya. The kitchen looks brand new. Very respectful and brought all needed eco solutions.',
    date: '2 days ago',
    serviceName: 'Home Cleaning',
  },
  {
    id: 'rev-4',
    bookingId: 'BK-0988',
    providerId: 'prov-karthik',
    customerName: 'Venkatesh Babu',
    customerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Fixed an urgent short circuit at 8 PM when other apps were asking ₹2000. Fair cooperative rate of ₹450 with genuine safety check.',
    date: '4 days ago',
    serviceName: 'Electrical',
  },
  {
    id: 'rev-5',
    bookingId: 'BK-0972',
    providerId: 'prov-divya',
    customerName: 'Sangeetha B',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'My daughter scored 94% in term exam after 6 sessions with Divya. She builds real confidence instead of just rote memorization.',
    date: '1 week ago',
    serviceName: 'Tutoring',
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    recipientRole: 'provider',
    recipientId: 'prov-arun',
    title: 'New Service Request',
    message: 'Ramesh Patel requested a plumbing service in Maduravoyal for ₹1,000.',
    time: '10 mins ago',
    read: false,
    type: 'booking',
    bookingId: 'BK-1001',
  },
  {
    id: 'notif-2',
    recipientRole: 'customer',
    recipientId: 'cust-ramesh',
    title: 'Booking Confirmed',
    message: 'Arun Kumar accepted your plumbing appointment for today.',
    time: '2 hours ago',
    read: true,
    type: 'booking',
    bookingId: 'BK-1001',
  },
  {
    id: 'notif-3',
    recipientRole: 'provider',
    recipientId: 'prov-arun',
    title: 'Cooperative Dividend Credited',
    message: 'Quarterly dividend of ₹1,450 credited to your cooperative account from the pooled fund.',
    time: '1 day ago',
    read: true,
    type: 'payment',
  },
  {
    id: 'notif-4',
    recipientRole: 'admin',
    recipientId: 'admin-1',
    title: 'New Provider Verification',
    message: 'Chandran M (Electrician, Maduravoyal) submitted documents for verification.',
    time: '3 hours ago',
    read: false,
    type: 'verification',
  }
];

export const INITIAL_COOP_STATS: CooperativeStats = {
  totalWorkersEmpowered: 520,
  totalJobsCompleted: 1480,
  totalWorkerEarnings: 842000,
  coopWelfareFund: 99050,
  communitiesServed: 25,
  customerSatisfaction: 4.88,
};

export const LOCALITIES = [
  'All Localities',
  'Maduravoyal',
  'Porur',
  'Valasaravakkam',
  'Koyambedu',
  'Mogappair',
  'Ambattur',
];
