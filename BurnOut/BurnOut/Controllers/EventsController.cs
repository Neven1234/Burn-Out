using AutoMapper;
using BurnOut.Data;
using BurnOut.DTOs;
using BurnOut.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            var events = await _even.GetAllEvents();
            return Ok(events);
        }
        [AllowAnonymous]
        [HttpGet("Event-Filter")]
        public async Task<IActionResult> EventFilter(string eventName)
        {
            var events= await _even.GetAllEvents(e=>e.EventName==eventName);
            return Ok(events);
        }
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult>GetEventById(int id)
        {
            var eventById= _even.GetEvent(id);
            if(eventById!=null)
            {
                return Ok(eventById);
            }
            return BadRequest();
        }
        [HttpPost]
        public async Task<IActionResult> AddEvent(EventToCreateDTO newEvent)
        {
            var role = User.FindFirstValue("Role");
            if(role!= "Organizer")
            {
                return Unauthorized();
            }

            var eventToCreat = _mapper.Map<Event>(newEvent);
            eventToCreat.OrganizerId =  User.FindFirstValue("userId");
            eventToCreat.Organizer = await _auth.GetUser(eventToCreat.OrganizerId);
            await _even.CreateEvent(eventToCreat);
            return Ok(newEvent);
        }
    }
}
