namespace Church.Core.DTOs;

public record PageDto(int Id, string Slug, string Title, string Content, string? MetaDescription, int? SortOrder);
public record NewsDto(int Id, string Title, string Summary, string Content, string? ImageUrl, bool IsFeatured, DateTime PublishedAt);
public record PhotoDto(int Id, string Title, string Url, string? ThumbnailUrl, string? Description, string? Category, int SortOrder);
public record VideoDto(int Id, string Title, string VideoUrl, string? ThumbnailUrl, string? Description, string? Category, int SortOrder);
public record EventDto(int Id, string Title, string? Description, int DayOfWeek, string? Time, string? Location, string? ImageUrl, bool IsRecurring, bool IsPublished, int SortOrder);
public record AnnouncementDto(int Id, string Title, string Content, string? ImageUrl, string? LinkUrl, string? LinkText, bool IsActive, int SortOrder);
public record SiteSettingDto(int Id, string Key, string Value, string? Description, string? Group);
public record LoginRequest(string Username, string Password);
public record LoginResponse(string Token, string Username, string? DisplayName);
