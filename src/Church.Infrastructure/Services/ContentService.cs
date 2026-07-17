using Church.Core.Models;
using Church.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Church.Infrastructure.Services;

public class ContentService
{
    private readonly ChurchDbContext _db;

    public ContentService(ChurchDbContext db) => _db = db;

    // Pages
    public async Task<List<Page>> GetPublishedPagesAsync() =>
        await _db.Pages.Where(p => p.IsPublished).OrderBy(p => p.SortOrder).ToListAsync();

    public async Task<Page?> GetPageBySlugAsync(string slug) =>
        await _db.Pages.FirstOrDefaultAsync(p => p.Slug == slug && p.IsPublished);

    public async Task<List<Page>> GetAllPagesAsync() =>
        await _db.Pages.OrderBy(p => p.SortOrder).ToListAsync();

    public async Task<Page?> GetPageByIdAsync(int id) =>
        await _db.Pages.FindAsync(id);

    public async Task<Page> CreatePageAsync(Page page)
    {
        page.CreatedAt = DateTime.UtcNow;
        page.UpdatedAt = DateTime.UtcNow;
        _db.Pages.Add(page);
        await _db.SaveChangesAsync();
        return page;
    }

    public async Task<Page?> UpdatePageAsync(int id, Page update)
    {
        var page = await _db.Pages.FindAsync(id);
        if (page == null) return null;
        page.Slug = update.Slug;
        page.Title = update.Title;
        page.Content = update.Content;
        page.MetaDescription = update.MetaDescription;
        page.IsPublished = update.IsPublished;
        page.SortOrder = update.SortOrder;
        page.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return page;
    }

    public async Task<bool> DeletePageAsync(int id)
    {
        var page = await _db.Pages.FindAsync(id);
        if (page == null) return false;
        _db.Pages.Remove(page);
        await _db.SaveChangesAsync();
        return true;
    }

    // News
    public async Task<List<News>> GetPublishedNewsAsync(int count = 20) =>
        await _db.News.Where(n => n.IsPublished).OrderByDescending(n => n.PublishedAt).Take(count).ToListAsync();

    public async Task<News?> GetNewsByIdAsync(int id) =>
        await _db.News.FindAsync(id);

    public async Task<List<News>> GetAllNewsAsync() =>
        await _db.News.OrderByDescending(n => n.CreatedAt).ToListAsync();

    public async Task<News> CreateNewsAsync(News news)
    {
        news.CreatedAt = DateTime.UtcNow;
        news.UpdatedAt = DateTime.UtcNow;
        _db.News.Add(news);
        await _db.SaveChangesAsync();
        return news;
    }

    public async Task<News?> UpdateNewsAsync(int id, News update)
    {
        var news = await _db.News.FindAsync(id);
        if (news == null) return null;
        news.Title = update.Title;
        news.Summary = update.Summary;
        news.Content = update.Content;
        news.ImageUrl = update.ImageUrl;
        news.IsPublished = update.IsPublished;
        news.IsFeatured = update.IsFeatured;
        news.PublishedAt = update.PublishedAt;
        news.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return news;
    }

    public async Task<bool> DeleteNewsAsync(int id)
    {
        var news = await _db.News.FindAsync(id);
        if (news == null) return false;
        _db.News.Remove(news);
        await _db.SaveChangesAsync();
        return true;
    }

    // Photos
    public async Task<List<Photo>> GetPhotosAsync(string? category = null)
    {
        var q = _db.Photos.AsQueryable();
        if (!string.IsNullOrEmpty(category))
            q = q.Where(p => p.Category == category);
        return await q.OrderBy(p => p.SortOrder).ToListAsync();
    }

    public async Task<Photo?> GetPhotoByIdAsync(int id) => await _db.Photos.FindAsync(id);

    public async Task<Photo> CreatePhotoAsync(Photo photo)
    {
        photo.CreatedAt = DateTime.UtcNow;
        _db.Photos.Add(photo);
        await _db.SaveChangesAsync();
        return photo;
    }

    public async Task<Photo?> UpdatePhotoAsync(int id, Photo update)
    {
        var photo = await _db.Photos.FindAsync(id);
        if (photo == null) return null;
        photo.Title = update.Title;
        photo.Url = update.Url;
        photo.Description = update.Description;
        photo.Category = update.Category;
        photo.SortOrder = update.SortOrder;
        await _db.SaveChangesAsync();
        return photo;
    }

    public async Task<bool> DeletePhotoAsync(int id)
    {
        var photo = await _db.Photos.FindAsync(id);
        if (photo == null) return false;
        _db.Photos.Remove(photo);
        await _db.SaveChangesAsync();
        return true;
    }

    // Videos
    public async Task<List<Video>> GetVideosAsync(string? category = null)
    {
        var q = _db.Videos.AsQueryable();
        if (!string.IsNullOrEmpty(category))
            q = q.Where(v => v.Category == category);
        return await q.OrderBy(v => v.SortOrder).ToListAsync();
    }

    public async Task<Video?> GetVideoByIdAsync(int id) => await _db.Videos.FindAsync(id);

    public async Task<Video> CreateVideoAsync(Video video)
    {
        video.CreatedAt = DateTime.UtcNow;
        _db.Videos.Add(video);
        await _db.SaveChangesAsync();
        return video;
    }

    public async Task<Video?> UpdateVideoAsync(int id, Video update)
    {
        var video = await _db.Videos.FindAsync(id);
        if (video == null) return null;
        video.Title = update.Title;
        video.VideoUrl = update.VideoUrl;
        video.Description = update.Description;
        video.Category = update.Category;
        video.SortOrder = update.SortOrder;
        await _db.SaveChangesAsync();
        return video;
    }

    public async Task<bool> DeleteVideoAsync(int id)
    {
        var video = await _db.Videos.FindAsync(id);
        if (video == null) return false;
        _db.Videos.Remove(video);
        await _db.SaveChangesAsync();
        return true;
    }

    // Events
    public async Task<List<Event>> GetUpcomingEventsAsync(int count = 10) =>
        await _db.Events.Where(e => e.IsPublished && e.EventDate >= DateTime.UtcNow)
            .OrderBy(e => e.EventDate).Take(count).ToListAsync();

    public async Task<List<Event>> GetAllEventsAsync() =>
        await _db.Events.OrderByDescending(e => e.EventDate).ToListAsync();

    public async Task<Event?> GetEventByIdAsync(int id) => await _db.Events.FindAsync(id);

    public async Task<Event> CreateEventAsync(Event evt)
    {
        evt.CreatedAt = DateTime.UtcNow;
        _db.Events.Add(evt);
        await _db.SaveChangesAsync();
        return evt;
    }

    public async Task<Event?> UpdateEventAsync(int id, Event update)
    {
        var evt = await _db.Events.FindAsync(id);
        if (evt == null) return null;
        evt.Title = update.Title;
        evt.Description = update.Description;
        evt.EventDate = update.EventDate;
        evt.Time = update.Time;
        evt.Location = update.Location;
        evt.ImageUrl = update.ImageUrl;
        evt.IsRecurring = update.IsRecurring;
        evt.RecurrenceRule = update.RecurrenceRule;
        evt.IsPublished = update.IsPublished;
        await _db.SaveChangesAsync();
        return evt;
    }

    public async Task<bool> DeleteEventAsync(int id)
    {
        var evt = await _db.Events.FindAsync(id);
        if (evt == null) return false;
        _db.Events.Remove(evt);
        await _db.SaveChangesAsync();
        return true;
    }

    // Announcements
    public async Task<List<Announcement>> GetActiveAnnouncementsAsync() =>
        await _db.Announcements.Where(a => a.IsActive && (a.ExpiresAt == null || a.ExpiresAt > DateTime.UtcNow))
            .OrderBy(a => a.SortOrder).ToListAsync();

    public async Task<List<Announcement>> GetAllAnnouncementsAsync() =>
        await _db.Announcements.OrderByDescending(a => a.CreatedAt).ToListAsync();

    public async Task<Announcement?> GetAnnouncementByIdAsync(int id) => await _db.Announcements.FindAsync(id);

    public async Task<Announcement> CreateAnnouncementAsync(Announcement ann)
    {
        ann.CreatedAt = DateTime.UtcNow;
        _db.Announcements.Add(ann);
        await _db.SaveChangesAsync();
        return ann;
    }

    public async Task<Announcement?> UpdateAnnouncementAsync(int id, Announcement update)
    {
        var ann = await _db.Announcements.FindAsync(id);
        if (ann == null) return null;
        ann.Title = update.Title;
        ann.Content = update.Content;
        ann.LinkUrl = update.LinkUrl;
        ann.LinkText = update.LinkText;
        ann.IsActive = update.IsActive;
        ann.SortOrder = update.SortOrder;
        ann.ExpiresAt = update.ExpiresAt;
        await _db.SaveChangesAsync();
        return ann;
    }

    public async Task<bool> DeleteAnnouncementAsync(int id)
    {
        var ann = await _db.Announcements.FindAsync(id);
        if (ann == null) return false;
        _db.Announcements.Remove(ann);
        await _db.SaveChangesAsync();
        return true;
    }

    // Settings
    public async Task<List<SiteSettings>> GetSettingsAsync(string? group = null)
    {
        var q = _db.SiteSettings.AsQueryable();
        if (!string.IsNullOrEmpty(group))
            q = q.Where(s => s.Group == group);
        return await q.OrderBy(s => s.Key).ToListAsync();
    }

    public async Task<SiteSettings?> GetSettingByKeyAsync(string key) =>
        await _db.SiteSettings.FirstOrDefaultAsync(s => s.Key == key);

    public async Task UpdateSettingAsync(string key, string value)
    {
        var setting = await _db.SiteSettings.FirstOrDefaultAsync(s => s.Key == key);
        if (setting != null)
        {
            setting.Value = value;
            await _db.SaveChangesAsync();
        }
    }
}
