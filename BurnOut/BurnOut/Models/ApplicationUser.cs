﻿using Microsoft.AspNetCore.Identity;

namespace BurnOut.Models
{
    public class ApplicationUser:IdentityUser
    {
        public string? CarType { get; set; }// for racers
        public string Type { get; set; }
        public int Age { get; set; }
        public int UserID { get; set; }
        public ICollection<Event>? RacerEvents { get; set; }
        public ICollection<Event>? AudienceEvents { get; set; }
    }
}