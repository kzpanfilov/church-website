export interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
  metaDescription?: string;
  isPublished: boolean;
  sortOrder?: number;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt: string;
}

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl?: string;
  description?: string;
  category?: string;
  sortOrder: number;
}

export interface Video {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description?: string;
  category?: string;
  sortOrder: number;
}

export interface ChurchEvent {
  id: number;
  title: string;
  description?: string;
  eventDate: string;
  time?: string;
  location?: string;
  imageUrl?: string;
  isRecurring: boolean;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface SiteSetting {
  id: number;
  key: string;
  value: string;
  description?: string;
  group?: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  displayName?: string;
}
