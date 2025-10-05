// types/filters.ts
export interface ActiveFilter {
  label: string
  value: string
  category: string
}

export interface FilterOption {
  label: string
  value: string
  icon: React.ElementType
}

export interface JobFilters {
  search?: string
  location?: string
  employmentType?: string[]
  remotePolicy?: string[]
  experienceLevel?: string[]
  salaryRange?: {
    min?: number
    max?: number
  }
  categories?: string[]
}