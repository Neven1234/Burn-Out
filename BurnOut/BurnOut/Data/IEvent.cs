using BurnOut.Models;
using System.Linq.Expressions;

namespace BurnOut.Data
{
    public interface IEvent
    {
        Task<IEnumerable<Event>> GetAllEvents(Expression<Func<Event, bool>> filter = null);
        Task<Event> GetEvent(int id);
        Task<string> CreateEvent(Event createdEvent);
        Task <Event> GetEventByOrganizerEmail(string organizerEmail);
        Task<string> UpdateRacerAndAudience(Event PayedEvent, string racer,ApplicationUser user);
        Task DeleteEvent(Event eventToDelete);
        Task<bool> SaveChanges();
    }
}
