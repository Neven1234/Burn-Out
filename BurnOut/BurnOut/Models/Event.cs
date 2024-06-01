namespace BurnOut.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string Description { get; set; }
        public string OrganizerId { get; set; }
        public ApplicationUser Organizer { get; set; }
        public float AudiencePrice { get; set; }
        public float RacerPrice { get; set; }
        public string Place { get; set; }
        public string PhotoUrl { get; set; }
        public string? PublicId { get; set; }
        public DateTime Date { get; set; }
        public ICollection<ApplicationUser>? Racers { get; set; }
        public ICollection<ApplicationUser>? Audience { get; set; }  
    }
}
