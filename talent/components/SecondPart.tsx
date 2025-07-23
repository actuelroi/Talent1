import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Briefcase, BriefcaseBusiness, GraduationCap, Grid3x3, Locate, Settings2, Ticket, Timer } from 'lucide-react'

const SecondPart = () => {
    const filterOptions = [
        { label: 'Secteur', value: 'secteur', icon: Briefcase },
        { label: 'Niveau d\'étude', value: 'niveau', icon:BriefcaseBusiness },
        { label: 'Type de formation', value: 'type', icon:Grid3x3 },
        { label: 'Durée', value: 'durée', icon: Timer },
        { label: 'Rénumération', value: 'prix' , icon: Ticket},
        { label: 'Localite', value: 'localite', icon: Locate },
        { label: 'Type de contrat', value: 'contrat', icon: Settings2 },
        { label: 'Domaine', value: 'domaine', icon: GraduationCap },

    ]
  return (
    <section className='flex flex-col  gap-4'>
        <div className='flex  p-4   bg-gray-100 gap-4 rounded-lg'>
            <Input className='w-1/2' placeholder='Rechercher un emploi, une offre'/>
            <Button className='cursor-pointer'>
                Rechercher
            </Button>
        </div>
        <div className='p-6'>
            <h2 className='text-2xl font-semibold text-blue-600 mb-4'>Filtrer les résultats</h2>
            <div className='flex flex-row gap-4'>
                {filterOptions.map((option) => (
                    <Button key={option.value} className='flex items-center gap-2 cursor-pointer'>
                        <option.icon className='h-5 w-5' />
                        {option.label}
                    </Button>
                ))}
            </div>
        </div>
    </section>
  )
}

export default SecondPart
