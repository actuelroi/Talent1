
import Image from 'next/image'
import React from 'react'
import { Badge } from './ui/badge'

const Pays = () => {
  return (
    <Badge variant="default" className="w-6 h-4 relative border-none">
         <Image src='/images/ci.png' alt='CI' fill objectFit='cover'/>
    </Badge>
   
  )
}

export default Pays
