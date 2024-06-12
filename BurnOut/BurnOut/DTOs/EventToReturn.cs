namespace BurnOut.DTOs
{
    public class EventToReturn
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string OrganzerName { get; set; }
        public string? PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public bool Approved { get; set; } = false;
        public string Description { get; set; }
        public float AudiencePrice { get; set; }
        public float RacerPrice { get; set; }
        public string OrganizerId { get; set; }
        public string Place { get; set; }
        public DateTime Date { get; set; }
        public int ReciersCount { get; set; }
        public int AudianceCount { get; set; }

    }
}
