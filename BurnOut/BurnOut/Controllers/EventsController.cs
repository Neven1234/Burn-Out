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
        private readonly IOptions<CloudinarySettings> _cloudinaryConfi;
        private Cloudinary _Cloudinary;
        public EventsController(IEvent even,IAuth auth,IMapper mapper, IOptions<CloudinarySettings> CloudinaryConfi)
        {
           _even = even;
           _auth = auth;
            _mapper = mapper;
            _cloudinaryConfi=CloudinaryConfi;
            Account account = new Account(
              _cloudinaryConfi.Value.CloudName,
              _cloudinaryConfi.Value.ApiKey,
              _cloudinaryConfi.Value.ApiSecret
               );
            _Cloudinary = new Cloudinary(account);
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var events = await _even.GetAllEvents();
            var eventsToReturn = _mapper.Map<IEnumerable<EventToReturn>>(events);
            return Ok(eventsToReturn);
        }
        [AllowAnonymous]
        [HttpGet("Event-Filter")]
        public async Task<IActionResult> EventFilter(string eventName)
        {
            var events= await _even.GetAllEvents(e=>e.EventName==eventName);
            var eventsToReturn = _mapper.Map<IEnumerable<EventToReturn>>(events);

            return Ok(eventsToReturn);
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
        public async Task<IActionResult> AddEvent([FromForm] EventToCreateDTO newEvent)
        {
            var role = User.FindFirstValue("Role");
            if(role!= "Organizer")
            {
                return Unauthorized();
            }
            var file=newEvent.File;
            var UploadResolt = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stram = file.OpenReadStream())
                {

                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stram),
                        // PublicId = "test",
                        //if user upload long photo we will focus on the face to make the image square
                        // Transformation = new Transformation().Gravity("face").Height(300).Width(300).Crop("thumb").Chain()
                        //.Radius("max").Chain()

                    };
                    UploadResolt = _Cloudinary.Upload(uploadParams);

                }
            }
            newEvent.PhotoUrl= UploadResolt.Url.ToString();
            newEvent.PublicId = UploadResolt.PublicId;
            var eventToCreat = _mapper.Map<Event>(newEvent);
            eventToCreat.OrganizerId =  User.FindFirstValue("userId");
            eventToCreat.Organizer = await _auth.GetUser(eventToCreat.OrganizerId);
            await _even.CreateEvent(eventToCreat);
            return Ok(newEvent);
        }
    }
}
