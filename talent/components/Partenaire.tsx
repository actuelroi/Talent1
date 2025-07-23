import React from 'react'
import Marquee from './ui/marquee';



export default function Partenaire() {
    const partners = [
  { src: "/images/mtn.png", alt: "MTN CI", name: "MTN CI" },
  { src: "/images/sg.png", alt: "SG", name: "Societe Generale" },
  { src: "/images/kpmg.jpg", alt: "KPMG", name: "KPMG CI" },
  { src: "/images/carrefour.png", alt: "Carrefour", name: "Carrefour" },
];
  return (
    <section className='p-4'>
        <h1 className='font-semibold pt-6 '>Nos partenaires</h1>
        <Marquee pauseOnHover className="[--duration:20s]">
        {partners.map((item, index) => (
            <div key={index} className="flex items-center  w-32 h-32 mx-2">
                 <img className="rounded-full" width="32" height="32" alt={item.alt} src={item.src} />
                <p className="text-center text-sm mt-2">{item.name}</p>
            </div>
        ))}
      </Marquee>
    </section>
  )
}
