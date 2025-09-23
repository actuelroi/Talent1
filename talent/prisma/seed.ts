
import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function seedSubscriptionPlans() {
  console.log('🌱 Seeding subscription plans...');

  const plans = [
    {
      name: 'Starter',
      slug: 'starter',
      description: 'Perfect for small businesses getting started',
      priceMonthly: 0, // Free tier
      currency: 'EUR',
      features: [
        'Up to 5 job postings',
        'Basic candidate management',
        'Company profile',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      slug: 'pro',
      description: 'For growing businesses with more hiring needs',
      priceMonthly: 99,
      currency: 'EUR',
      features: [
        'Up to 50 job postings',
        'Advanced candidate management',
        'Custom branding',
        'Priority support',
        'Analytics dashboard'
      ]
    },
    {
      name: 'Enterprise',
      slug: 'enterprise',
      description: 'For large organizations with complex hiring needs',
      priceMonthly: 299,
      currency: 'EUR',
      features: [
        'Unlimited job postings',
        'Dedicated account manager',
        'API access',
        'Custom integrations',
        'SLA guarantee',
        'Advanced analytics'
      ]
    }
  ];

  for (const planData of plans) {
    const existingPlan = await prisma.subscriptionPlan.findUnique({
      where: { slug: planData.slug }
    });

    if (existingPlan) {
      console.log(`✓ Plan ${planData.name} already exists`);
    } else {
      await prisma.subscriptionPlan.create({
        data: {
          ...planData,
          features: planData.features
        }
      });
      console.log(`✓ Created ${planData.name} plan`);
    }
  }

  console.log('✅ Subscription plans seeded successfully!');
}

// Run the seed function
seedSubscriptionPlans()
  .catch((error) => {
    console.error('❌ Error seeding subscription plans:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });