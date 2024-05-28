using BurnOut.Models;
using System.Linq.Expressions;

namespace BurnOut.Data
{
    public interface IEvent
    {
        Task<IEnumerable<Event>> GetAllEvents(Expression<Func<Event, bool>> filter = null);
        Task<Event> GetEvent(int id);
        Task CreateEvent(Event createdEvent);

    }
}
