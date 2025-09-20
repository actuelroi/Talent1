import { Bell, Book, Phone, User } from 'lucide-react'
import React from 'react'
import Pays from './Pays'
import Link from 'next/link'

const Header = () => {
    

  return (
   <header className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 left-0 right-0 z-50">
    <Link  href={'/'} className='font-semibold text-2xl px-3 text-[#48a8ec] cursor-pointer'>Talent.</Link>
    <div className='flex items-center space-x-10 cursor-pointer'>
     <Pays/>
       <Link href={'/compagny'} className='underline'>Je suis une entreprise</Link>
        <Bell className="h-4 w-4 text-black  hover:text-gray-700 transition-colors duration-200" />
        <div className="flex items-center space-x-2 cursor-pointer">
          <Link href={'/training'} target='_blank' className='flex items-center space-x-2'>
            <h2 >Suivre une formation</h2>
            <Book className="h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors duration-200" />
            </Link>
        </div>

        <div className="flex items-center space-x-2 cursor-pointer">
            <h2 >Nous contactez</h2>
            <Phone className="h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors duration-200" />
        </div>
       
       
        <div className='flex items-center space-x-2 cursor-pointer'>
          <Link href={'/candidate/dashboard'} className='flex items-center space-x-2 cursor-pointer'>
            <h2>Créer mon compte</h2>
             <User className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-colors duration-200" />
             </Link>
        </div>
         </div>
   
   </header>
  )
}

export default Header
