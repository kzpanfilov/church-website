import axios from 'axios';
import type { Page, NewsItem, Photo, Video, ChurchEvent, Announcement, SiteSetting, LoginResponse } from './types';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public endpoints
export const getPages = () => api.get<Page[]>('/pages').then(r => r.data);
export const getPageBySlug = (slug: string) => api.get<Page>(`/pages/${slug}`).then(r => r.data);
export const getNews = (count = 20) => api.get<NewsItem[]>(`/news?count=${count}`).then(r => r.data);
export const getNewsById = (id: number) => api.get<NewsItem>(`/news/${id}`).then(r => r.data);
export const getPhotos = (category?: string) => api.get<Photo[]>('/gallery/photos', { params: { category } }).then(r => r.data);
export const getVideos = (category?: string) => api.get<Video[]>('/gallery/videos', { params: { category } }).then(r => r.data);
export const getUpcomingEvents = (count = 10) => api.get<ChurchEvent[]>(`/events?count=${count}`).then(r => r.data);
export const getAnnouncements = () => api.get<Announcement[]>('/announcements').then(r => r.data);
export const getSettings = (group?: string) => api.get<SiteSetting[]>('/settings', { params: { group } }).then(r => r.data);

// Auth
export const login = (username: string, password: string) =>
  api.post<LoginResponse>('/auth/login', { username, password }).then(r => r.data);

// Admin endpoints
export const getAllPages = () => api.get<Page[]>('/pages/all').then(r => r.data);
export const getAllNews = () => api.get<NewsItem[]>('/news/all').then(r => r.data);
export const createPage = (page: Partial<Page>) => api.post<Page>('/pages', page).then(r => r.data);
export const updatePage = (id: number, page: Partial<Page>) => api.put<Page>(`/pages/${id}`, page).then(r => r.data);
export const deletePage = (id: number) => api.delete(`/pages/${id}`);
export const createNews = (news: Partial<NewsItem>) => api.post<NewsItem>('/news', news).then(r => r.data);
export const updateNews = (id: number, news: Partial<NewsItem>) => api.put<NewsItem>(`/news/${id}`, news).then(r => r.data);
export const deleteNews = (id: number) => api.delete(`/news/${id}`);
export const createPhoto = (photo: Partial<Photo>) => api.post<Photo>('/gallery/photos', photo).then(r => r.data);
export const deletePhoto = (id: number) => api.delete(`/gallery/photos/${id}`);
export const createVideo = (video: Partial<Video>) => api.post<Video>('/gallery/videos', video).then(r => r.data);
export const deleteVideo = (id: number) => api.delete(`/gallery/videos/${id}`);
export const createEvent = (evt: Partial<ChurchEvent>) => api.post<ChurchEvent>('/events', evt).then(r => r.data);
export const deleteEvent = (id: number) => api.delete(`/events/${id}`);
export const createAnnouncement = (ann: Partial<Announcement>) => api.post<Announcement>('/announcements', ann).then(r => r.data);
export const deleteAnnouncement = (id: number) => api.delete(`/announcements/${id}`);
