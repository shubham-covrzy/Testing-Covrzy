import PartnerpageCaseStudy1 from '../../assets/images/partnershipCaseStudy.png';
import PartnerTestinomail1 from '../../assets/images/partnertestinomial1.png';
interface faqDataInterface {
    question: string;
    answer: string;
}
interface CaseStudiesInterface {
    title: string;
    description: string;
    date: string;
    readTime: string;
    image: string;
    alt?: string;
}

interface TestimonialInterface {
    logo: string;
    companyName: string;
    userName: string;
    designation: string;
    rating: number;
    testimonial: string;
    alt?: string;
}

export const faqData: faqDataInterface[] = [
    {
        question: 'What is group health insurance?',
        answer: 'Group health insurance is a type of health insurance coverage offered by employers to their employees. It provides health benefits for all eligible members of the group, including their dependents. The insurance premiums are often partially paid by the employer and partially by the employees through payroll deductions.',
    },
    {
        question: 'Who is eligible for group health insurance?',
        answer: "Eligibility for group health insurance typically includes full-time employees of a company. Some employers may also offer coverage to part-time employees or contractors, depending on the company's policies. Additionally, dependents, such as spouses and children, may also be eligible for coverage under the employee's plan.",
    },
    {
        question:
            'What types of coverage are typically included in group health insurance plans?',
        answer: 'Group health insurance plans usually cover a wide range of medical services, including preventive care, doctor visits, hospital stays, surgeries, prescription medications, maternity care, mental health services, and emergency services. The specifics of what is covered can vary depending on the plan selected by the employer.',
    },
    {
        question: 'How are premiums for group health insurance determined?',
        answer: 'Premiums for group health insurance are generally based on several factors, including the size of the group, the average age and health status of the employees, the location of the business, and the type of coverage provided. Employers typically negotiate rates with insurance providers and may choose to share the cost of premiums with employees.',
    },
    {
        question:
            'What happens to my group health insurance if I leave my job?',
        answer: 'If you leave your job, you typically lose your group health insurance coverage. However, you may have options to continue your coverage through COBRA (Consolidated Omnibus Budget Reconciliation Act) for a limited time, usually 18 to 36 months, depending on the circumstances. COBRA allows you to maintain your health insurance, but you will be responsible for paying the full premium, including the portion previously covered by your employer.',
    },
];

export const caseStudies: CaseStudiesInterface[] = [
    {
        title: 'Boost Your Business: The Benefits of Partnering with Covrzy',
        description:
            "How Covrzy's insurance solutions help you expand offerings and increase revenue effortlessly.How Covrzy's insurance solutions help you expand offerings and increase revenue effortlessly.How Covrzy's insurance solutions help you expand offerings and increase revenue effortlessly.",
        date: 'Sep 13, 2023',
        readTime: '3 min read',
        image: PartnerpageCaseStudy1,
    },
    {
        title: 'Digital Insurance Solutions: A Success Story',
        description:
            'Discover how our digital insurance platform transformed a traditional agency into a modern powerhouse of efficiency and growth.',
        date: 'Sep 14, 2023',
        readTime: '4 min read',
        image: PartnerpageCaseStudy1,
    },
    {
        title: 'Revolutionizing Insurance Distribution',
        description:
            'Learn how our partners leverage technology to streamline their insurance operations and deliver better customer experiences.',
        date: 'Sep 15, 2023',
        readTime: '5 min read',
        image: PartnerpageCaseStudy1,
    },
];

export const testimonials: TestimonialInterface[] = [
    {
        logo: PartnerTestinomail1,
        companyName: 'Tech Innovators',
        userName: 'Jane Doe',
        designation: 'CTO',
        rating: 5,
        testimonial:
            "Working with this team has been an absolute game-changer for our company. Their innovative solutions and attention to detail have significantly improved our productivity. I couldn't be happier with the results!",
        alt: 'Tech Innovators',
    },
    {
        logo: PartnerTestinomail1,
        companyName: 'Global Solutions',
        userName: 'Mike Smith',
        designation: 'Project Manager',
        rating: 4.5,
        testimonial:
            "I've been impressed with the level of professionalism and expertise demonstrated by this team. They consistently deliver high-quality work and are always responsive to our needs. Highly recommended!",
        alt: 'Global Solutions',
    },
    {
        logo: PartnerTestinomail1,
        companyName: 'Creative Designs',
        userName: 'Alice Lee',
        designation: 'Lead Designer',
        rating: 4,
        testimonial:
            "The creativity and technical skills of this team are outstanding. They've helped us bring our vision to life in ways we couldn't have imagined. While there's always room for improvement, their work has been crucial to our success.",
        alt: 'Creative Designs',
    },
    {
        logo: PartnerTestinomail1,
        companyName: 'StartUp Ventures',
        userName: 'Robert Johnson',
        designation: 'Founder',
        rating: 5,
        testimonial:
            'As a startup founder, finding the right technical partner is crucial. This team has exceeded all our expectations. Their ability to understand our unique needs and deliver scalable solutions has been instrumental in our rapid growth.',
        alt: 'StartUp Ventures',
    },
];
