// import React from 'react'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { Briefcase, BriefcaseBusiness, GraduationCap, Grid3x3, Locate, Settings2, Ticket, Timer } from 'lucide-react'

// const SecondPart = () => {
//     const filterOptions = [
//         { label: 'Secteur', value: 'secteur', icon: Briefcase },
//         { label: 'Niveau d\'étude', value: 'niveau', icon:BriefcaseBusiness },
//         { label: 'Type de formation', value: 'type', icon:Grid3x3 },
//         { label: 'Durée', value: 'durée', icon: Timer },
//         { label: 'Rénumération', value: 'prix' , icon: Ticket},
//         { label: 'Localite', value: 'localite', icon: Locate },
//         { label: 'Type de contrat', value: 'contrat', icon: Settings2 },
//         { label: 'Domaine', value: 'domaine', icon: GraduationCap },

//     ]
//   return (
//     <section className='flex flex-col  gap-4'>
//         <div className='flex  p-4   bg-gray-100 gap-4 rounded-lg'>
//             <Input className='w-1/2' placeholder='Rechercher un emploi, une offre'/>
//             <Button className='cursor-pointer'>
//                 Rechercher
//             </Button>
//         </div>
//         <div className='p-6'>
//             <h2 className='text-2xl font-semibold text-blue-600 mb-4'>Filtrer les résultats</h2>
//             <div className='flex flex-row gap-4'>
//                 {filterOptions.map((option) => (
//                     <Button key={option.value} className='flex items-center gap-2 cursor-pointer'>
//                         <option.icon className='h-5 w-5' />
//                         {option.label}
//                     </Button>
//                 ))}
//             </div>
//         </div>
//     </section>
//   )
// }

// export default SecondPart


'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import {
  Briefcase,
  BriefcaseBusiness,
  GraduationCap,
  Grid3x3,
  Locate,
  Settings2,
  Ticket,
  Timer,
  X,
  Search
} from 'lucide-react'

interface FilterOption {
  label: string
  value: string
  icon: React.ElementType
}

interface ActiveFilter {
  label: string
  value: string
  category: string
}

const SecondPart = () => {
  const [searchInput, setSearchInput] = useState('')
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])
  const [showFilterDetails, setShowFilterDetails] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const detailsRef = useRef<HTMLDivElement | null>(null)

  const filterOptions: FilterOption[] = [
    { label: 'Secteur', value: 'secteur', icon: Briefcase },
    { label: 'Niveau d\'étude', value: 'niveau', icon: BriefcaseBusiness },
    { label: 'Type de formation', value: 'type', icon: Grid3x3 },
    { label: 'Durée', value: 'durée', icon: Timer },
    { label: 'Rénumération', value: 'prix', icon: Ticket },
    { label: 'Localite', value: 'localite', icon: Locate },
    { label: 'Type de contrat', value: 'contrat', icon: Settings2 },
    { label: 'Domaine', value: 'domaine', icon: GraduationCap },
  ]

  // Toggle: click same filter again closes it
  const handleFilterClick = (filter: FilterOption) => {
    if (selectedFilter === filter.value) {
      setSelectedFilter(null)
      setShowFilterDetails(false)
    } else {
      setSelectedFilter(filter.value)
      setShowFilterDetails(true)
    }
  }

  const addFilter = (value: string, label: string, category: string) => {
    if (!activeFilters.some(filter => filter.value === value && filter.category === category)) {
      setActiveFilters(prev => [...prev, { value, label, category }])
    }
    // close panel and clear selected filter
    setShowFilterDetails(false)
    setSelectedFilter(null)
  }

  const removeFilter = (filterToRemove: ActiveFilter) => {
    setActiveFilters(prev => prev.filter(filter =>
      !(filter.value === filterToRemove.value && filter.category === filterToRemove.category)
    ))
  }

  const handleSearch = () => {
    console.log('Searching for:', searchInput, 'with filters:', activeFilters)
  }

  // Close when clicking outside the details panel
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        showFilterDetails &&
        detailsRef.current &&
        !detailsRef.current.contains(e.target as Node)
      ) {
        setShowFilterDetails(false)
        setSelectedFilter(null)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [showFilterDetails])

  const options: Record<string, { label: string, value: string }[]> = {
    secteur: [
      { label: 'Technologie', value: 'technologie' },
      { label: 'Santé', value: 'sante' },
      { label: 'Finance', value: 'finance' },
      { label: 'Éducation', value: 'education' },
    ],
    niveau: [
      { label: 'Bac', value: 'bac' },
      { label: 'Bac+2', value: 'bac2' },
      { label: 'Bac+3', value: 'bac3' },
      { label: 'Bac+5', value: 'bac5' },
    ],
    type: [
      { label: 'Alternance', value: 'alternance' },
      { label: 'Continue', value: 'continue' },
      { label: 'Intensive', value: 'intensive' },
    ],
    durée: [
      { label: '< 6 mois', value: 'moins6' },
      { label: '6-12 mois', value: '6a12' },
      { label: '> 12 mois', value: 'plus12' },
    ],
    prix: [
      { label: '< 1000FCFA', value: 'moins1000' },
      { label: '1000-2000FCFA', value: '1000a2000' },
      { label: '> 2000FCFA', value: 'plus2000' },
    ],
    localite: [
      { label: 'Abidjan', value: 'abidjan' },
      { label: 'Paris', value: 'paris' },
      { label: 'Remote', value: 'remote' },
    ],
    contrat: [
      { label: 'CDI', value: 'cdi' },
      { label: 'CDD', value: 'cdd' },
      { label: 'Stage', value: 'stage' },
      { label: 'Freelance', value: 'freelance' },
    ],
    domaine: [
      { label: 'Informatique', value: 'informatique' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Design', value: 'design' },
      { label: 'Commerce', value: 'commerce' },
    ]
  }

  const renderFilterDetails = () => {
    if (!selectedFilter) return null

    return (
      // stopPropagation so clicks inside don't bubble to parent
      <div
        ref={detailsRef}
        onClick={(e) => e.stopPropagation()}
        className="p-4 bg-white border rounded-lg shadow-md mt-4"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">
            {filterOptions.find(f => f.value === selectedFilter)?.label}
          </h3>
          <button
            type="button"
            aria-label="Close filter details"
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => {
              setShowFilterDetails(false)
              setSelectedFilter(null)
            }}
          >
            <X size={16} className='cursor-pointer' />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {options[selectedFilter]?.map(option => (
            // use a real button wrapper so clicks definitely work and show pointer
            <button
              key={option.value}
              type="button"
              onClick={() => addFilter(option.value, option.label, selectedFilter)}
              className="cursor-pointer"
            >
              <Badge variant="secondary" className="px-3 py-1">
                {option.label}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className='flex flex-col gap-4 p-6'>
      <div className='flex p-4 bg-gray-100 gap-4 rounded-lg items-center'>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            className='pl-10 w-full'
            placeholder='Rechercher un emploi, une offre'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Button type="button" className='cursor-pointer' onClick={handleSearch}>
          Rechercher
        </Button>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="default" className="flex items-center gap-1">
              <span>{filter.label}</span>
              <button
                type="button"
                onClick={() => removeFilter(filter)}
                aria-label={`Remove ${filter.label}`}
                className="ml-1 p-0"
              >
                <X size={14} className="cursor-pointer" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className='p-4 bg-white rounded-lg' onClick={() => { /* keep parent clickable if needed */ }}>
        <h2 className='text-2xl font-semibold text-blue-600 mb-4'>Filtrer les résultats</h2>
        <div className='flex flex-wrap gap-4'>
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              type="button"
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => handleFilterClick(option)}
            >
              <option.icon className='h-5 w-5' />
              {option.label}
            </Button>
          ))}
        </div>

        {showFilterDetails && selectedFilter && renderFilterDetails()}
      </div>
    </section>
  )
}

export default SecondPart
