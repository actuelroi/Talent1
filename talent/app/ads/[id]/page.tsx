// app/ads/[id]/page.tsx
"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const mockAds = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    title: 'Summer Collection 2024',
    description: 'Discover our new summer fashion line with exclusive discounts',
    redirectUrl: '/ads/1',
    details: {
      fullDescription: 'Our summer collection features the latest trends in fashion with premium materials and sustainable production. Limited time offers available! All items are made from eco-friendly fabrics and designed for comfort and style.',
      price: '$99.99',
      category: 'Fashion',
      duration: 'Limited Time',
      features: ['Eco-friendly materials', 'Multiple colors available', 'Free shipping worldwide', '30-day return policy', 'Sustainable production']
    }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop',
    title: 'Tech Gadgets Sale',
    description: 'Latest electronics and gadgets at unbeatable prices',
    redirectUrl: '/ads/2',
    details: {
      fullDescription: 'Upgrade your tech setup with our curated selection of electronics. From smartphones to smart home devices, find everything you need to stay connected and productive in the digital age.',
      price: 'From $49.99',
      category: 'Electronics',
      duration: 'Weekend Sale',
      features: ['2-year warranty included', 'Free returns within 14 days', 'Installment payments available', 'Expert customer support', 'Fast shipping']
    }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
    title: 'Home Decor Ideas',
    description: 'Transform your space with our beautiful home collection',
    redirectUrl: '/ads/3',
    details: {
      fullDescription: 'Create the home of your dreams with our carefully selected furniture and decor items. Each piece is crafted with attention to detail and quality materials to ensure lasting beauty and functionality.',
      price: 'Various prices',
      category: 'Home & Garden',
      duration: 'New Collection',
      features: ['Free interior design consultation', 'Premium quality materials', 'Fast and safe delivery', 'Assembly service available', '30-day satisfaction guarantee']
    }
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=600&fit=crop',
    title: 'Fitness Equipment',
    description: 'Get fit with our premium fitness gear and equipment',
    redirectUrl: '/ads/4',
    details: {
      fullDescription: 'Achieve your fitness goals with our professional-grade equipment. Designed for both home and commercial use, our products come with comprehensive warranties and support to help you on your fitness journey.',
      price: '$199.99',
      category: 'Fitness',
      duration: 'Flash Sale',
      features: ['Commercial-grade quality', 'Easy 30-minute assembly', 'Step-by-step video tutorials', 'Lifetime frame warranty', 'Free fitness app access']
    }
  }
]

export default function AdDetailPage() {
  const params = useParams()
  const adId = parseInt(params.id as string)
  const ad = mockAds.find(item => item.id === adId)

  if (!ad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Ad Not Found</h1>
          <p className="text-gray-600">The advertisement you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image Header */}
          <div className="relative w-full h-80 md:h-96">
            <Image
              src={ad.image}
              alt={ad.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Main Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {ad.title}
                </h1>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {ad.details.fullDescription}
                </p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="font-semibold text-gray-700">Price:</span>
                    <span className="text-2xl text-green-600 font-bold">{ad.details.price}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="font-semibold text-gray-700">Category:</span>
                    <span className="text-gray-600">{ad.details.category}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="font-semibold text-gray-700">Offer Duration:</span>
                    <span className="text-gray-600">{ad.details.duration}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Features & Actions */}
              <div className="md:w-80">
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {ad.details.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                    Get This Offer Now
                  </Button>
                  <Button variant="outline" className="w-full py-3 text-lg">
                    Save for Later
                  </Button>
                  <Button variant="ghost" className="w-full py-3 text-lg">
                    Share with Friends
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}