using AutoMapper;
using BurnOut.Models;

namespace BurnOut.DTOs
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<EventToCreateDTO, Event>();
        }
    }
}
