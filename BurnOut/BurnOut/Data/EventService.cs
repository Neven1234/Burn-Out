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

        public async Task<string> CreateEvent(Event createdEvent)
        {
           await _dbContext.Events.AddAsync(createdEvent);
           if(await SaveChanges())
            {
                return "Event created successfully";
            }
            return null;
        }

        public async Task<IEnumerable<Event>> GetAllEvents(Expression<Func<Event, bool>> filter = null)
        {
            var Events=filter==null? _dbContext.Events.ToList():_dbContext.Events.Where(filter).ToList();
            return Events;
        }

       

        public async Task<Event> GetEventByOrganizerEmail(string organizerEmail)
        {
           var Event= await _dbContext.Events.FirstOrDefaultAsync(e=>e.Organizer.Email==organizerEmail);
            return Event;
        }

       

        public async Task<string> UpdateRacerAndAudience(Event PayedEvent, string racer, ApplicationUser user)
        {
            if(racer=="Racer")
            {
                PayedEvent.Racers.Add(user);
                
            }
            else
            {
                PayedEvent.Audience.Add(user);
            }
            if(await SaveChanges())
            {
                return $"You Have Been Added To The {racer}'s List Successfully";
            }
            return null;
        }
        public async Task<bool> SaveChanges()
        {
           return await _dbContext.SaveChangesAsync() > 0;
        }

       

        public async Task DeleteEvent(Event eventToDelete)
        {
                _dbContext.Events.Remove(eventToDelete);
               
        }

        public async Task<Event> GetEvent(int id)
        {
            var eventToreturn=await _dbContext.Events.FirstOrDefaultAsync(e=>e.Id==id);
           if (eventToreturn != null)
            {
                return eventToreturn;

            }
            return null;
        }
    }
}
