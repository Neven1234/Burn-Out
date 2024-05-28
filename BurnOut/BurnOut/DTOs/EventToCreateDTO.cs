using BurnOut.Models;

namespace BurnOut.DTOs
{
    public class EventToCreateDTO
    {
        public string EventName { get; set; }
        public string Description { get; set; }
        public string Place { get; set; }
        public DateTime Date { get; set; }
    }
}
