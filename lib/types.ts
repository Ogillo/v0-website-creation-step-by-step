// Type definitions for the entire application

export interface Story {
  id: string
  title: string
  excerpt: string
  content: string
  category: "education" | "sponsorship" | "celebrations" | "community"
  imageUrl: string
  author: string
  date: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  imageUrl: string
  category: "community" | "fundraising" | "training" | "celebration"
  registrationRequired: boolean
  maxAttendees?: number
  currentAttendees: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  createdAt: string
  updatedAt: string
}

export interface Program {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  imageUrl: string
  icon: string
  targetAge: string
  goals: string[]
  activities: string[]
  impact: {
    metric: string
    value: string
  }[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface GalleryItem {
  id: string
  title: string
  description: string
  url: string
  thumbnailUrl: string
  category: "education" | "sponsorship" | "celebrations" | "community"
  type: "image" | "video"
  duration?: string
  uploadedBy: string
  uploadedAt: string
  tags: string[]
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "new" | "read" | "responded" | "archived"
  createdAt: string
  respondedAt?: string
}

export interface NewsletterSubscription {
  id: string
  email: string
  name?: string
  status: "active" | "unsubscribed"
  subscribedAt: string
  unsubscribedAt?: string
}

export interface VolunteerApplication {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  dateOfBirth: string
  occupation: string
  skills: string[]
  availability: string
  preferredProgram: string
  experience: string
  motivation: string
  references: {
    name: string
    relationship: string
    contact: string
  }[]
  status: "pending" | "reviewing" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  reviewNotes?: string
}

export interface Donation {
  id: string
  amount: number
  currency: string
  donorName: string
  donorEmail: string
  donorPhone?: string
  isAnonymous: boolean
  frequency: "one-time" | "monthly" | "quarterly" | "annual"
  program?: string
  paymentMethod: "mpesa" | "bank" | "card"
  paymentStatus: "pending" | "completed" | "failed" | "refunded"
  transactionId?: string
  receiptUrl?: string
  createdAt: string
  processedAt?: string
}

export interface SiteSettings {
  id: string
  siteName: string
  tagline: string
  description: string
  email: string
  phone: string
  address: string
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
    linkedin?: string
  }
  officeHours: string
  emergencyContact: string
  updatedAt: string
}
