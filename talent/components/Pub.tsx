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

const Pub = () => {
  const images = [
    '/images/im1.jpg',
    '/images/im2.jpg',
    '/images/im3.jpg',
  ]

  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const delay = 3000 // 3 seconds

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current])

  return (
    <Carousel className="w-full h-50 p-3 mb-10">
      <CarouselContent
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: "transform 0.5s ease-in-out",
          display: "flex",
        }}
      >
        {images.map((item, index) => (
          <CarouselItem key={index} className="flex-shrink-0 w-full">
            <Card className="w-full h-50 p-0 rounded-none shadow-none">
              <CardContent className="relative w-full h-50 p-0">
                <Image
                  src={item}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover w-full h-full"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Boutons navigation (optionnels) */}
      {/* <CarouselPrevious onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)} />
      <CarouselNext onClick={() => setCurrent((prev) => (prev + 1) % images.length)} /> */}
    </Carousel>
  )
}

export default Pub
