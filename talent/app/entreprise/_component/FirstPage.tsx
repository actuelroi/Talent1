import Image from 'next/image'
import React from 'react'
import { Pencil, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import InputWithDescription from './InputWithDesc'
import SiteInput from './SiteInput'


const FirstPage = () => {
  const defaultCompany = {
    name: 'Sunset',
    date: '01/01/2020',
    employees: '50',
    location: 'Paris, France',
    description: 'Sunset est une entreprise innovante spécialisée dans les solutions digitales.',
    siteWeb: 'https://www.siteweb.com',
    image: '/images/im1.jpg',
    addressMail: 'example@compagnie.com',
    logo: '/images/im2.jpg',
    linkedin: 'https://www.linkedin.com/company/sunset',
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Image de couverture */}
      <div className="relative w-full h-64 mb-4">
        <Image
          src={defaultCompany.image}
          alt="Image entreprise"
          fill
          objectFit="cover"
          className="rounded-md"
        />
        {/* Icône edit */}
        <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white cursor-pointer">
          <Pencil size={20} />
        </button>
      </div>


    
    </section>
  )
}

export default FirstPage
