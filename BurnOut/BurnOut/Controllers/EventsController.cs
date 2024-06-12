using AutoMapper;
using BurnOut.Data;
using BurnOut.DTOs;
using BurnOut.Helper;
using BurnOut.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;


namespace BurnOut.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEvent _even;
        private readonly IAuth _auth;
        private readonly IMapper _mapper;
        public EventsController(IEvent even,IAuth auth,IMapper mapper)
        {
           _even = even;
           _auth = auth;
            _mapper = mapper;
           
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var events = await _even.GetAllEvents(e=>e.Approved==true);
            var eventsToReturn = _mapper.Map<IEnumerable<EventToReturn>>(events);
            return Ok(eventsToReturn);
        }
        [AllowAnonymous]
        [HttpGet("Event-Filter/{eventName}")]
        public async Task<IActionResult> EventFilter(string eventName)
        {
            var events= await _even.GetAllEvents(e=>e.EventName.ToLower().Contains(eventName.ToLower()) && e.Approved==true);
            var eventsToReturn = _mapper.Map<IEnumerable<EventToReturn>>(events);

            return Ok(eventsToReturn);
        }
        [HttpGet("Admin-View")]
        public async Task<IActionResult> GetAllEventsForAdmin()
        {
            var role = User.FindFirstValue("Role");
            if (role!= "Admin")
            {
                return Unauthorized();
            }
            var events = await _even.GetAllEvents();
            var eventsToReturn = _mapper.Map<IEnumerable<EventToReturn>>(events);
            return Ok(eventsToReturn);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult>GetEventById(int id)
        {
            var eventById= await _even.GetEvent(id);
            var eventToReturn = _mapper.Map<EventToReturn>(eventById);
            if(eventById!=null)
            {
                return Ok(eventToReturn);
            }
            return BadRequest();
        }
        [HttpPost]
        public async Task<IActionResult> AddEvent(EventToCreateDTO newEvent)
        {
            var role = User.FindFirstValue("Role");
            if (role != "Organizer")
            {
                return Unauthorized();
            }
            var eventToCreat = _mapper.Map<Event>(newEvent);
            eventToCreat.OrganizerId = User.FindFirstValue("userId");
            eventToCreat.Organizer = await _auth.GetUserById(eventToCreat.OrganizerId);
            var result = await _even.CreateEvent(eventToCreat);
            if (result == null)
            {
                return BadRequest("Couldn't create event");
            }
            return Ok(newEvent);
        }

        [HttpPut("Approve/{id}")]
        public async Task<IActionResult> ApproveOnEvent(int id)
        {
            var eventFromRepo = await _even.GetEvent(id);
            eventFromRepo.Approved = true;
            if (await _even.SaveChanges()){
                return Ok("Event Approved");

            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult>UpdateEvent(int id,EventForUpdateDTO eventForUpdateDTO)
        {
            var eventFromRepo = await _even.GetEvent(id);
            var role = User.FindFirstValue("Role");
            if(eventFromRepo.OrganizerId!=User.FindFirstValue("userId") && role!= "Admin")
            {
                return Unauthorized();
            }
            _mapper.Map(eventForUpdateDTO, eventFromRepo);
            if(await _even.SaveChanges())
            {
                return Ok("Event updated successfully");
            }
            return BadRequest("Couldn't updated");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult>DeleteEvent(int id)
        {
            var eventToDelete=await _even.GetEvent(id);
            var role = User.FindFirstValue("Role");
            if (eventToDelete.OrganizerId != User.FindFirstValue("userId") && role != "Admin")
            {
                return Unauthorized();
            }
            await _even.DeleteEvent(eventToDelete);
            if(await _even.SaveChanges())
            {
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost("Update-Event-List")]
        public async Task<IActionResult> AddRacerOrAudience(EventToReturn eventToReturn)
        {
            var user = await _auth.GetUserById(User.FindFirstValue("userId"));
            
            if (user == null)
            {
                return BadRequest();
            }
            var theEvent = await _even.GetEvent(eventToReturn.Id);
            var result = await _even.UpdateRacerAndAudience(theEvent, User.FindFirstValue("Role"), user);
            if(result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }
    }
}
