// "use client"

// import * as React from "react"
// import { useEffect, useRef, useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// import Image from "next/image"

// const Pub = () => {
//   const images = [
//     '/images/im1.jpg',
//     '/images/im2.jpg',
//     '/images/im3.jpg',
//   ]

//   const [current, setCurrent] = useState(0)
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null)

//   const delay = 3000 // 3 seconds

//   useEffect(() => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current)
//     }
//     timeoutRef.current = setTimeout(() => {
//       setCurrent((prev) => (prev + 1) % images.length)
//     }, delay)

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current)
//       }
//     }
//   }, [current])

//   return (
//     <Carousel className="w-full h-50 p-3 mb-10">
//       <CarouselContent
//         style={{
//           transform: `translateX(-${current * 100}%)`,
//           transition: "transform 0.5s ease-in-out",
//           display: "flex",
//         }}
//       >
//         {images.map((item, index) => (
//           <CarouselItem key={index} className="flex-shrink-0 w-full">
//             <Card className="w-full h-50 p-0 rounded-none shadow-none">
//               <CardContent className="relative w-full h-50 p-0">
//                 <Image
//                   src={item}
//                   alt={`Image ${index + 1}`}
//                   fill
//                   className="object-cover w-full h-full"
//                 />
//               </CardContent>
//             </Card>
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       {/* Boutons navigation (optionnels) */}
//       {/* <CarouselPrevious onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)} />
//       <CarouselNext onClick={() => setCurrent((prev) => (prev + 1) % images.length)} /> */}
//     </Carousel>
//   )
// }

// export default Pub

"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Mock data for ads with free images from Unsplash
const mockAds = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    title: 'Summer Collection 2024',
    description: 'Discover our new summer fashion line with exclusive discounts',
    redirectUrl: '/ads/1',
    details: {
      fullDescription: 'Our summer collection features the latest trends in fashion with premium materials and sustainable production. Limited time offers available!',
      price: '$99.99',
      category: 'Fashion',
      duration: 'Limited Time',
      features: ['Eco-friendly materials', 'Multiple colors', 'Free shipping']
    }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=400&fit=crop',
    title: 'Tech Gadgets Sale',
    description: 'Latest electronics and gadgets at unbeatable prices',
    redirectUrl: '/ads/2',
    details: {
      fullDescription: 'Upgrade your tech setup with our curated selection of electronics. From smartphones to smart home devices, find everything you need.',
      price: 'From $49.99',
      category: 'Electronics',
      duration: 'Weekend Sale',
      features: ['Warranty included', 'Free returns', 'Installment payments']
    }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop',
    title: 'Home Decor Ideas',
    description: 'Transform your space with our beautiful home collection',
    redirectUrl: '/ads/3',
    details: {
      fullDescription: 'Create the home of your dreams with our carefully selected furniture and decor items. Quality guaranteed with 30-day return policy.',
      price: 'Various prices',
      category: 'Home & Garden',
      duration: 'New Collection',
      features: ['Interior design tips', 'Quality materials', 'Fast delivery']
    }
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=400&fit=crop',
    title: 'Fitness Equipment',
    description: 'Get fit with our premium fitness gear and equipment',
    redirectUrl: '/ads/4',
    details: {
      fullDescription: 'Achieve your fitness goals with our professional-grade equipment. Suitable for home and commercial use with lifetime warranty.',
      price: '$199.99',
      category: 'Fitness',
      duration: 'Flash Sale',
      features: ['Professional quality', 'Easy assembly', 'Video tutorials']
    }
  }
]

const Pub = () => {
  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  const delay = 3000 // 3 seconds

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % mockAds.length)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current])

  const handleAdClick = (adId: number) => {
    const ad = mockAds.find(item => item.id === adId)
    if (ad) {
      
      window.open(ad.redirectUrl,'_blank')
    }
  }

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + mockAds.length) % mockAds.length)
  }

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % mockAds.length)
  }

  return (
    <div className="w-full  max-w-4xl mx-auto p-4">
      <Carousel className="w-full ">
        <CarouselContent
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 0.5s ease-in-out",
            display: "flex",
          }}
        >
          {mockAds.map((ad, index) => (
            <CarouselItem key={ad.id} className="flex-shrink-0 w-full basis-full">
              <Card 
                className="w-full h-80 md:h-96 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                onClick={() => handleAdClick(ad.id)}
              >
                <CardContent className="p-0 h-full flex">
                  {/* Image Section */}
                  <div className="relative w-1/2 h-full">
                    <Image
                      src={ad.image}
                      alt={ad.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="w-1/2 p-6 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {ad.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {ad.description}
                    </p>
                    <div className="mt-2 text-blue-600 font-semibold flex items-center gap-2">
                      Learn more 
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="left-2" onClick={goToPrevious} />
        <CarouselNext className="right-2" onClick={goToNext} />

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-3">
          {mockAds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

export default Pub