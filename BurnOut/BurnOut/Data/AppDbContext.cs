using BurnOut.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace BurnOut.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {

        public DbSet<Event> Events { get; set; }
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);

            SeedRoles(builder);

            // Configuring one-to-many relationship between Event and Organizer
            builder.Entity<Event>()
                .HasOne(e => e.Organizer)
                .WithMany() // No navigation property in ApplicationUser
                .HasForeignKey(e => e.OrganizerId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuring many-to-many relationship between Event and Racers
            builder.Entity<Event>()
                .HasMany(e => e.Racers)
                .WithMany("RacerEvents")
                .UsingEntity<Dictionary<string, object>>(
                    "EventRacer",
                    j => j
                        .HasOne<ApplicationUser>()
                        .WithMany()
                        .HasForeignKey("RacerId")
                        .OnDelete(DeleteBehavior.Restrict),
                    j => j
                        .HasOne<Event>()
                        .WithMany()
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade));

            // Configuring many-to-many relationship between Event and Audience
            builder.Entity<Event>()
                .HasMany(e => e.Audience)
                .WithMany("AudienceEvents")
                .UsingEntity<Dictionary<string, object>>(
                    "EventAudience",
                    j => j
                        .HasOne<ApplicationUser>()
                        .WithMany()
                        .HasForeignKey("AudienceId")
                        .OnDelete(DeleteBehavior.Restrict),
                    j => j
                        .HasOne<Event>()
                        .WithMany()
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade));


        }
        private static void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole() { Id = "1", Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "ADMIN" },
                new IdentityRole() { Id = "2", Name = "Organizer", ConcurrencyStamp = "2", NormalizedName = "ORGANIZER" },
                new IdentityRole() { Id = "3", Name = "Racer", ConcurrencyStamp = "3", NormalizedName = "RACER" },
                new IdentityRole() { Id = "4", Name = "Audience", ConcurrencyStamp = "4", NormalizedName = "AUDIENCE" }
            );
        }
    }
}
