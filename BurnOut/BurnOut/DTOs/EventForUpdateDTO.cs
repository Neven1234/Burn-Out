using BurnOut.Models;

namespace BurnOut.DTOs
{
    public class EventForUpdateDTO
    {
        public string EventName { get; set; }
        public string Description { get; set; }
        public float AudiencePrice { get; set; }
        public float RacerPrice { get; set; }
        public string Place { get; set; }
        public DateTime Date { get; set; }

    }
}
