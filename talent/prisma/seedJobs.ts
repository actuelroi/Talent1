// scripts/seedJobs.ts
import { prisma } from '@/lib/db';

async function seedJobs() {
  // Create some categories first
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'technologie' },
      update: {},
      create: {
        name: 'Technologie',
        slug: 'technologie',
        description: 'Emplois dans la technologie et IT'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'sante' },
      update: {},
      create: {
        name: 'Santé',
        slug: 'sante',
        description: 'Emplois dans le secteur médical'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'finance' },
      update: {},
      create: {
        name: 'Finance',
        slug: 'finance',
        description: 'Emplois dans le secteur financier'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'design' },
      update: {},
      create: {
        name: 'Design',
        slug: 'design',
        description: 'Emplois dans le design'
      }
    }),
  ]);

  // Create sample companies if they don't exist
  const companies = await Promise.all([
    prisma.company.upsert({
      where: { slug: 'techvision' },
      update: {},
      create: {
        name: 'TechVision',
        slug: 'techvision',
        description: 'TechVision est une startup spécialisée en analyse de données dans le secteur médical.',
        industry: 'Technologie',
        size: 'SIZE_11_50',
        location: 'Abidjan, Plateau',
        isVerified: true,
      }
    }),
    // Add other companies...
  ]);

  // Create sample job postings
  const jobs = await Promise.all([
    prisma.jobPosting.create({
      data: {
        title: 'Data Analyste',
        slug: 'data-analyste-techvision',
        description: 'Analyser des jeux de données patients, travailler avec les équipes produit et IA.',
        requirements: 'Master en Data Science, expérience avec Python et SQL',
        location: 'Abidjan, Plateau',
        remotePolicy: 'HYBRID',
        employmentType: 'FULL_TIME',
        salaryMin: 2300,
        salaryMax: 2800,
        experienceLevel: 'MID_LEVEL',
        isActive: true,
        isFeatured: true,
        publishedAt: new Date(),
        companyId: companies[0].id,
        jobCategories: {
          create: [
            { categoryId: categories[0].id },
            { categoryId: categories[1].id }
          ]
        }
      }
    }),
    // Add more sample jobs...
  ]);

  console.log('Seed completed successfully!');
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${companies.length} companies`);
  console.log(`Created ${jobs.length} job postings`);
}

seedJobs()
  .catch(console.error)
  .finally(() => prisma.$disconnect());