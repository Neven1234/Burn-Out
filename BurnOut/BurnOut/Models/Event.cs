namespace BurnOut.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string OrganizerId { get; set; }
        public ApplicationUser Organizer { get; set; }
        public string Place { get; set; }
        public DateTime Date { get; set; }
        public ICollection<ApplicationUser> Racers { get; set; }
        public ICollection<ApplicationUser> Audience { get; set; }  
    }
}
