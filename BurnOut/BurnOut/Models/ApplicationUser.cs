using Microsoft.AspNetCore.Identity;

namespace BurnOut.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? CarType { get; set; }// for racers
        public string Gender { get; set; }
        public int Age { get; set; }
        public long UserID { get; set; }
        public string? License {get;set;}
        public ICollection<Event>? RacerEvents { get; set; }
        public ICollection<Event>? AudienceEvents { get; set; }
    }
}
