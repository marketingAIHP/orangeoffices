export const site = 'https://orangeoffices.in';
export const nav = [
  ['Home', '/'], ['About', '/about/'], ['Services', '/services/'], ['Journal', '/journal/'], ['Clients', '/clients/'], ['Collections', '/collections/'], ['Contact', '/contact/'],
] as const;
export const navChildren: Record<string, readonly (readonly [string, string])[]> = {};
export const services = [
  ['Bespoke Office Interior Design', '/bespoke-office-interior-design/', 'Tailored workplaces that express your brand and support how teams work.'],
  ['Eco-Friendly Workspace Design', '/eco-friendly-workspace-design/', 'Responsible materials and considered planning for a healthier workplace.'],
  ['Flexible Modular Office Design', '/flexible-modular-office-design/', 'Adaptable spaces designed to evolve with your business.'],
  ['Modern Office Renovation', '/modern-office-renovation/', 'A considered renewal of your existing office with minimal disruption.'],
] as const;
export const pages: Record<string, { title: string; description: string; eyebrow: string; heading: string; intro: string }> = {
  '/about/': { title: 'About Orange Offices', description: 'Learn about Orange Offices, premium office interior designers in Gurgaon.', eyebrow: 'About Orange Offices', heading: 'Design your space, inspire your creative vision', intro: 'We craft premium office interiors in Gurgaon, blending functionality, aesthetics and efficiency to create inspiring work environments.' },
  '/services/': { title: 'Office Interior Design Services', description: 'Explore Orange Offices office interior design services in Gurgaon.', eyebrow: 'What we offer', heading: 'A workspace designed around your ambition', intro: 'From initial ideas to delivery, our specialists help businesses create high-performing workplaces.' },
  '/clients/': { title: 'Our Clients | Orange Offices', description: 'The organisations that have trusted Orange Offices with their workspace.', eyebrow: 'Clients', heading: 'Trusted by world-class brands and organisations', intro: 'We bring a collaborative approach to every workplace, whether for a growing team or an established enterprise.' },
  '/collections/': { title: 'Office Collections | Orange Offices', description: 'Explore Orange Offices workplace design collections.', eyebrow: 'Collections', heading: 'Where every space tells a story', intro: 'Explore considered office environments that balance people, purpose and performance.' },
  '/gallery/': { title: 'Office Interior Gallery | Orange Offices', description: 'See selected Orange Offices workplace design projects.', eyebrow: 'Our gallery', heading: 'Spaces made to support better work', intro: 'A selection of our workplace projects and details. Media migration is in progress; this page will be populated from the signed asset inventory.' },
  '/journal/': { title: 'Journal | Orange Offices', description: 'Office design insights from Orange Offices.', eyebrow: 'Journal', heading: 'Ideas for better workplaces', intro: 'Practical perspectives on office interiors, materials and workplace design.' },
  '/contact/': { title: 'Contact Orange Offices', description: 'Contact Orange Offices for an office interior design consultation.', eyebrow: 'Contact', heading: 'Let’s transform your workspace', intro: 'Tell us about your office and we will help you start the conversation.' },
  '/privacy-policy/': { title: 'Privacy Policy | Orange Offices', description: 'Orange Offices privacy policy.', eyebrow: 'Legal', heading: 'Privacy policy', intro: 'Our privacy policy is being migrated from the approved production source.' },
  '/terms/': { title: 'Terms & Conditions | Orange Offices', description: 'Orange Offices terms and conditions.', eyebrow: 'Legal', heading: 'Terms & conditions', intro: 'Our terms are being migrated from the approved production source.' },
  '/thank-you/': { title: 'Thank you | Orange Offices', description: 'Thank you for contacting Orange Offices.', eyebrow: 'Thank you', heading: 'We have received your enquiry', intro: 'A member of our team will be in touch shortly.' },
};
