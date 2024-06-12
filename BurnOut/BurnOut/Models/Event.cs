using System.ComponentModel.DataAnnotations;

namespace BurnOut.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }
        public string EventName { get; set; }
        public string Description { get; set; }
        public bool Approved { get; set; }=false;
        public string OrganizerId { get; set; }
        public virtual ApplicationUser Organizer { get; set; }
        public float AudiencePrice { get; set; }
        public float RacerPrice { get; set; }
        public string Place { get; set; }
        public string PhotoUrl { get; set; }
        public string? PublicId { get; set; }
        public DateTime Date { get; set; }
        public virtual ICollection<ApplicationUser>? Racers { get; set; }
        public virtual ICollection<ApplicationUser>? Audience { get; set; }  
    }
}
