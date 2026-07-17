namespace Church.Core.Models;

public class Event
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int DayOfWeek { get; set; }
    public string? Time { get; set; }
    public string? Location { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsRecurring { get; set; } = true;
    public string? RecurrenceRule { get; set; }
    public bool IsPublished { get; set; } = true;
    public int SortOrder { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
