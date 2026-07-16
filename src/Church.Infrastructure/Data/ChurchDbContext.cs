using Church.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Church.Infrastructure.Data;

public class ChurchDbContext : DbContext
{
    public ChurchDbContext(DbContextOptions<ChurchDbContext> options) : base(options) { }

    public DbSet<Page> Pages => Set<Page>();
    public DbSet<News> News => Set<News>();
    public DbSet<Photo> Photos => Set<Photo>();
    public DbSet<Video> Videos => Set<Video>();
    public DbSet<Event> Events => Set<Event>();
    public DbSet<Announcement> Announcements => Set<Announcement>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();
    public DbSet<SiteSettings> SiteSettings => Set<SiteSettings>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Page>(e =>
        {
            e.HasIndex(p => p.Slug).IsUnique();
            e.Property(p => p.Slug).HasMaxLength(200);
            e.Property(p => p.Title).HasMaxLength(500);
        });

        modelBuilder.Entity<News>(e =>
        {
            e.Property(n => n.Title).HasMaxLength(500);
            e.Property(n => n.Summary).HasMaxLength(1000);
        });

        modelBuilder.Entity<Photo>(e =>
        {
            e.Property(p => p.Title).HasMaxLength(500);
            e.Property(p => p.Category).HasMaxLength(200);
        });

        modelBuilder.Entity<Video>(e =>
        {
            e.Property(v => v.Title).HasMaxLength(500);
            e.Property(v => v.Category).HasMaxLength(200);
        });

        modelBuilder.Entity<Event>(e =>
        {
            e.Property(ev => ev.Title).HasMaxLength(500);
        });

        modelBuilder.Entity<Announcement>(e =>
        {
            e.Property(a => a.Title).HasMaxLength(500);
        });

        modelBuilder.Entity<AdminUser>(e =>
        {
            e.HasIndex(u => u.Username).IsUnique();
            e.Property(u => u.Username).HasMaxLength(100);
        });

        modelBuilder.Entity<SiteSettings>(e =>
        {
            e.HasIndex(s => s.Key).IsUnique();
            e.Property(s => s.Key).HasMaxLength(200);
        });
    }
}
