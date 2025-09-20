// src/app/ads/[id]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// This would typically come from a database or API
const adData = {
  'summer-offer': {
    id: '1',
    image: '/images/im1.jpg',
    title: 'Special Summer Offer',
    description: 'Get 50% off on all courses this summer!',
    fullDescription: 'Take advantage of our special summer promotion. All courses are 50% off for a limited time. Enhance your skills and advance your career with our comprehensive training programs.',
    details: [
      'Valid until August 31, 2024',
      'Applicable to all online courses',
      'Certificate included with each course',
      '24/7 access to course materials'
    ],
    cta: 'Enroll Now',
    ctaLink: '/courses'
  },
  'career-paths': {
    id: '2',
    image: '/images/im2.jpg',
    title: 'New Career Paths',
    description: 'Discover exciting new career opportunities',
    fullDescription: 'Explore our curated career paths designed to help you transition into high-demand fields. Our programs include mentorship, practical projects, and career support.',
    details: [
      'Web Development Career Path',
      'Data Science Career Path',
      'UX/UI Design Career Path',
      'Digital Marketing Career Path'
    ],
    cta: 'Explore Careers',
    ctaLink: '/careers'
  },
  'premium-training': {
    id: '3',
    image: '/images/im3.jpg',
    title: 'Premium Training',
    description: 'Enhance your skills with our premium courses',
    fullDescription: 'Our premium training programs offer advanced learning experiences with expert instructors, hands-on projects, and personalized feedback to accelerate your growth.',
    details: [
      'Expert-led courses',
      'Real-world projects',
      'Personalized feedback',
      'Career coaching sessions'
    ],
    cta: 'View Courses',
    ctaLink: '/premium-courses'
  }
}

interface AdDetailPageProps {
  params: {
    id: string
  }
}

export default function AdDetailPage({ params }: AdDetailPageProps) {
  const ad = adData[params.id as keyof typeof adData]

  if (!ad) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <Card className="overflow-hidden">
          <div className="relative h-64 md:h-80">
            <Image
              src={ad.image}
              alt={ad.title}
              fill
              className="object-cover"
            />
          </div>
          
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-4">{ad.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{ad.fullDescription}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">What's Included:</h2>
              <ul className="space-y-2">
                {ad.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                {ad.cta}
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={() => window.history.back()}>
            ← Back to previous page
          </Button>
        </div>
      </div>
    </div>
  )
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return Object.keys(adData).map((id) => ({
    id,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: AdDetailPageProps) {
  const ad = adData[params.id as keyof typeof adData]
  
  if (!ad) {
    return {
      title: 'Ad Not Found'
    }
  }

  return {
    title: `${ad.title} | Our Promotions`,
    description: ad.description,
  }
}