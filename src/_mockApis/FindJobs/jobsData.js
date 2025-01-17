import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';
import s1 from 'src/assets/images/jobs/s1.jpg';
import s2 from 'src/assets/images/jobs/s2.jpg';
import s3 from 'src/assets/images/jobs/s3.jpg';
import s4 from 'src/assets/images/jobs/s4.jpg';
import s5 from 'src/assets/images/jobs/s5.jpg';
import s6 from 'src/assets/images/jobs/s6.jpg';
import s7 from 'src/assets/images/jobs/s7.jpg';
import s8 from 'src/assets/images/jobs/s8.jpg';
import s9 from 'src/assets/images/jobs/s9.jpg';
import s10 from 'src/assets/images/jobs/s10.jpg';
import s11 from 'src/assets/images/jobs/s11.jpg';
import s12 from 'src/assets/images/jobs/s12.jpg';

const chance = new Chance();

const jobsData = [
  {
    id: 1,
    category: ['Design'],
    title: 'MygridData job Manager',
    jobtype: 'Full time',
    duration:`2 month`,
    NumberOfApplicants: 200,
    salary: 2500,
    discount: 25,
    related: false,
    location:"Neihu District, Taipei City, Taiwan",
    ExperienceRequirements: "3 years of experience required",
    rating: 3,
    numberToHire : 1,
    salessalary: 350,
    DateOfPosting: `12.25.2024`,
    stock: true,
    colors: ['#1890FF'],
    photo: s1,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 5 }),
  },
  {
    title: 'Psalms Book for Growth',
    salary: 89,
    discount: 10,
    related: true,
    salessalary: 99,
    category: ['Design'],
    jobType: 'Part time',
    rating: 3,
    stock: false,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FF4842'],
    photo: s2,
    id: 2,
    created: sub(new Date(), { days: 10, hours: 8, minutes: 69 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'The Psychology of Money',
    salary: 125,
    discount: 12,
    related: false,
    salessalary: 137,
    category: ['Development', 'Design'],
    jobType: 'Short-Term project',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FF4842', '#1890FF', '#94D82D'],
    photo: s3,
    id: 3,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Boat Headphone',
    salary: 50,
    discount: 15,
    related: true,
    salessalary: 65,
    category: ['Marketing'],
    jobType: 'Full time',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FFC107'],
    photo: s4,
    id: 4,
    created: sub(new Date(), { days: 4, hours: 9, minutes: 40 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'MacBook Air Pro',
    salary: 650,
    discount: 250,
    related: true,
    salessalary: 900,
    category: ['Development', 'Marketing'],
    jobType: 'Part time',
    rating: 3,
    stock: false,
    qty: 1,
    colors: ['#00AB55', '#000000'],
    photo: s5,
    id: 5,
    created: sub(new Date(), { days: 2, hours: 5, minutes: 50 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Gaming Console',
    salary: 25,
    discount: 6,
    related: true,
    salessalary: 31,
    category: ['Marketing'],
    jobType: 'Full time',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FFC0CB', '#FF4842'],
    photo: s6,
    id: 6,
    created: sub(new Date(), { days: 2, hours: 9, minutes: 45 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Red Valvet Dress',
    salary: 150,
    discount: 50,
    related: false,
    salessalary: 200,
    category: ['Development'],
    jobType: 'Part time',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FF4842', '#1890FF', '#94D82D'],
    photo: s7,
    id: 7,
    created: sub(new Date(), { days: 6, hours: 10, minutes: 0 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Shoes for Girls',
    salary: 300,
    discount: 80,
    related: false,
    salessalary: 380,
    category: ['Development', 'Sales'],
    jobType: 'Part time',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FFC107'],
    photo: s8,
    id: 8,
    created: sub(new Date(), { days: 7, hours: 5, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Short & Sweet Purse',
    salary: 175,
    discount: 25,
    related: false,
    salessalary: 200,
    category: ['Development'],
    jobType: 'Part time',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#00AB55', '#000000'],
    photo: s9,
    id: 9,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Toy Dino for Fun',
    salary: 210,
    discount: 40,
    related: false,
    salessalary: 250,
    category: ['Sales'],
    jobType: 'Short-Term project',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FFC0CB', '#FF4842'],
    photo: s10,
    id: 10,
    created: sub(new Date(), { days: 6, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Cute Soft Teddybear',
    salary: 285,
    discount: 60,
    related: false,
    salessalary: 345,
    category: ['Sales'],
    jobType: 'Short-Term project',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FF4842', '#1890FF', '#94D82D'],
    photo: s11,
    id: 11,
    created: sub(new Date(), { days: 1, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Little Angel Toy',
    salary: 5,
    discount: 5,
    related: false,
    salessalary: 10,
    category: ['Sales'],
    jobType: 'Short-Term project',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FFC107'],
    photo: s12,
    id: 12,
    created: sub(new Date(), { days: 9, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    id: 13,
    category: ['Design'],
    title: 'MygridData job Manager',
    jobtype: 'Full time',
    duration: '2 months',
    NumberOfApplicants: 200,
    salary: 2500,
    discount: 25,
    related: false,
    location: 'Neihu District, Taipei City, Taiwan',
    ExperienceRequirements: '3 years of experience required',
    rating: 3,
    numberToHire: 1,
    salessalary: 350,
    DateOfPosting: '12.25.2024',
    stock: true,
    colors: ['#1890FF'],
    photo: s9,
    created: new Date(new Date() - 8 * 60 * 60 * 1000 - 6 * 60 * 1000), 
    description: 'We are looking for an experienced job manager to lead and manage the development of MygridData products. The ideal candidate will be responsible for overseeing the entire job lifecycle, from initial concept to launch. Collaborate with engineering, design, and marketing teams to ensure seamless execution.'
  },
  {
    id: 14,
    category: ['Marketing'],
    title: 'Marketing Lead',
    jobtype: 'Part time',
    duration: '6 months',
    NumberOfApplicants: 150,
    salary: 2000,
    discount: 20,
    related: true,
    location: 'Shibuya, Tokyo, Japan',
    ExperienceRequirements: '5 years of experience required',
    rating: 4,
    numberToHire: 1,
    salessalary: 500,
    DateOfPosting: '12.22.2024',
    stock: true,
    colors: ['#FF5733'],
    photo: s8,
    created: new Date(new Date() - 7 * 60 * 60 * 1000 - 10 * 60 * 1000),
    description: 'We are seeking a creative and experienced Marketing Lead to manage and execute marketing strategies. Oversee content creation, lead digital campaigns, and analyze performance metrics. You will work closely with cross-functional teams to ensure the brand’s marketing vision is brought to life.'
  },
  {
    id: 15,
    category: ['Sales'],
    title: 'Sales Representative',
    jobtype: 'Full time',
    duration: '3 months',
    NumberOfApplicants: 300,
    salary: 1800,
    discount: 10,
    related: true,
    location: 'Seoul, South Korea',
    ExperienceRequirements: '2 years of experience required',
    rating: 4,
    numberToHire: 3,
    salessalary: 200,
    DateOfPosting: '12.20.2024',
    stock: false,
    colors: ['#DAF7A6'],
    photo: s3,
    created: new Date(new Date() - 8 * 60 * 60 * 1000 - 2 * 60 * 1000),
    description: 'Join our dynamic sales team as a Sales Representative and take ownership of generating new business and increasing sales volume. You will work with clients, help them understand the value of our products, and close deals effectively.'
  },
  {
    id: 16,
    category: ['Design'],
    title: 'UI/UX Designer',
    jobtype: 'Contract',
    duration: '12 months',
    NumberOfApplicants: 100,
    salary: 2200,
    discount: 15,
    related: false,
    location: 'Singapore',
    ExperienceRequirements: '4 years of experience required',
    rating: 5,
    numberToHire: 1,
    salessalary: 100,
    DateOfPosting: '12.18.2024',
    stock: true,
    colors: ['#FFC300'],
    photo: s1,
    created: new Date(new Date() - 7 * 60 * 60 * 1000 - 15 * 60 * 1000),
    description: 'We are looking for a talented UI/UX Designer to create intuitive and user-friendly digital experiences. Work on a variety of products including mobile apps, websites, and software applications.'
  },
  {
    id: 17,
    category: ['HR'],
    title: 'Human Resources Manager',
    jobtype: 'Full time',
    duration: 'Indefinite',
    NumberOfApplicants: 50,
    salary: 2800,
    discount: 30,
    related: true,
    location: 'Los Angeles, USA',
    ExperienceRequirements: '6 years of experience required',
    rating: 4,
    numberToHire: 1,
    salessalary: 450,
    DateOfPosting: '12.17.2024',
    stock: true,
    colors: ['#8E44AD'],
    photo: s7,
    created: new Date(new Date() - 9 * 60 * 60 * 1000 - 30 * 60 * 1000),
    description: 'We are seeking an experienced HR Manager to lead the recruitment and employee management process. You will create HR policies, manage employee relations, and build a strong company culture to help us attract and retain top talent.'
  },
  {
    id: 18,
    category: ['Design'],
    title: 'Graphic Designer',
    jobtype: 'Freelance',
    duration: '3 months',
    NumberOfApplicants: 120,
    salary: 2500,
    discount: 18,
    related: false,
    location: 'New York, USA',
    ExperienceRequirements: '2 years of experience required',
    rating: 4,
    numberToHire: 1,
    salessalary: 250,
    DateOfPosting: '12.15.2024',
    stock: false,
    colors: ['#1F77B4'],
    photo: s2,
    created: new Date(new Date() - 6 * 60 * 60 * 1000 - 5 * 60 * 1000),
    description: 'We are looking for a freelance Graphic Designer to help us create visually engaging designs for our marketing materials. The role involves working with clients to understand their design needs and bringing them to life using design software.'
  },
  {
    id: 19,
    category: ['Engineering'],
    title: 'Software Engineer',
    jobtype: 'Full time',
    duration: 'Permanent',
    NumberOfApplicants: 500,
    salary: 3200,
    discount: 12,
    related: true,
    location: 'Silicon Valley, USA',
    ExperienceRequirements: '5 years of experience required',
    rating: 5,
    numberToHire: 2,
    salessalary: 550,
    DateOfPosting: '12.14.2024',
    stock: true,
    colors: ['#FF5733'],
    photo: s10,
    created: new Date(new Date() - 5 * 60 * 60 * 1000 - 8 * 60 * 1000),
    description: 'We are looking for a highly skilled Software Engineer to help us develop scalable and secure software solutions. Collaborate with cross-functional teams, write clean code, and ensure applications meet high standards for performance and quality.'
  },
  {
    id: 20,
    category: ['Engineering'],
    title: 'DevOps Engineer',
    jobtype: 'Full time',
    duration: 'Permanent',
    NumberOfApplicants: 400,
    salary: 3500,
    discount: 8,
    related: false,
    location: 'Austin, Texas, USA',
    ExperienceRequirements: '6 years of experience required',
    rating: 4,
    numberToHire: 1,
    salessalary: 600,
    DateOfPosting: '12.12.2024',
    stock: true,
    colors: ['#3E8E41'],
    photo: s5,
    created: new Date(new Date() - 7 * 60 * 60 * 1000 - 25 * 60 * 1000),
    description: 'We are looking for an experienced DevOps Engineer to join our team. You will focus on automating processes, optimizing infrastructure, and ensuring scalability and security for our systems. Experience with cloud services and CI/CD tools is required.'
  },
  {
    id: 21,
    category: ['Design'],
    title: 'Senior Graphic Designer',
    jobtype: 'Full time',
    duration: 'Indefinite',
    NumberOfApplicants: 80,
    salary: 2700,
    discount: 5,
    related: true,
    location: 'Berlin, Germany',
    ExperienceRequirements: '5 years of experience required',
    rating: 4,
    numberToHire: 1,
    salessalary: 400,
    DateOfPosting: '12.10.2024',
    stock: false,
    colors: ['#C70039'],
    photo: s12,
    created: new Date(new Date() - 10 * 60 * 60 * 1000 - 20 * 60 * 1000),
    description: 'We are hiring a Senior Graphic Designer to lead our creative projects. You will oversee the visual design for digital and print campaigns, develop creative concepts, and ensure our designs align with client needs and brand strategy.'
  }
];

mock.onGet('/api/data/FindJobs/jobsData').reply(() => { 
  return [200, jobsData];
});

export default jobsData;
 