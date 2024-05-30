namespace BurnOut.DTOs
{
    public class EventToReturn
    {
        public string EventName { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public string Place { get; set; }
        public DateTime Date { get; set; }
        public int ReciersCount { get; set; }
        public int AudianceCount { get; set; }
    }
}
