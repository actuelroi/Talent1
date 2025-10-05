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
// components/SecondPart.tsx
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

interface FilterState {
  search: string
  secteur: string[]
  niveau: string[]
  type: string[]
  durée: string[]
  prix: string[]
  localite: string[]
  contrat: string[]
  domaine: string[]
}

interface SecondPartProps {
  onFiltersChange: (filters: FilterState) => void
  onSearch: (searchTerm: string) => void
  initialSearch?: string
}

const SecondPart: React.FC<SecondPartProps> = ({ 
  onFiltersChange, 
  onSearch,
  initialSearch = ''
}) => {
  const [searchInput, setSearchInput] = useState(initialSearch)
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

  // Convert active filters to filter state
  const getFilterState = (filters: ActiveFilter[]): FilterState => {
    const state: FilterState = {
      search: searchInput,
      secteur: [],
      niveau: [],
      type: [],
      durée: [],
      prix: [],
      localite: [],
      contrat: [],
      domaine: []
    }

    filters.forEach(filter => {
      if (state[filter.category as keyof FilterState]) {
        (state[filter.category as keyof FilterState] as string[]).push(filter.value)
      }
    })

    return state
  }

  // Notify parent when filters change - with safety check
  useEffect(() => {
    const filterState = getFilterState(activeFilters)
    if (onFiltersChange && typeof onFiltersChange === 'function') {
      onFiltersChange(filterState)
    }
  }, [activeFilters, searchInput, onFiltersChange])

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
    setShowFilterDetails(false)
    setSelectedFilter(null)
  }

  const removeFilter = (filterToRemove: ActiveFilter) => {
    setActiveFilters(prev => prev.filter(filter =>
      !(filter.value === filterToRemove.value && filter.category === filterToRemove.category)
    ))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setSearchInput('')
    // Also notify parent of cleared filters
    if (onFiltersChange && typeof onFiltersChange === 'function') {
      onFiltersChange({
        search: '',
        secteur: [],
        niveau: [],
        type: [],
        durée: [],
        prix: [],
        localite: [],
        contrat: [],
        domaine: []
      })
    }
    if (onSearch && typeof onSearch === 'function') {
      onSearch('')
    }
  }

  const handleSearch = () => {
    if (onSearch && typeof onSearch === 'function') {
      onSearch(searchInput)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

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

  // Filter options mapped to actual job posting fields
  const options: Record<string, { label: string, value: string }[]> = {
    secteur: [
      { label: 'Technologie', value: 'technologie' },
      { label: 'Santé', value: 'sante' },
      { label: 'Finance', value: 'finance' },
      { label: 'Éducation', value: 'education' },
      { label: 'Design', value: 'design' },
      { label: 'Commerce', value: 'commerce' },
      { label: 'Industrie', value: 'industrie' },
      { label: 'Services', value: 'services' },
    ],
    niveau: [
      { label: 'Bac', value: 'bac' },
      { label: 'Bac+2', value: 'bac2' },
      { label: 'Bac+3', value: 'bac3' },
      { label: 'Bac+5', value: 'bac5' },
      { label: 'Doctorat', value: 'doctorat' },
    ],
    type: [
      { label: 'Alternance', value: 'alternance' },
      { label: 'Continue', value: 'continue' },
      { label: 'Intensive', value: 'intensive' },
      { label: 'En ligne', value: 'online' },
    ],
    durée: [
      { label: '< 6 mois', value: 'moins6' },
      { label: '6-12 mois', value: '6a12' },
      { label: '> 12 mois', value: 'plus12' },
    ],
    prix: [
      { label: '< 1000€', value: 'moins1000' },
      { label: '1000-2000€', value: '1000a2000' },
      { label: '2000-3000€', value: '2000a3000' },
      { label: '3000-4000€', value: '3000a4000' },
      { label: '> 4000€', value: 'plus4000' },
    ],
    localite: [
      { label: 'Abidjan', value: 'abidjan' },
      { label: 'Paris', value: 'paris' },
      { label: 'Lyon', value: 'lyon' },
      { label: 'Marseille', value: 'marseille' },
      { label: 'Remote', value: 'remote' },
      { label: 'Hybride', value: 'hybride' },
    ],
    contrat: [
      { label: 'CDI', value: 'FULL_TIME' },
      { label: 'CDD', value: 'PART_TIME' },
      { label: 'Stage', value: 'INTERNSHIP' },
      { label: 'Freelance', value: 'CONTRACT' },
      { label: 'Temporaire', value: 'TEMPORARY' },
    ],
    domaine: [
      { label: 'Informatique', value: 'informatique' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Design', value: 'design' },
      { label: 'Commerce', value: 'commerce' },
      { label: 'Ingénierie', value: 'ingenierie' },
      { label: 'Santé', value: 'sante' },
      { label: 'Éducation', value: 'education' },
      { label: 'Finance', value: 'finance' },
    ]
  }

  const renderFilterDetails = () => {
    if (!selectedFilter) return null

    return (
      <div
        ref={detailsRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute z-50 p-4 bg-white border rounded-lg shadow-md mt-2 w-80"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">
            {filterOptions.find(f => f.value === selectedFilter)?.label}
          </h3>
          <button
            type="button"
            aria-label="Close filter details"
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            onClick={() => {
              setShowFilterDetails(false)
              setSelectedFilter(null)
            }}
          >
            <X size={16} className='cursor-pointer' />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
          {options[selectedFilter]?.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => addFilter(option.value, option.label, selectedFilter)}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <Badge 
                variant="secondary" 
                className="px-3 py-2 text-sm hover:bg-blue-100 hover:text-blue-800 transition-colors"
              >
                {option.label}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className='flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm'>
      {/* Search Bar */}
      <div className='flex p-4 bg-gray-50 gap-4 rounded-lg items-center border'>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            className='pl-10 w-full'
            placeholder='Rechercher un emploi, une offre, une entreprise...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button 
          type="button" 
          className='cursor-pointer bg-blue-600 hover:bg-blue-700 px-6'
          onClick={handleSearch}
        >
          Rechercher
        </Button>
      </div>

      {/* Active filters */}
      {(activeFilters.length > 0 || searchInput) && (
        <div className="flex flex-col gap-3 p-4 bg-blue-50 rounded-lg border">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-blue-800">Filtres actifs</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
            >
              Tout effacer
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchInput && (
              <Badge variant="default" className="flex items-center gap-1 bg-blue-600">
                <span>Recherche: "{searchInput}"</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('')
                    if (onSearch && typeof onSearch === 'function') {
                      onSearch('')
                    }
                  }}
                  aria-label="Remove search"
                  className="ml-1 p-0 hover:bg-blue-700 rounded-full"
                >
                  <X size={14} className="cursor-pointer" />
                </button>
              </Badge>
            )}
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="default" className="flex items-center gap-1 bg-blue-600">
                <span className="text-xs">{filter.label}</span>
                <button
                  type="button"
                  onClick={() => removeFilter(filter)}
                  aria-label={`Remove ${filter.label}`}
                  className="ml-1 p-0 hover:bg-blue-700 rounded-full"
                >
                  <X size={14} className="cursor-pointer" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Filter Buttons */}
      <div className='p-4 bg-white rounded-lg border relative'>
        <h2 className='text-xl font-semibold text-blue-600 mb-4'>Filtrer les résultats</h2>
        <div className='flex flex-wrap gap-3'>
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              type="button"
              className={`flex items-center gap-2 cursor-pointer transition-all ${
                activeFilters.some(f => f.category === option.value) 
                  ? 'bg-blue-100 border-blue-300 text-blue-700' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleFilterClick(option)}
            >
              <option.icon className='h-4 w-4' />
              {option.label}
              {activeFilters.some(f => f.category === option.value) && (
                <span className="ml-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {activeFilters.filter(f => f.category === option.value).length}
                </span>
              )}
            </Button>
          ))}
        </div>

        {showFilterDetails && selectedFilter && renderFilterDetails()}
      </div>
    </section>
  )
}

export default SecondPart