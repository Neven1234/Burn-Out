using AutoMapper;
using BurnOut.Models;

namespace BurnOut.DTOs
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<EventToCreateDTO, Event>();
            CreateMap<Event, EventToReturn>()
                .ForMember(e => e.ReciersCount, opt =>
                opt.MapFrom(ev => ev.Racers.Count()))
                .ForMember(e => e.AudianceCount, opt =>
                opt.MapFrom(ev=>ev.Audience.Count()))
                .ForMember(e=>e.OrganzerName,opt=>
                opt.MapFrom(ev=>ev.Organizer.UserName));
            CreateMap<EventForUpdateDTO, Event>().ReverseMap();

        }
    }
}
