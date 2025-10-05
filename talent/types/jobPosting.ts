// // types/jobPosting.ts

import { Category, Company, EmploymentType, ExperienceLevel, JobPosting, JobPostingCategory, RemotePolicy } from "@/lib/generated/prisma"

// import { Category, Company, JobPosting, JobPostingCategory } from "@/lib/generated/prisma"


// export type JobPostingWithRelations = JobPosting & {
//   company: Company
//   jobCategories: (JobPostingCategory & {
//     category: Category
//   })[]
// }

// export type JobPostingFilters = {
//   search?: string
//   location?: string
//   employmentType?: string
//   remotePolicy?: string
//   experienceLevel?: string
//   salaryMin?: number
//   salaryMax?: number
// }

// export type FormattedJobPosting = {
//   id: string
//   name: string
//   title: string
//   contract: string
//   time: string
//   location: string
//   image: string
//   logo: string
//   description: string
//   offer: string
//   tags: string[]
//   salary?: number
//   remotePolicy: string
//   experienceLevel: string
//   isFeatured: boolean
//   company: {
//     isVerified: boolean
//     logoText?: string
//     industries?: string[]
//   }
// }



// types/jobPosting.ts


export type JobPostingWithRelations = JobPosting & {
  company: Company
  jobCategories: (JobPostingCategory & {
    category: Category
  })[]
}

export type FormattedJobPosting = {
  id: string
  name: string
  title: string
  contract: string
  time: string
  location: string
  image: string
  logo: string
  description: string
  offer: string
  tags: string[]
  salary?: number
  salaryMin?: number
  salaryMax?: number
  currency?: string
  requirements?: string
responsibilities?: string
views?: number
applicantsCount?: number
benefits?: string
applicationUrl?: string
  remotePolicy: string
  experienceLevel: string
  isFeatured: boolean
  company: {
    isVerified: boolean
    logoText?: string
    industries?: string[]
  }
}

export type JobPostingFilters = {
  search?: string
  location?: string
  employmentType?: EmploymentType
  remotePolicy?: RemotePolicy
  experienceLevel?: ExperienceLevel
  salaryMin?: number
  salaryMax?: number
}

// Add this type for the API response
export type JobPostingsResponse = {
  jobs: FormattedJobPosting[]
  nextCursor?: string
}