export type CredentialCategory = 'ALL' | 'DATA' | 'CLOUD' | 'AI / ML' | 'SOFTWARE' | 'ENTREPRENEURSHIP';

export interface Certification {
  id: string;
  numberStr: string;
  title: string;
  organization: string;
  date: string;
  year: number;
  credentialId?: string;
  skills: string[];
  category: 'DATA' | 'CLOUD' | 'AI / ML' | 'SOFTWARE' | 'ENTREPRENEURSHIP';
  secondaryCategories?: ('DATA' | 'CLOUD' | 'AI / ML' | 'SOFTWARE' | 'ENTREPRENEURSHIP')[];
  credentialUrl?: string;
  image?: string;
  imageUrl: string;
  featured?: boolean;
}

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'simplilearn-excel-2026',
    numberStr: '01',
    title: 'Business Analytics with Excel',
    organization: 'Simplilearn',
    date: 'August 2026',
    year: 2026,
    skills: ['Microsoft Excel', 'Data Analysis'],
    category: 'DATA',
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D4D2DAQFGsZckNMUlGw/profile-treasury-image-shrink_800_800/B4DaAisIvKKMAM-/0/1787288390984?e=1790301600&v=beta&t=g0q_dDv3Yf19EdCZlkszazH53UFnhpsZK_wfHXcta2A',
    featured: true,
  },
  {
    id: 'deloitte-data-2026',
    numberStr: '02',
    title: 'Deloitte Australia – Data Analytics Job Simulation',
    organization: 'Forage',
    date: 'March 2026',
    year: 2026,
    credentialId: 'JEvKPhSKsDMbzwoaB',
    skills: ['Data Analytics', 'Business Intelligence', 'Data Simulation'],
    category: 'DATA',
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D562DAQH3fvGqYNhVTQ/profile-treasury-image-shrink_800_800/B56Z01HEMqHoAY-/0/1774712538635?e=1790301600&v=beta&t=WfKpXJe-gwGfC9A6toWBIJwSX763dElH0GLxd-jFjXI',
  },
  {
    id: 'gcp-engineering-2025',
    numberStr: '03',
    title: 'Google Cloud Engineering Certificate',
    organization: 'Google Cloud Skills Boost',
    date: 'November 2025',
    year: 2025,
    credentialId: '7c0ab394-3001-4025-a0c9-16a7133d152f',
    skills: ['Cloud Computing', 'Cloud Development'],
    category: 'CLOUD',
    imageUrl:
      'https://images.credly.com/size/340x340/images/0586d038-b371-48e0-ade3-e680a080a85a/image.png',
  },
  {
    id: 'gcp-genai-2025',
    numberStr: '04',
    title: 'Google Cloud Gen AI Academy',
    organization: 'Hack2skill',
    date: 'May 2025',
    year: 2025,
    credentialId: 'GenAI5-28M/2025H2S04GENAI-A00611',
    skills: ['Vertex AI', 'Google Gemini'],
    category: 'AI / ML',
    secondaryCategories: ['CLOUD'],
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D562DAQH6paThYMMK7g/profile-treasury-image-shrink_800_800/B56Z01Ibt.KcAY-/0/1774712897869?e=1790301600&v=beta&t=CZjVxldQBP6CcpJ05CF0eXbeorhVo4BOQkFfMh7PLas',
  },
  {
    id: 'gcp-foundations-2025',
    numberStr: '05',
    title: 'Google Cloud Computing Foundations Certificate',
    organization: 'Google',
    date: 'March 2025',
    year: 2025,
    credentialId: 'b4fe4041-d63d-40d2-bb8d-457c9631e337',
    skills: ['Google Cloud', 'Cloud Storage'],
    category: 'CLOUD',
    imageUrl:
      'https://images.credly.com/size/340x340/images/4dda8ae4-99ee-476c-bca3-6f0adbab42fe/image.png',
  },
  {
    id: 'codealpha-cpp-2024',
    numberStr: '06',
    title: 'Virtual Internship Program in C++ Programming',
    organization: 'CodeAlpha',
    date: 'October 2024',
    year: 2024,
    skills: ['C++', 'C Programming'],
    category: 'SOFTWARE',
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D562DAQGqxH4MTOn_kw/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1730867329848?e=1790301600&v=beta&t=IP9N-UrAH9couiiiA7h9fEpCG1O0v4kO2Grh1_7payk',
  },
  {
    id: 'techsaksham-ai-2024',
    numberStr: '07',
    title: 'AICTE – Internship on AI: Transformative Learning with TechSaksham',
    organization: 'Edunet Foundation',
    date: 'March 2024',
    year: 2024,
    credentialId: 'STU6742ad0ebd6101732422926',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Python'],
    category: 'AI / ML',
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D562DAQGk93jY7WK4hA/profile-treasury-image-shrink_8192_8192/B56ZWvFXMiGoAs-/0/1742399174187?e=1790301600&v=beta&t=oPT3kj_3JV4xuaVtC9fAZ9KMLnkE3HzHzg-DZq2EeJU',
  },
  {
    id: 'ecell-iitb-2023',
    numberStr: '08',
    title: 'Illuminate Entrepreneurship Bootcamp',
    organization: 'E-Cell, IIT Bombay',
    date: 'December 2023',
    year: 2023,
    skills: ['Entrepreneurship', 'Venture Strategy', 'Product Prototyping'],
    category: 'ENTREPRENEURSHIP',
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D562DAQF7yNPyt7oQ5Q/profile-treasury-document-cover-images_1280/profile-treasury-document-cover-images_1280/0/1726241243459?e=1790301600&v=beta&t=b1Msq5BoaerPeLNh3-izvEZdcNWjKz6RGBg6aT2B_Io',
  },
  {
    id: 'sih-2023',
    numberStr: '09',
    title: 'Smart India Hackathon',
    organization: 'Smart India Hackathon',
    date: 'September 2023',
    year: 2023,
    skills: ['Leadership', 'Team Leadership'],
    category: 'ENTREPRENEURSHIP',
    secondaryCategories: ['SOFTWARE'],
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D562DAQFnzVhONikFiQ/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1725457863646?e=1790301600&v=beta&t=ZQT-LDwjolG5cRH4eHIgpjj7HHhiduTrWMQymziX-ko',
  },
];

// Backwards compatibility alias for legacy imports
export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date?: string;
  description?: string;
}

export const achievements: Achievement[] = CERTIFICATIONS_DATA.map((c) => ({
  id: c.id,
  title: c.title,
  organization: c.organization,
  date: c.date,
}));
