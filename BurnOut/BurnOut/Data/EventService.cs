using BurnOut.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BurnOut.Data
{
    public class EventService : IEvent
    {
        private readonly AppDbContext _dbContext;

        public EventService(AppDbContext dbContext)
        {
           _dbContext = dbContext;
        }

        public async Task CreateEvent(Event createdEvent)
        {
           await _dbContext.Events.AddAsync(createdEvent);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Event>> GetAllEvents(Expression<Func<Event, bool>> filter = null)
        {
            var Events=filter==null? _dbContext.Events.ToList():_dbContext.Events.Where(filter).ToList();
            return Events;
        }

        public async Task<Event> GetEvent(int id)
        {
            var r = await _dbContext.Events.FindAsync(id);
            if(r!=null)
            {
                return r;
            }
            return null;

        }
    }
}
